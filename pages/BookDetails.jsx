import { bookService } from '../services/book.service.js'
const { useState, useEffect } = React
const { useParams, useNavigate, Link } = ReactRouterDOM
import { LongTxt } from '../cmps/LongTxt.jsx'

export function BookDetails() {
  const [book, setBook] = useState(null)
  const params = useParams()
  const navigate = useNavigate()

  const bookDateLevel = (publishedDate) => {
    const currentYear = new Date().getFullYear()
    const calcYear = currentYear - publishedDate
    if (calcYear < 1) return 'New Book'
    if (calcYear > 10) return 'Vintage Book'
  }
  const bookReadLevel = (pageCount) => {
    if (pageCount < 100) return 'Light Reading'
    if (pageCount > 200 && pageCount < 500) return 'Decent Reading'
    if (pageCount > 500) return 'Serious Reading'
  }

  useEffect(() => {
    loadBook()
  }, [params.bookId])

  function loadBook() {
    setBook(null)
    bookService
      .get(params.bookId)
      .then(setBook)
      .catch((err) => {
        console.log('err:', err)
      })
  }

  function onBack() {
    navigate('/book')
  }

  // console.log('Render', params)
  if (!book)
    return (
      <div className='loader-container'>
        <div className='loader'></div>
      </div>
    )

  return (
    <section className={`book-details `}>
      {book.listPrice.isOnSale && <span className='sale-badge'>SALE</span>}
      <section>
        <Link to={`/book/${book.prevBookId}`}>
          <button className='btn-next-previous'>Previous</button>
        </Link>
        <Link to={`/book/${book.nextBookId}`}>
          <button className='btn-next-previous'>Next</button>
        </Link>
      </section>
      <h1>{book.title}</h1>
      <div>
        {bookDateLevel(book.publishedDate) && (
          <p>{bookDateLevel(book.publishedDate)}</p>
        )}
        {bookReadLevel(book.pageCount) && (
          <p>{bookReadLevel(book.pageCount)}</p>
        )}
      </div>
      <div className='book-items'>
        <div>
          <p>
            <span className='bold-txt'>Price: </span>
            <br />
            <span
              className={
                book.listPrice.amount > 150 ? 'red-price' : 'green-price'
              }
            >
              {book.listPrice.amount} {book.listPrice.currencyCode}
            </span>
          </p>

          <p>
            <span className='bold-txt'>Language: </span>
            <br />
            {book.language.toUpperCase()}
          </p>
        </div>
        <div>
          <p>
            <span className='bold-txt'>Category: </span>
            <br />
            {book.categories}
          </p>
          <p>
            <span className='bold-txt'>Authors: </span>
            <br />
            {book.authors}
          </p>
        </div>
      </div>
      <LongTxt txt={book.description} length={100} />
      {console.log('book:', book)}
      <img src={book.thumbnail} alt='book-image' />
      <button className='btn-next-previous' onClick={onBack}>
        Back
      </button>
    </section>
  )
}
