import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';
import AddBook from './components/AddBook';
import EditBook from './components/EditBook';
import ViewBook from './components/ViewBook';
import SearchBook from './components/SearchBook';
import EditProfile from './components/EditProfile';
import ReportTypes from './components/ReportTypes';
// import BooksBorrowedReport from './components/BooksBorrowedReport';
// import MemberActivityReport from './components/MemberActivityReport';
// import BookAvailabilityReport from './components/BookAvailabilityReport';
import Footer from './components/Footer';
import './App.css';
import logo from './assets/logo.png';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* Fixed Navbar */}
        <nav className="bg-[#000000] p-3 shadow-md fixed top-0 left-0 w-full z-50">
          <div className="container mx-auto flex justify-between items-center">
            {/* Logo */}
            <NavLink to="/home">
              <img src={logo} alt="Logo" className="h-12 w-30" />
            </NavLink>
            
            {/* Navigation links */}
            <div className="flex space-x-4">
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  `text-white px-4 py-2 rounded-lg ${isActive ? 'bg-[#c7b0ee]' : 'hover:bg-[#000000]'} transition-colors`
                }
              >
                Register
              </NavLink>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `text-white px-4 py-2 rounded-lg ${isActive ? 'bg-[#c7b0ee]' : 'hover:bg-gray-700'} transition-colors`
                }
              >
                Login
              </NavLink>
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  `text-white px-4 py-2 rounded-lg ${isActive ? 'bg-[#c7b0ee]' : 'hover:bg-gray-700'} transition-colors`
                }
              >
                Profile
              </NavLink>
              <NavLink
                to="/searchbook"
                className={({ isActive }) =>
                  `text-white px-4 py-2 rounded-lg ${isActive ? 'bg-[#c7b0ee]' : 'hover:bg-gray-700'} transition-colors`
                }
              >
                Search Books
              </NavLink>
            </div>
          </div>
        </nav>

        {/* Main content */}
        <main className="flex-1 pt-16"> {/* Added padding-top to avoid content overlap with fixed navbar */}
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/add" element={<AddBook />} />
            <Route path="/edit/:id" element={<EditBook />} />
            <Route path="/viewbook" element={<ViewBook />} />
            <Route path="/searchbook" element={<SearchBook />} />
            <Route path="/editprofile" element={<EditProfile />} />
            <Route path="/reporttypes" element={<ReportTypes />} />
            {/* <Route path="/borrowedbooks" element={<BooksBorrowedReport />} />
            <Route path="/memberactivity" element={<MemberActivityReport />} />
            <Route path="/bookavailability" element={<BookAvailabilityReport />} /> */}
          </Routes>
        </main>

        <Footer /> {/* Footer is included here */}
      </div>
    </Router>
  );
}

export default App;
