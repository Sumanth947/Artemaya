import { useState } from 'react';
import { Lock, Mail, Loader2 } from 'lucide-react';
import app from '../firebaseConfig'; // Import the Firebase app
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"; // Import Firebase Auth functions
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const auth = getAuth(app); // Get the Auth instance
  const navigate = useNavigate(); // Hook for navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Sign in user
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      console.log('Login successful');
      // Redirect to onboarding page after successful login
      navigate('/onboarding'); // Redirect to onboarding page
    } catch (error) {
      console.error('Error signing in:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.id]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="px-8 pt-8 pb-6">
            <h1 className="text-3xl font-bold text-center text-slate-800">Welcome Back</h1>
            <p className="text-center text-slate-600 mt-2">Enter your credentials to continue</p>
          </div>

          <div className="px-8 pb-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email</label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                    <Mail className="h-5 w-5" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-2.5 rounded-lg border border-slate-200 
                      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                      transition-all duration-200"
                    placeholder="name@example.com"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-slate-700">Password</label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                    <Lock className="h-5 w-5" />
                  </div>
                  <input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-2.5 rounded-lg border border-slate-200 
                      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                      transition-all duration-200"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full relative py-2.5 px-4 rounded-lg bg-blue-600 text-white font-medium
                  hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                  disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200
                  flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  'Sign in'
                )}
              </button>

              <div className="text-center mt-4">
                <p className="text-sm text-slate-600">
                  New user?{' '}
                  <button
                    onClick={() => navigate('/register')} // Redirect to register page
                    className="text-blue-600 hover:underline"
                  >
                    Register here
                  </button>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;