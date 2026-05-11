import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React from 'react';
import LoginPage from './pages/loginPage';
import SignInPage from './pages/SignInPage';
import { Toaster } from 'sonner';

function App() {
  return <>
    <Toaster richColors />
    <BrowserRouter>
      <Routes>

        {/* punlic routes */}
        <Route
          path='/login'
          element={
            <div className="App">
              <LoginPage />
            </div>
          }
        />

        <Route
          path='/signin'
          element={<SignInPage />}
        />

        {/* protectect routes */}


      </Routes>
    </BrowserRouter >

  </>;


}

export default App;
