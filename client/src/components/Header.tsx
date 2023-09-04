import { FaSignInAlt, FaUser } from 'react-icons/fa'
import { Link } from 'react-router-dom'


function Header() {
  
  return (
    <header className='header'>
      <div className='logo'>
        <Link to='/'>tilatikki</Link>
      </div>
      <ul>
         
          <>
            <li>
              <Link to='/login'>
                <FaSignInAlt /> Kirjaudu sisään
              </Link>
            </li>
            <li>
              <Link to='/register'>
                <FaUser /> Rekisteröidy
              </Link>
            </li>
          </>
        
      </ul>
    </header>
  )
}

export default Header