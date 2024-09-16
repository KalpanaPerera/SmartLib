import { useEffect, useState } from 'react';
import { db, auth } from '../firebase'; // Import Firestore DB and auth
import { collection, getDocs, doc, setDoc } from 'firebase/firestore';

function SearchBook() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBooks, setFilteredBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const booksCollection = collection(db, 'books');
      const booksSnapshot = await getDocs(booksCollection);
      const booksList = booksSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBooks(booksList);
      setFilteredBooks(booksList); // Initially show all books
    };

    fetchBooks();
  }, []);

  // Handle search input changes
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle search button click
  const handleSearch = () => {
    const value = searchTerm.toLowerCase();
    const filtered = books.filter(book =>
      book.BookName.toLowerCase().includes(value) ||
      book.AuthorName.toLowerCase().includes(value) ||
      book.ISBN.includes(value)
    );
    setFilteredBooks(filtered);
  };

  // Handle book borrowing
  const handleBorrow = async (book) => {
    const user = auth.currentUser;
    if (user) {
      const borrowRef = doc(db, `users/${user.uid}/borrowedBooks`, book.id);
      await setDoc(borrowRef, {
        bookID: book.id,
        BookName: book.BookName,
        dateOfReturn: '2024-10-10' // Example return date; adjust as needed
      });
      alert(`You have borrowed "${book.BookName}"`);
    } else {
      alert('You need to be logged in to borrow a book.');
    }
  };

  return (
    <div className="min-h-screen bg-[#f4e5ff] flex flex-col items-center">
  <div className="container w-full mx-0 flex-grow">
    <h2 className="w-full py-10 bg-black text-center text-4xl font-bold text-white mb-9 mx-0">
      Search Books
    </h2>

    {/* Search input and button container */}
    <div className="flex items-center justify-center mb-8">
      <input
        type="text"
        placeholder="Search by book name, author, or ISBN"
        value={searchTerm}
        onChange={handleSearchChange}
        className="w-2/3 p-3 rounded-l-lg border-[#c7b0ee] border-[#c7b0ee]"
      />
      {/* Search button */}
      <button
        onClick={handleSearch}
        className="bg-black text-white py-3 px-6 ml-4 rounded"
      >
        Search
      </button>
    </div>

    {/* Show message if no books found */}
    {filteredBooks.length === 0 ? (
      <p className="text-center text-xl text-black">
        No books found matching your search.
      </p>
    ) : (
      /* Display filtered book list */
      <div className="card-grid flex flex-wrap justify-center gap-8">
        {filteredBooks.map((book) => (
          <div
            key={book.id}
            className="bg-white text-black p-5 rounded-lg shadow-lg hover:shadow-xl transition w-64 md:w-72 lg:w-80 h-55 transition-transform transform hover:scale-105 hover:shadow-xl" // Reduced width
          >
            {/* Display Book Image */}
            <div className="relative mb-4">
              <img
                src={book.PhotoURL}
                alt={book.BookName}
                className="w-full h-48 object-contain rounded"
                style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'contain' }}
              />
            </div>
            {/* Book details */}
            <h3 className="text-2xl font-semibold mb-2 text-center">{book.BookName}</h3>
            <p className="mb-2 text-center">{book.AuthorName}</p>

            {/* Borrow button */}
            <div className="flex justify-center space-x-4 mt-4">
              <button
                onClick={() => handleBorrow(book)}
                className="bg-black text-white font-bold py-2 px-4 rounded hover:bg-[#c7b0ee]"
              >
                Borrow
              </button>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
</div>

  );
}

export default SearchBook;
