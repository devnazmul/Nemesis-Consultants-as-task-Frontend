import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AuthProvider from './Components/Auth/AuthContext';
import Login from './Components/Login/Login';
import PrivateOutlet from './Components/PrivateRoute/PrivateRoute';

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path='/' element={<PrivateOutlet />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>

    </>
  );
}

export default App;
