
import { Route, Routes } from 'react-router';
import './App.css';
import Emplist from './pages/Emplist';
import Empreg from './pages/Empreg';
import Empedit from './pages/Empedit';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Empreg/>}/>
        <Route path='/emplist' element={<Emplist/>}/>
        <Route path='/empedit/:id' element={<Empedit/>}/>
      </Routes>
    </div>
  );
}

export default App;
