const { Link, NavLink } = ReactRouterDOM

export function AppHeader() {
  return (
    <header className='app-header'>
      <div className='header-left'>
        <h1 className='logo'>Miss Books.</h1>
      </div>

      <nav>
        <NavLink to='/'>Home</NavLink>
        <NavLink to='/about'>About</NavLink>
        <NavLink to='/book'>Books</NavLink>
      </nav>
    </header>
  )
}
