import React, { useState, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

function HomePage() {
  const quotes = [
    '“A room without books is like a body without a soul.” — Marcus Tullius Cicero',
    '“A good book is an event in my life.” — Stendhal',
    '“A library is not a luxury but one of the necessities of life.” — Henry Ward Beecher',
    '“Books are a uniquely portable magic.” — Stephen King',
    '“The only thing that you absolutely have to know is the location of the library.” — Albert Einstein',
  ];

  const [currentQuote, setCurrentQuote] = useState(0);
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const booksPerPage = 4; // Set a fixed number of books per page
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [quotes.length]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'books'));
        const booksList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setBooks(booksList);
      } catch (error) {
        console.error('Error fetching books:', error.message);
      }
    };

    fetchBooks();
  }, []);

  const handleBorrowClick = () => {
    navigate('/login');
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = currentPage * booksPerPage;
  const visibleBooks = books.slice(startIndex, startIndex + booksPerPage);

  return (
    <div className="min-h-screen bg-[#f4e5ff] font-sans">
      {/* Slider Section */}
      <div className="bg-black text-white py-10">
        <h1 className="text-4xl font-bold text-center mb-14">Welcome to SmartLib!</h1>
        <div className="text-center text-2xl font-medium italic px-6 relative overflow-hidden">
          <p className="inline-block max-w-4xl mx-auto break-words text-white animate-fadeInOut">
            {quotes[currentQuote]}
          </p>
        </div>
      </div>

      {/* Book Cards Section */}
      <div className="container mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold text-center mb-6">Explore Our Collection</h2>
        {visibleBooks.length > 0 ? (
          <div className="card-grid flex flex-wrap justify-center gap-8">
            {visibleBooks.map((book) => (
              <div
                key={book.id}
                className="bg-white text-black p-5 rounded-lg shadow-lg hover:shadow-xl transition w-64 md:w-72 lg:w-80 h-55 transition-transform transform hover:scale-105 hover:shadow-xl" // Same card styling
              >
                <div className="relative mb-4">
                  <img
                    src={book.PhotoURL || '/assets/default-book.jpg'}
                    alt={book.BookName}
                    className="w-full h-48 object-contain rounded"
                    style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'contain' }}
                  />
                </div>
                <h3 className="text-2xl font-semibold mb-2 text-center">{book.BookName}</h3>
                <p className="mb-2 text-center">{book.AuthorName}</p>

                <div className="flex justify-center space-x-4 mt-4">
                  <button
                    onClick={handleBorrowClick}
                    className="bg-black text-white font-bold py-2 px-4 rounded hover:bg-[#c7b0ee]"
                  >
                    Borrow
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-xl">No books available</p>
        )}

        {/* Navigation Dots */}
        <div className="text-center mt-6">
          {books.length > booksPerPage && (
            <div className="flex justify-center space-x-2">
              {[...Array(Math.ceil(books.length / booksPerPage)).keys()].map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`w-3 h-3 rounded-full ${
                    currentPage === page ? 'bg-black' : 'bg-gray-400'
                  } cursor-pointer`}
                ></button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Join as a Member Section */}
      <div className="text-center py-20 bg-black text-white">
        <h2 className="text-2xl font-bold mb-4">Become a SmartLib Member</h2>
        <p className="text-lg mb-6">Join our community and access thousands of books!</p>
        <NavLink to="/register">
          <button className="bg-[#c7b0ee] text-black py-3 px-6 rounded-lg hover:bg-white">
            Join as a Member
          </button>
        </NavLink>
      </div>
    </div>
  );
}

export default HomePage;
