const { Link } = ReactRouterDOM

import { BookPreview } from './BookPreview.jsx'

export function BookList({ books, onRemoveBook }) {
  return (
    <ul className='book-list'>
      {books.map((book) => (
        <li key={book.id}>
          {book.listPrice.isOnSale && <span className='sale-badge'>SALE</span>}

          {/* {console.log('hi:', book)} */}
          <BookPreview book={book} />
          <section className='btn-group'>
            <button onClick={() => onRemoveBook(book.id)}> Remove</button>
            <Link to={`/book/${book.id}`}>
              <button>Details</button>
            </Link>
            <button>Edit</button>
          </section>
        </li>
      ))}
    </ul>
  )
}
