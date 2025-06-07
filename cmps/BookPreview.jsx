export function BookPreview({ book }) {
  return (
    <article className='book-preview'>
      <h2>title: {book.title}</h2>
      <h4>Book id: {book.id}</h4>
      <img src={book.thumbnail} alt='book-image' />
    </article>
  )
}
