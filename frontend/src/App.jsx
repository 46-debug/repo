import React from 'react';
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Admin from './pages/AdminPage/Admin';
import Details from './pages/Details';
import PaymentPage from './pages/PaymentPage';

function App() {

  return (
    <>
      <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/paymentpage" element={<PaymentPage />} />
      </Routes>
    </Router>
    </>
  )
}

export default App;
