import { bookService } from '../services/book.service.js'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
const { useState, useEffect } = React

export default function AddReview({ bookId, onReviewAdded }) {
  const [review, setReview] = useState({ fullname: '', rating: '', readAt: '' })
  // console.log('bookService:', bookService)
  useEffect(() => {}, [])

  function handleChange({ target }) {
    const { name, value } = target
    setReview((prev) => ({ ...prev, [name]: value }))
    console.log('review:', review)
  }
  function onAddReview(ev) {
    ev.preventDefault()
    bookService
      .addReview(bookId, review)
      .then(() => {
        showSuccessMsg('Review add successfully!')
        setReview({ fullname: '', rating: '', readAt: '' })
        if (onReviewAdded) onReviewAdded()
      })
      .catch((e) => {
        showErrorMsg('Review add failed!')
      })
  }
  return (
    <section className='review-container'>
      <form className='review-form' onSubmit={onAddReview}>
        <label htmlFor='fullname'>
          <h4>Full Name</h4>{' '}
          <input
            onChange={handleChange}
            type='text'
            // value={''}
            name='fullname'
            id='fullname'
            required
          />
        </label>
        <label htmlFor='review'>
          <h4>Review</h4>

          <select name='rating' id='rating' onChange={handleChange} required>
            <option value=''>Choose rating</option>
            <option value='1'>⭐️</option>
            <option value='2'>⭐️⭐️</option>
            <option value='3'>⭐️⭐️⭐️</option>
            <option value='4'>⭐️⭐️⭐️⭐️</option>
            <option value='5'>⭐️⭐️⭐️⭐️⭐️</option>
          </select>
        </label>
        <label htmlFor='readAt' className='readAt'>
          <h4>Read At</h4>
          <input
            type='date'
            name='readAt'
            id='readAt'
            onChange={handleChange}
            max={new Date().toISOString().split('T')[0]}
            required
          />
        </label>
        <button>Send</button>
      </form>
    </section>
  )
}
