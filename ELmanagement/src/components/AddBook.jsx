import { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

function AddBook() {
  const [bookName, setBookName] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [isbn, setIsbn] = useState('');

  const handleAddBook = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'books'), {
        BookName: bookName,
        AuthorName: authorName,
        ISBN: isbn,
      });
      alert('Book added successfully!');
      setBookName('');
      setAuthorName('');
      setIsbn('');
    } catch (error) {
      console.error('Error adding book:', error.message);
      alert(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-[#f4e5ff]">
      <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md transition-transform duration-300">
        <h2 className="text-3xl font-bold text-black mb-6 text-center">
          Add Book
        </h2>
        <form onSubmit={handleAddBook} className="space-y-4">
          <div>
            <label className="block text-20 font-medium text-gray-700 mb-1">
              Book Name
            </label>
            <input
              type="text"
              placeholder="Book Name"
              value={bookName}
              onChange={(e) => setBookName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 outline-none transition-colors duration-200"
              required
            />
          </div>
          <div>
            <label className="block text-20 font-medium text-gray-700 mb-1">
              Author Name
            </label>
            <input
              type="text"
              placeholder="Author Name"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 outline-none transition-colors duration-200"
              required
            />
          </div>
          <div>
            <label className="block text-20 font-medium text-gray-700 mb-1">
              ISBN
            </label>
            <input
              type="text"
              placeholder="ISBN"
              value={isbn}
              onChange={(e) => setIsbn(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 outline-none transition-colors duration-200"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white font-medium py-3 rounded-lg hover:bg-[#c7b0ee] transition-colors duration-300"
          >
            Add Book
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddBook;
