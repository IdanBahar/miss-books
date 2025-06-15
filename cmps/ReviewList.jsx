export default function ReviewList({ book, onRemoveReview }) {
  if (!book.reviews || !book.reviews.length) return <p>No reviews yet</p>

  return <Review book={book} onRemoveReview={onRemoveReview} />
}

function Review({ book, onRemoveReview = { onRemoveReview } }) {
  return (
    <ul className='review-list'>
      <h2>Reviews</h2>
      {book.reviews.map((review) => (
        <li key={review.id} className='review'>
          <p className='review-fullname'>{review.fullname}</p>
          <p className='review-rating'>{'⭐️'.repeat(review.rating)}</p>
          <p>{review.readAt}</p>
          <span
            className='delete-review-btn'
            onClick={() => onRemoveReview(review.id)}
          >
            <i className='fa-solid fa-trash'></i>
          </span>
        </li>
      ))}
    </ul>
  )
}
