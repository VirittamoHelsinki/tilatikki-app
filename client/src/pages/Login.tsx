import { useState } from 'react';
import { FaSignInAlt } from 'react-icons/fa';
import { useUserAction } from "../hooks/useUser";

function Login() {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const { email, password } = credentials;
  const { loginUser, getAllUsers, logoutUser,getMe } = useUserAction();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await loginUser({ email, password });
    } catch (error) {
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
              Kirjaudu
            </button>
          </div>
        </form>
        <button className='btn btn-block' onClick={() => getAllUsers()}>
          Get all users
        </button>
        <button className='btn btn-block' onClick={() => logoutUser()}>
          Kirjaudu Ulos
        </button>
        <button className='btn btn-block' onClick={() => getMe()}>
          get user data
        </button>
      </section>
    </>
  );
}

export default Login;