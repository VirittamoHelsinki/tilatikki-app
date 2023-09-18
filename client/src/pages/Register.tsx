import { useState, ChangeEvent, FormEvent } from "react";
import { FaUser } from "react-icons/fa";
import { useUserAction } from "../hooks/useUser";

function Register() {
  // Define the type for your form data
  interface FormData {
    lastname: string;
    email: string;
    password: string;
    password2: string;
    firstname: string;
  }
  const { registerUser } = useUserAction();
  // Initialize the state with the FormData type
  const [formData, setFormData] = useState<FormData>({
    lastname: "",
    email: "",
    password: "",
    password2: "",
    firstname: "",
  });

  const { lastname, firstname, email, password, password2 } = formData;

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    // Update the state when input values change
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== password2) {
      alert("Passwords do not match.");
      return; // Prevent form submission if passwords don't match
    }
    try {
      await registerUser({ email, password, firstname, lastname });
    } catch (error) {}
  };

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
