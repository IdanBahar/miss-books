import { BookFilter } from '../cmps/BookFilter.jsx'
import { BookList } from '../cmps/BookList.jsx'
import { bookService } from '../services/book.service.js'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'

const { useEffect, useState } = React
// const { Link, useSearchParams } = ReactRouterDOM

export function BookIndex() {
  const [books, setBooks] = useState(null)
  const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())

  useEffect(() => {
    loadBooks()
  }, [filterBy])

  function loadBooks() {
    bookService
      .query(filterBy)
      .then(setBooks)
      .catch((err) => {
        console.log('Problems getting books:', err)
      })
  }

  function onRemoveBook(bookId) {
    bookService
      .remove(bookId)
      .then(() => {
        setBooks((books) => books.filter((book) => book.id !== bookId))
        showSuccessMsg('Book removed successfully!')
      })
      .catch((err) => {
        console.log('Problems removing book:', err)
        showErrorMsg('Couldnt remove book')
      })
  }

  function onSetFilter(filterBy) {
    setFilterBy((prevFilter) => ({ ...prevFilter, ...filterBy }))
  }

  if (!books)
    return (
      <div className='loader-container'>
        <div className='loader'></div>
      </div>
    )
  return (
    <section className='book-index'>
      <section></section>
      <BookFilter onSetFilter={onSetFilter} filterBy={filterBy} />
      <BookList
        books={books}
        onRemoveBook={onRemoveBook}
        filterTxt={filterBy.txt}
      />
    </section>
  )
}
