import './App.css';
import LogInPage from './components/LogInPage'
import RegisterPage from './components/RegisterPage'
import ForgotPasswordPage from './components/ForgotPasswordPage'
import SearchPage from './components/SearchPage'
import { Route,  BrowserRouter as Router, Routes} from 'react-router-dom';
import Dummy from './components/dummy';
import React from 'react';
import ProfilePage from './components/ProfilePage';
import AboutMe from './components/AboutMe';
import ChatPage from './components/ChatPage';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
        <Route exact path="/" element={<LogInPage />} />
        <Route  path="/dummy" element={<Dummy />} />
        <Route path="/Register" element={<RegisterPage/>} />
        <Route path='/ChangePassword' element={<ForgotPasswordPage/>} />
        <Route path='/Search' element={<SearchPage/>} />
        <Route path='/Profile' element={<ProfilePage/>} />
        <Route path='/Description' element={<AboutMe/>} />
        <Route path='/chat' element={<ChatPage/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
