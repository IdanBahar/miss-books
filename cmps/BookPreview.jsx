export function BookPreview({ book, filterTxt }) {
  function calcAvgRating() {
    if (!book.reviews || book.reviews.length === 0) return 'No Reviews Yet'

    const sum = book.reviews.reduce((acc, review) => acc + +review.rating, 0)
    console.log('sum:', sum)
    return `AVG Rating: ${(sum / book.reviews.length).toFixed(1)}`
  }

  return (
    <article className='book-preview'>
      <h2>{book.title}</h2>
      {/* <h4>Book id: {book.id}</h4> */}
      <img src={book.thumbnail} alt='book-image' />
      <p className='price'>
        {book.listPrice.amount + ' ' + book.listPrice.currencyCode + ' '}
        {book.listPrice.isOnSale ? '🔥' : ''}
      </p>
      <p>{calcAvgRating()}</p>
    </article>
  )
}
