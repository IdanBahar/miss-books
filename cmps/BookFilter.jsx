const { useState, useEffect } = React
export function BookFilter({ filterBy, onSetFilter }) {
  const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

  useEffect(() => {
    onSetFilter(filterByToEdit)
  }, [filterByToEdit])

  function handleChange({ target }) {
    let { value, name: field } = target
    switch (target.type) {
      case 'range':
      case 'number':
        value = +target.value
        break
      case 'checkbox':
        value = target.checked
        break
    }
    setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
  }
  function onResetFilter(e) {
    // e.preventDefault
    const defaultFilter = { txt: '', maxPrice: 0, categories: '' }
    setFilterByToEdit(defaultFilter)
  }

  /* 
    function handleTxtChange({ target }) {
        const value = target.value
        setFilterByToEdit(prevFilter => ({ ...prevFilter, txt: value }))
    }
    
    function handleMinSpeedChange({ target }) {
        const value = target.value
        setFilterByToEdit(prevFilter => ({ ...prevFilter, minSpeed: value }))
    }
    */

  const { txt, maxPrice } = filterByToEdit
  return (
    <section className='book-filter'>
      <h2>Filter Our Books</h2>
      <form>
        <label htmlFor='txt'>Title</label>
        <input
          onChange={handleChange}
          value={txt}
          name='txt'
          type='text'
          id='txt'
        />

        <label htmlFor='maxPrice'>Max Price</label>
        <input
          onChange={handleChange}
          value={maxPrice || ''}
          name='maxPrice'
          type='number'
          id='maxPrice'
        />
        <label htmlFor='categories'>Genre</label>
        <select
          onChange={handleChange}
          name='categories'
          id='categories'
          value={filterByToEdit.categories || ''}
        >
          <option value=''>All</option>
          <option value='Fiction'>Fiction</option>
          <option value='Religion'>Religion</option>
          <option value='Poetry'>Poetry</option>
          <option value='Computers'>Computers</option>
          <option value='Love'>Love</option>
        </select>
        <button onClick={onResetFilter}>Reset Filters</button>
      </form>
    </section>
  )
}
