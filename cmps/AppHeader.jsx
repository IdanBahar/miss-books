const { Link, NavLink } = ReactRouterDOM

export function AppHeader() {
  return (
    <header className='app-header'>
      <div className='header-left'>
        <h1 className='logo'>React Book App</h1>
        <h2 className='sub-logo'>Your Digital Library</h2>
      </div>

      <nav>
        <NavLink to='/'>Home</NavLink>
        <NavLink to='/about'>About</NavLink>
        <NavLink to='/book'>Books</NavLink>
      </nav>
    </header>
  )
}
