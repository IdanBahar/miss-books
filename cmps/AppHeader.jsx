const { Link, NavLink } = ReactRouterDOM

export function AppHeader() {
  return (
    <header className='app-header'>
      <div className='header-left'>
        <h1 className='logo'>Miss Books.</h1>
      </div>

      <nav>
        <NavLink to='/'>
          <i class='fa-solid fa-house'> Home</i>
        </NavLink>
        <NavLink to='/about'>
          <i class='fa-solid fa-address-card'> About</i>
        </NavLink>
        <NavLink to='/book'>
          <i class='fa-solid fa-book'> Books</i>
        </NavLink>
      </nav>
    </header>
  )
}
