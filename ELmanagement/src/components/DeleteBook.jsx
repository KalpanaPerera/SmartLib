import { db } from '../firebase';
import { doc, deleteDoc } from 'firebase/firestore';
import PropTypes from 'prop-types';
import React from 'react';

function DeleteBook({ id }) {
  const handleDeleteBook = async () => {
    try {
      await deleteDoc(doc(db, 'books', id));
      alert('Book deleted successfully!');
      window.location.reload();
    } catch (error) {
      console.error('Error deleting book:', error.message);
      alert('Failed to delete book.');
    }
  };

  return (
    <button
      onClick={handleDeleteBook}
      className="text-red-500 font-bold hover:text-red-600 transition-colors duration-300"
    >
      Delete
    </button>
  );
}

DeleteBook.propTypes = {
  id: PropTypes.string.isRequired,
};

export default DeleteBook;
