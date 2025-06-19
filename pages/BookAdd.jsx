import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { googleBookService } from '../services/googleBookService.js'
import { debounce } from '../services/util.service.js'
const { useState, useEffect, useRef } = React

export default function BookAdd() {
  const [searchTxt, setSearchTxt] = useState('')
  const [books, setBooks] = useState([])
  const onSearchDebounce = useRef(
    debounce((txt) => {
      googleBookService.googleQuery(txt).then((googleBooks) => {
        const localBooks = googleBooks.map(
          googleBookService.convertGoogleBookToLocalBook
        )
        setBooks(localBooks)
      })
    }, 1000)
  ).current
  function onAddBook(book) {
    googleBookService
      .addGoogleBook(book)
      .then(() => {
        showSuccessMsg('Book added succsesfully!')
        // console.log('Book Added:', book.title)
      })
      .catch((err) => {
        // console.log('Could not add book:', err)
        showErrorMsg('Could not add book!')
      })
  }
  useEffect(() => {
    if (!searchTxt) return
    onSearchDebounce(searchTxt)
  }, [searchTxt])
  return (
    <section className='book-add'>
      <h2>Add a New Google Book</h2>
      <input
        type='text'
        placeholder='Search for a book...'
        value={searchTxt}
        onChange={(e) => setSearchTxt(e.target.value)}
      />
      <ul className='book-list'>
        {books.map((book) => {
          // console.log('book:', book)
          return (
            <li key={book.id}>
              <h2>{book.title}</h2>
              <h3>{book.authors[0]}</h3>
              <img src={book.thumbnail} alt='' />
              <button onClick={() => onAddBook(book)}>+</button>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
