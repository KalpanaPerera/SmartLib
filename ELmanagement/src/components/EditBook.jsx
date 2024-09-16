import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

function EditBook() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bookName, setBookName] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [isbn, setIsbn] = useState('');

  useEffect(() => {
    const fetchBook = async () => {
      const docRef = doc(db, 'books', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const book = docSnap.data();
        setBookName(book.BookName);
        setAuthorName(book.AuthorName);
        setIsbn(book.ISBN);
      } else {
        console.log('No such document!');
      }
    };

    fetchBook();
  }, [id]);

  const handleUpdateBook = async (e) => {
    e.preventDefault();
    try {
      const docRef = doc(db, 'books', id);
      await updateDoc(docRef, {
        BookName: bookName,
        AuthorName: authorName,
        ISBN: isbn,
      });
      alert('Book updated successfully!');
      navigate('/'); // Redirect to the home or books list page
    } catch (error) {
      console.error('Error updating book:', error.message);
      alert('Failed to update book.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#f4e5ff]">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold text-black-500 mb-6 text-center">Edit Book</h2>
        <form onSubmit={handleUpdateBook} className="space-y-6">
          <div>
            <label className="block text-20 font-medium text-gray-700 mb-1">Book Name</label>
            <input
              type="text"
              placeholder="Book Name"
              value={bookName}
              onChange={(e) => setBookName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-20 font-medium text-gray-700 mb-1">Author Name</label>
            <input
              type="text"
              placeholder="Author Name"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-20 font-medium text-gray-700 mb-1">ISBN</label>
            <input
              type="text"
              placeholder="ISBN"
              value={isbn}
              onChange={(e) => setIsbn(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-md font-medium hover:bg-[#c7b0ee] transition-colors duration-300"
          >
            Update Book
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditBook;
