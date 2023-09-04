import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
// This import the BrowserRouter, Routes, and Route components from the react-router-dom library.
// These components are used to create a routing system for the application.

import { Provider } from '../node_modules/react-redux/es/exports';
// This import the Provider component from the react-redux library.
// This component is used to connect the Redux store to the React application.

import { store } from "./Redux/store";
// This import the store variable from the Redux/store.js file.
// This variable contains the Redux store for the application.




function App() {

  return (
    <Provider store={store}>
      <BrowserRouter>
      <div className="container">
      <Header />
       <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  )
}


export default App;
