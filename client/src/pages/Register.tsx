import { useState } from "react";
import { FaUser } from "react-icons/fa";

function Register() {
  const [formData] = useState({
    lastname: "",
    email: "",
    password: "",
    password2: "",
    firstname: "",
  });

  const { lastname,firstname, email, password, password2 } = formData;

  const onChange = () => {};

  const onSubmit = () => {};

  return (
    <>
      <section className="heading">
        <h1>
          <FaUser /> Rekisteröidy
        </h1>
        <p>Ole hyvä ja luo tilisi!</p>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="firstname"
              name="firstname"
              value={firstname}
              placeholder="Etunimi"
              onChange={onChange}
            ></input>
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="lastname"
              name="lastname"
              value={lastname}
              placeholder="Sukunimi"
              onChange={onChange}
            ></input>
          </div>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              placeholder="Syötä sähköpostiosoitteesi"
              onChange={onChange}
            ></input>
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              placeholder="Salasana"
              onChange={onChange}
            ></input>
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password2"
              name="password2"
              value={password2}
              placeholder="Vahvista salasana"
              onChange={onChange}
            ></input>
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Lähetä
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Register;
