const PageHeader = () => {

  return (
    <div className='cover-header'>
      <div className='cover-img'>
        <img className='cover-img' src='/images/header.jpg'/>
      </div>
      <div className='logo'>
        <img className='logo-img' src='/images/logo.jpg'/>
        <div>Ngo xanh thien lanh</div>
        <div className='search-header-container'>
          <input
              className="search-header"
              type="text"
              id="header-search"
              placeholder="Tim kiem"
              name="s" 
          />     
        </div>
        </div>
    </div>
  )
}

export default PageHeader