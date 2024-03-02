import { Route, Routes } from 'react-router-dom';
import PaymentForm from './component/PaymentForm';
import { useState } from 'react';
import SignUpForm from './container/SignUpForm';
import HomePage from './container/HomePage';

const App = () => {

  return (
    <div>
      <Routes>
        <Route 
          path='/' 
          element={<HomePage/>}
        />
        <Route path='/signup' element={<SignUpForm/>}/>
      </Routes>
    </div>
  );
}

export default App;
