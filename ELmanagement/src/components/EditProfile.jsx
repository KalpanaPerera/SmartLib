import { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

function EditProfile() {
  const user = auth.currentUser;
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState(''); // State for role (Profile type)

  useEffect(() => {
    if (!user) {
      alert('You need to be logged in to edit your profile.');
      navigate('/login');
    } else {
      // Fetch current user data
      const fetchUserData = async () => {
        const userDoc = doc(db, 'users', user.uid);
        const docSnapshot = await getDoc(userDoc);
        if (docSnapshot.exists()) {
          const userData = docSnapshot.data();
          setName(userData.name);
          setEmail(user.email); // Set email from auth
          setRole(userData.role); // Set role (Profile type)
        }
      };

      fetchUserData();
    }
  }, [user, navigate]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user) {
      const userDoc = doc(db, 'users', user.uid);
      await setDoc(userDoc, { name }, { merge: true }); // Update only the name
      alert('Profile updated successfully!');
      navigate('/profile'); // Redirect back to the profile page
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-[#f4e5ff]">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-bold text-center mb-6">Edit Profile</h2>

        {/* Profile Type */}
        <p className="text-xl font-semibold text-center mb-4">
          {`Profile Type: ${role.charAt(0).toUpperCase() + role.slice(1)}`}
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name input */}
          <div>
            <label className="block text-lg font-medium mb-2">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>

          {/* Email display */}
          <div>
            <label className="block text-lg font-medium mb-2">Email</label>
            <input
              type="email"
              value={email}
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
              disabled
            />
          </div>

          {/* Submit button */}
          <button type="submit" className="w-full bg-black text-white py-3 rounded-lg hover:bg-[#c7b0ee]">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;
