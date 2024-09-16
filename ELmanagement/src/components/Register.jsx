import { useState } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

function Register() {
  const [name, setName] = useState(''); // Add a state for name
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(''); // Initially no role selected
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!role) { // Prevent submission if role is not selected
      alert('Please select a role.');
      return;
    }

    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Add user name, email, and role to Firestore
      await setDoc(doc(db, 'users', user.uid), {
        name,  // Save the user's name
        email,
        role,
      });

      alert('Registration successful!');
      navigate('/profile');
    } catch (error) {
      console.error('Error registering:', error.message);
      alert(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-[#f4e5ff]">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Create an Account</h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:border-[#c7b0ee] outline-[#c7b0ee]"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:border-[#c7b0ee] outline-[#c7b0ee]"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:border-[#c7b0ee] outline-[#c7b0ee]"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Role
            </label>
            <div className="flex items-center space-x-4">
              <label>
                <input
                  type="radio"
                  name="role"
                  value="member"
                  checked={role === 'member'}
                  onChange={(e) => setRole(e.target.value)}
                  className="mr-2"
                />
                Member
              </label>
              <label>
                <input
                  type="radio"
                  name="role"
                  value="admin"
                  checked={role === 'admin'}
                  onChange={(e) => setRole(e.target.value)}
                  className="mr-2"
                />
                Admin
              </label>
            </div>
          </div>
          <button
            type="submit"
            href="/login" className="w-full bg-black text-white font-medium py-3 rounded-lg transition-colors duration-300 hover:bg-[#c7b0ee]"
          >
            Register
          </button>
        </form>
        <p className="mt-4 text-gray-600 text-sm text-center">
          Already have an account? <a href="/login" className="text-[#c7b0ee] font-semibold hover:underline">Login</a>
        </p>
      </div>
    </div>
  );
}

export default Register;
