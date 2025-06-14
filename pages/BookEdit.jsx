import { bookService } from '../services/book.service.js'
import { showSuccessMsg } from '../services/event-bus.service.js'

const { useState, useEffect } = React
const { useNavigate, useParams } = ReactRouterDOM

export function BookEdit() {
  const { bookId } = useParams()
  const [bookToEdit, setBookToEdit] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (bookId) {
      loadBook()
    } else {
      setBookToEdit(bookService.getEmptyBook())
    }
  }, [bookId])

  function loadBook() {
    bookService
      .get(bookId)
      .then((book) => {
        setBookToEdit(book)
      })

      .catch((err) => {
        console.log('Problem getting book', err)
        navigate()
      })
  }

  function handleChange({ target }) {
    let { value, name: field } = target

    switch (target.type) {
      case 'range':
      case 'number':
        value = +value
        break
      case 'checkbox':
        value = target.checked
        break
    }

    setBookToEdit((prevBook) => {
      if (field === 'price' || field === 'sale') {
        const listPrice = { ...prevBook.listPrice }
        if (field === 'price') listPrice.amount = value
        if (field === 'sale') listPrice.isOnSale = value
        return { ...prevBook, listPrice }
      }

      if (field === 'authors') {
        return { ...prevBook, authors: [value] }
      }

      if (field === 'categories') {
        return { ...prevBook, categories: [value] }
      }

      return { ...prevBook, [field]: value }
    })
  }

  function onSaveBook(ev) {
    ev.preventDefault()
    bookService
      .save(bookToEdit)
      .then((savedBook) => {
        console.log('savedBook:', savedBook)
        showSuccessMsg(bookId ? 'Saved succesfully!' : 'Added succesfully!')
        navigate('/book')
      })
      .catch((err) => console.log('err:', err))
  }
  function onBack() {
    navigate('/book')
  }
  if (!bookToEdit)
    return (
      <div className='loader-container'>
        <div className='loader'></div>
      </div>
    )
  const { title, description, categories, authors, pageCount, language } =
    bookToEdit
  const price = (bookToEdit.listPrice && bookToEdit.listPrice.amount) || ''
  const sale = (bookToEdit.listPrice && bookToEdit.listPrice.isOnSale) || false

  return (
    <section className='book-edit'>
      <div className='book-edit-left'>
        <h1>{bookId ? 'Edit' : 'Add'} Book</h1>
        <img className='book-img' src={bookToEdit.thumbnail} alt='Book cover' />
      </div>
      <form className='book-edit-right' onSubmit={onSaveBook}>
        <label htmlFor='title'>Title</label>
        <input
          onChange={handleChange}
          type='text'
          value={title}
          name='title'
          id='title'
        />

        <label htmlFor='authors'>Author</label>
        <input
          onChange={handleChange}
          type='text'
          value={authors[0] || ''}
          name='authors'
          id='authors'
          required
        />

        <label htmlFor='description'>Description</label>
        <input
          onChange={handleChange}
          type='text'
          value={description}
          name='description'
          id='description'
          required
        />

        <label htmlFor='language'>Language</label>
        <select
          onChange={handleChange}
          value={language}
          name='language'
          id='language'
        >
          <option value='en'>English</option>
          <option value='he'>Hebrew</option>
          <option value='es'>Spanish</option>
          <option value='fr'>French</option>
          <option value='de'>German</option>
          <option value='ru'>Russian</option>
          <option value='zh'>Chinese</option>
          <option value='ja'>Japanese</option>
          <option value='ar'>Arabic</option>
        </select>

        <label htmlFor='pageCount'>Page Count</label>
        <input
          onChange={handleChange}
          type='number'
          value={pageCount || ''}
          name='pageCount'
          id='pageCount'
          required
        />

        <label htmlFor='price'>Price</label>
        <input
          onChange={handleChange}
          type='number'
          value={price}
          name='price'
          id='price'
          required
        />

        <label htmlFor='categories'>Categories</label>
        <select
          onChange={handleChange}
          value={categories[0] || ''}
          name='categories'
          id='categories'
        >
          <option value='Love'>Love</option>
          <option value='Fiction'>Fiction</option>
          <option value='Poetry'>Poetry</option>
          <option value='Computers'>Computers</option>
          <option value='Religion'>Religion</option>
        </select>

        <label htmlFor='sale'>SALE</label>
        <input
          type='checkbox'
          name='sale'
          checked={sale}
          onChange={handleChange}
        />

        <button>Save</button>
        <button onClick={onBack}>Cancel</button>
      </form>
    </section>
  )
}
