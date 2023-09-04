import { useState} from 'react'
import { FaSignInAlt } from 'react-icons/fa'



function Login() {
  const [formData] = useState({
    email: '',
    password: '',
  })

  const { email, password } = formData

 
  const onChange = () => {}

  const onSubmit = () => {}

  return (
    <>
      <section className='heading'>
        <h1>
          <FaSignInAlt /> Kirjaudu sisään
        </h1>
        <p>Syötä sähköpostiosoite ja salasana kirjautuaksesi!</p>
      </section>

      <section className='form'>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <input
              type='email'
              className='form-control'
              id='email'
              name='email'
              value={email}
              placeholder='Syötä sähköpostiosoitteesi'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='password'
              name='password'
              value={password}
              placeholder='Kirjoita salasana'
              onChange={onChange}
            />
          </div>

          <div className='form-group'>
            <button type='submit' className='btn btn-block'>
            Lähetä
            </button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Login