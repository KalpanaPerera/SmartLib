import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { Timestamp } from 'firebase/firestore'; // If using Firestore Timestamp

function MemberActivityReport() {
  const [memberActivity, setMemberActivity] = useState([]);

  useEffect(() => {
    const fetchMemberActivity = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'memberActivity'));
        const activityList = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          console.log(data); // Log the fetched data to check its structure

          // If `dateBorrowed` is a Firestore Timestamp, convert it to a readable date
          const dateBorrowed = data.dateBorrowed instanceof Timestamp
            ? data.dateBorrowed.toDate().toLocaleDateString() 
            : data.dateBorrowed;

          return {
            id: doc.id,
            memberName: data.memberName,
            bookName: data.bookName,
            dateBorrowed, // Store the converted date
          };
        });
        setMemberActivity(activityList);
      } catch (error) {
        console.error('Error fetching member activity:', error);
      }
    };

    fetchMemberActivity();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h2 className="text-3xl font-bold mb-6">Member Activity</h2>
      {memberActivity.length > 0 ? (
        <table className="table-auto w-full bg-white rounded-lg shadow-lg">
          <thead>
            <tr className="bg-gray-300 text-left">
              <th className="p-3">Member Name</th>
              <th className="p-3">Book Borrowed</th>
              <th className="p-3">Date Borrowed</th>
            </tr>
          </thead>
          <tbody>
            {memberActivity.map((activity) => (
              <tr key={activity.id}>
                <td className="p-3">{activity.memberName}</td>
                <td className="p-3">{activity.bookName}</td>
                <td className="p-3">{activity.dateBorrowed}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No activity found for members.</p>
      )}
    </div>
  );
}

export default MemberActivityReport;
