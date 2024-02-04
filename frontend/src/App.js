import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Login from './components/Login';
import Register from './components/Register';
import BookStore from './components/Bookstore';
import Bookdetails from './components/Bookdetails';
function App() {
  return (
    <div className='bg-[#ccffee]'>
      <BrowserRouter>
          <Routes>
            <Route path='/' Component={Login}/>
            <Route path='/register' Component={Register}/>
            <Route path='/bookstore' Component={BookStore}/>
            <Route path='/bookdetails' Component={Bookdetails}/>
            
          </Routes>
    </BrowserRouter>
    </div>
    
  );
}

export default App;
