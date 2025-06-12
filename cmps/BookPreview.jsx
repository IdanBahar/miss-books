export function BookPreview({ book, filterTxt }) {
  return (
    <article className='book-preview'>
      <h2>{book.title}</h2>

      {/* <h4>Book id: {book.id}</h4> */}
      <img src={book.thumbnail} alt='book-image' />
      <p className='price'>
        {book.listPrice.amount + ' ' + book.listPrice.currencyCode + ' '}
        {book.listPrice.isOnSale ? '🔥' : ''}
      </p>
    </article>
  )
}
