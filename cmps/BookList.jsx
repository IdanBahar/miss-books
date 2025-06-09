const { Link } = ReactRouterDOM

import { BookPreview } from './BookPreview.jsx'

export function BookList({ books, onRemoveBook, filterTxt }) {
  {
    console.log('📘 filterTxt:', filterTxt)
  }
  return (
    <ul className='book-list'>
      {books.map((book) => (
        <li key={book.id} className={book.listPrice.isOnSale ? 'on-sale' : ''}>
          {book.listPrice.isOnSale && <span className='sale-badge'>SALE</span>}

          <BookPreview book={book} filterTxt={filterTxt} />
          <section className='btn-group'>
            <Link
              to={`/book/${book.id}`}
              className='btn-link details action-btn'
            >
              Details
            </Link>

            <button className='remove' onClick={() => onRemoveBook(book.id)}>
              Remove
            </button>
            <button className='edit'>Edit</button>
          </section>
        </li>
      ))}
    </ul>
  )
}
