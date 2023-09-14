import { useState } from 'react';
import { FaSignInAlt } from 'react-icons/fa';
import { useUserAction } from "../hooks/useUser";
import { useTypedSelector } from '../hooks/useTypedSelector';

function Login() {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const { email, password } = credentials;
  const { loginUser, getAllUsers } = useUserAction();

  const onChange = (e:any) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e:any) => {
    e.preventDefault(); // Prevent the default form submission behavior

    try {
      // Call the loginUser action with email and password
      await loginUser({ email, password });

      // Optionally, you can perform redirection or other actions after successful login
    } catch (error) {
      // Handle login failure here, e.g., display an error message to the user
      console.error('Login failed:', error);
      // You can set an error state here and display it to the user
    }
  };

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
        <button className='btn btn-block' onClick={() => getAllUsers()}>
          Get all users
        </button>
      </section>
    </>
  );
}

export default Login;