export default function ReviewList({ reviews, onRemoveReview }) {
  if (!reviews || !reviews.length) return <p>No reviews yet</p>

  return <Review reviews={reviews} onRemoveReview={onRemoveReview} />
}

function Review({ reviews, onRemoveReview }) {
  return (
    <ul className='review-list'>
      <h2>Reviews</h2>
      {reviews.map((review) => (
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
