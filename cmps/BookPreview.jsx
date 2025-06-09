export function BookPreview({ book, filterTxt }) {
  const getHighlightedTitle = (title) => {
    if (!filterTxt) return title
    const regExp = new RegExp(`(${filterTxt})`, 'ig')
    return title.replace(regExp, '<mark>$1</mark>')
  }

  return (
    <article className='book-preview'>
      <h2
        dangerouslySetInnerHTML={{ __html: getHighlightedTitle(book.title) }}
      />

      {/* <h4>Book id: {book.id}</h4> */}
      <img src={book.thumbnail} alt='book-image' />
    </article>
  )
}
