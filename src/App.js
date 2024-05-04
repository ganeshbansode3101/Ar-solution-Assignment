import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Component1 from './Component1';
import Component2 from './Component2';
import Component3 from './Component3';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Component1 />} />
        <Route path="/component-1" element={<Component1 />} />
        <Route path="/component-2" element={<Component2 />} />
        <Route path="/component-3" element={<Component3 />} />
      </Routes>
    </Router>
  );
};

export default App;
