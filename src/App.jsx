import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import OnboardingForm from './pages/OnboardingForm';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Calendar from './pages/Calendar';
import Stats from './pages/Stats';
import Contact from './pages/Contact';
import Chat from './pages/Chat';
import CircularChart from './components/CircularChart';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/onboarding" element={<OnboardingForm />} />
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/register" element={<Register />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/stats" element={<Stats />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/CircularChart" element={<CircularChart />} />
            
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

