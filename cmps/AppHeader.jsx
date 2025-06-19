const { Link, NavLink } = ReactRouterDOM

export function AppHeader() {
  return (
    <header className='app-header'>
      <div className='header-left'>
        <h1 className='logo'>Miss Books.</h1>
      </div>

      <nav>
        <NavLink to='/'>
          <i className='fa-solid fa-house'> Home</i>
        </NavLink>
        <NavLink to='/about'>
          <i className='fa-solid fa-address-card'> About</i>
        </NavLink>
        <NavLink to='/book'>
          <i className='fa-solid fa-book'> Books</i>
        </NavLink>
        <NavLink to='/book/add'>
          <i className='fa-solid fa-book'> Google Books</i>
        </NavLink>
      </nav>
    </header>
  )
}
