import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import OnboardingForm from './pages/OnboardingForm';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Calendar from './pages/Calendar';
import Stats from './pages/Stats';
import Contact from './pages/Contact';
import TermsOfUse from './pages/TermsOfUse'; // Import TermsOfUse
import AIDisclaimer from './pages/AIDisclaimer'; // Import AIDisclaimer
//import PrivacyPolicy from './pages/PrivacyPolicy'; // Import PrivacyPolicy
import UploadPic from './pages/UploadPic';
import Chat from './pages/Chat';
function App() {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen">
      {location.pathname !== '/register' && location.pathname !== '/login' && location.pathname !== '/onboarding' && <Header />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/register" element={<Register />} />
          <Route path="/onboarding" element={<OnboardingForm />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/upload" element={<UploadPic />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/terms-of-use" element={<TermsOfUse />} /> {/* Ensure this route is correct */}
          <Route path="/ai-disclaimer" element={<AIDisclaimer />} /> {/* Ensure this route is correct */}
          {/*<Route path="/privacy-policy" element={<PrivacyPolicy />} /> {/* Ensure this route is correct */}
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;