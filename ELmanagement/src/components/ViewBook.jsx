import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import DeleteBook from './DeleteBook';

function ViewBooks() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const booksCollection = collection(db, 'books');
      const booksSnapshot = await getDocs(booksCollection);
      const booksList = booksSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBooks(booksList);
    };

    fetchBooks();
  }, []);

  return (
    <div className="min-h-screen bg-[#f4e5ff] flex flex-col">
      <div className="container mx-auto p-4 flex-grow">
        <h2 className="text-center text-4xl font-bold text-black-600 mb-9">All Books</h2>
        <div className="card-grid flex flex-wrap justify-center gap-8">
          {books.map((book) => (
            <div
              key={book.id}
              className="card bg-white text-black p-6 rounded-lg shadow-lg hover:shadow-xl hover:transform hover:-translate-y-2 transition"
            >
              {/* Display Book Image */}
              <div className="relative">
                <img
                  src={book.PhotoURL}
                  alt={book.BookName}
                  className="w-full h-48 object-contain rounded"
                  style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'contain' }}
                />
              </div>
              {/* Center align Book Name */}
              <h3 className="text-2xl font-semibold mb-4 text-center">{book.BookName}</h3>
              <p className="mb-2">Author: {book.AuthorName}</p>
              <p className="mb-2">ISBN: {book.ISBN}</p>
              <div className="flex justify-center space-x-4 mt-4">
                <Link
                  to={`/edit/${book.id}`}
                  className="bg-[#000000] hover:bg-[#c7b0ee] text-white font-bold py-2 px-4 rounded transition"
                >
                  Edit
                </Link>
                <DeleteBook id={book.id} />
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ViewBooks;
