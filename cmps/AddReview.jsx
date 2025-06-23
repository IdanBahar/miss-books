import { bookService } from '../services/book.service.js'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
const { useState, useEffect } = React

export default function AddReview({ bookId, onReviewAdded }) {
  const [review, setReview] = useState({ fullname: '', rating: 0, readAt: '' })
  const [selectedRating, setSelectedRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)

  function handleChange({ target }) {
    const { name, value } = target
    setReview((prev) => ({ ...prev, [name]: value }))
    console.log('review:', review)
  }
  function onAddReview(ev) {
    ev.preventDefault()
    bookService
      .addReview(bookId, review)
      .then((updatedBook) => {
        showSuccessMsg('Review add successfully!')
        setReview({ fullname: '', rating: 0, readAt: '' })
        setSelectedRating(0)
        const newReview = updatedBook.reviews.at(-1)
        if (onReviewAdded) onReviewAdded(newReview)
      })
      .catch((e) => {
        showErrorMsg('Review add failed!')
      })
  }
  return (
    <section className='review-container'>
      <form className='review-form' onSubmit={onAddReview}>
        <label htmlFor='fullname'>
          <h4>Full Name</h4>
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

          <div className='star-rating'>
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`star ${
                  star <= (hoverRating || selectedRating) ? 'filled' : ''
                }`}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={(e) => {
                  e.preventDefault()
                  setSelectedRating(star)
                  handleChange({ target: { name: 'rating', value: star } })
                }}
              >
                <i className='fa-solid fa-star'></i>
              </span>
            ))}
          </div>
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
