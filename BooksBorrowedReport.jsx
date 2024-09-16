import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

function BooksBorrowedReport() {
  const [borrowedBooks, setBorrowedBooks] = useState([]);

  useEffect(() => {
    const fetchBorrowedBooks = async () => {
      const querySnapshot = await getDocs(collection(db, 'borrowedBooks'));
      const booksList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBorrowedBooks(booksList);
    };

    fetchBorrowedBooks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h2 className="text-3xl font-bold mb-6">Books Borrowed by Members</h2>
      {borrowedBooks.length > 0 ? (
        <table className="table-auto w-full bg-white rounded-lg shadow-lg">
          <thead>
            <tr className="bg-gray-300 text-left">
              <th className="p-3">Member Name</th>
              <th className="p-3">Book Name</th>
              <th className="p-3">Borrow Date</th>
              <th className="p-3">Return Date</th>
            </tr>
          </thead>
          <tbody>
            {borrowedBooks.map((book) => (
              <tr key={book.id}>
                <td className="p-3">{book.memberName}</td>
                <td className="p-3">{book.BookName}</td>
                <td className="p-3">{book.borrowDate}</td>
                <td className="p-3">{book.returnDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No borrowed books found.</p>
      )}
    </div>
  );
}

export default BooksBorrowedReport;
