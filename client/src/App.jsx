import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import SchoolsPage from './pages/SchoolsPage';
import ReservationPage from './pages/ReservationPage';

function App() {

  return (
    <>
        <Router>
          <div>
            <Routes>
                <Route path="/" element={<RegisterPage/>} />         
                <Route path="/register" element={<RegisterPage/>} />
                <Route path="/login" element={<LoginPage/>} />
                <Route path="/schools" element={<SchoolsPage/>} />
                <Route path="/reservations" element={<ReservationPage/>} />
            </Routes>
            </div>
        </Router>
    </>
  )
}

export default App