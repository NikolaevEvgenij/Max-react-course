import React, { useState } from 'react';

import UsersList from './components/Users/UsersList';
import AddUser from './components/Users/AddUser';



function App() {

   const [usersList, setUsersList] = useState([
      { userName: 'Женя', age: 24, id: '221' },
      { userName: 'Света', age: 52, id: '231' }
   ])

   const addUsersHandler = (enteredUserName, enteredAge) => {
      setUsersList(prevList => {
         return [...prevList, { userName: enteredUserName, age: enteredAge, id: Math.random().toString() }]
      })
   }

   return (
      <div>
         <AddUser addUser={addUsersHandler} />
         <UsersList usersList={usersList} />
      </div>
   );
}

export default App;
