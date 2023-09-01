import { BrowserRouter, Routes, Route } from "react-router-dom";
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
        <Routes>
          {/* Add route for pages */}
          //<Route path="/" index element=""/>
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}


export default App;
