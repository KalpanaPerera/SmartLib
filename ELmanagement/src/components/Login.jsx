import { useState, useEffect } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [previousEmails, setPreviousEmails] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Load previously entered emails from local storage
    const savedEmails = JSON.parse(localStorage.getItem('previousEmails') || '[]');
    setPreviousEmails(savedEmails);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('Login successful!');
      navigate('/profile'); // Redirect to profile or home page after login
    } catch (error) {
      console.error('Error logging in:', error.message);
      alert(error.message);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setShowDropdown(true); // Show dropdown when email input is clicked
  };

  const handleEmailSelect = (selectedEmail) => {
    setEmail(selectedEmail);
    setShowDropdown(false); // Hide dropdown after selection
  };

  const handleEmailBlur = () => {
    // Hide dropdown on blur with a slight delay
    setTimeout(() => setShowDropdown(false), 100);
  };

  const handleEmailFocus = () => {
    setShowDropdown(true); // Show dropdown on focus
  };

  const handleEmailKeyDown = (e) => {
    if (e.key === 'Enter' && !previousEmails.includes(email)) {
      // Add email to previousEmails if it doesn't exist
      const updatedEmails = [...previousEmails, email];
      setPreviousEmails(updatedEmails);
      localStorage.setItem('previousEmails', JSON.stringify(updatedEmails));
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-[#f4e5ff]">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="relative">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleEmailChange}
              onFocus={handleEmailFocus}
              onBlur={handleEmailBlur}
              onKeyDown={handleEmailKeyDown}
              className="w-full p-3 border border-gray-300 rounded-lg focus:border-[#c7b0ee] outline-[#c7b0ee]"
              required
            />
            {showDropdown && (
              <ul className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                {previousEmails.map((prevEmail, index) => (
                  <li
                    key={index}
                    className="p-2 hover:bg-gray-200 cursor-pointer"
                    onClick={() => handleEmailSelect(prevEmail)}
                  >
                    {prevEmail}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c7b0ee]"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white font-medium py-3 rounded-lg transition-colors duration-300 hover:bg-[#c7b0ee]"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-gray-600 text-sm text-center">
          Don't have an account? <a href="/register" className="text-[#c7b0ee] font-semibold hover:underline">Sign up</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
