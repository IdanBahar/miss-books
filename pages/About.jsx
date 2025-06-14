const { Outlet, Link } = ReactRouterDOM

export function About() {
  return (
    <section className='about-container'>
      <h1 className='about-heading'>📚 About Miss Books</h1>
      <p className='welcome-about'>
        Welcome to <b>Miss Books</b> – your personal digital bookshelf! Miss
        Books is a React-based single-page application that lets you explore,
        manage, and interact with books in a beautiful and dynamic way. Whether
        you’re looking to browse your library, dive into book details, or leave
        thoughtful reviews, this app gives you the experience of a modern,
        responsive book manager.
      </p>

      <h2>✨ What can you do? </h2>
      <ul>
        <li>
          <b>View and filter </b>books by category, price, and title
        </li>
        <li>
          <b>Add, edit, and delete</b> books from your collection
        </li>
        <li>
          <b>Read details</b>about each book including price and sale status
        </li>
        <li>
          <b>Write and manage reviews</b>for any book
        </li>
        <li>
          <b>Enjoy responsive, modern design </b> with smooth animations and a
          focus on user experience
        </li>
      </ul>

      <h2>🛠️ Built With:</h2>
      <ul>
        <li>React (without create-react-app)</li>
        <li>React Router</li>
        <li>LocalStorage for persistent data</li>
        <li>Modular services and components</li>
        <li>Custom CSS and animations</li>
      </ul>

      <h3 className='created-about'>
        🙌 Created as part of a coding academy project
      </h3>

      <nav>
        <Link to='/about/team'>Team</Link>
        <Link to='/about/vision'>Vision</Link>
      </nav>
      <section className='team-vision'>
        <Outlet />
      </section>
    </section>
  )
}
