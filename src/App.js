import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

import Home from './component/home';
import ViewQuiz from './component/viewQuiz';
import Contact from './component/contact';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="App-header">
          <Link to="/">Home</Link>
          <Link to="/viewquiz">View Quiz</Link>
          <Link to="/contact">Contact Us</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/viewquiz" element={<ViewQuiz />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
