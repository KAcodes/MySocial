"use client"

import { useState, useEffect } from 'react';

const FriendSidebar = () => {

  const [profileArray, setProfileArray] = useState([])
 
  useEffect(() => {
    
          const createFriends = async () => {
            const response = await fetch("https://randomuser.me/api/?results=30");
            const data = await response.json();
            console.log(data)
            setProfileArray(data.results);
          }
          createFriends()
  }, [])
  
  return (
    <div className="bg-slate-100 w-1/5 ml-3 p-1">
      <div className='text-center font-bold text-zinc-800 mb-2 text-xl'>
        <span>Contacts</span>
      </div>
      <div className='flex flex-col'>
        {profileArray.map((user, index) => {
          return (
            <button key={index} className="flex flex-row p-2 my-2 mx-1 space-x-4 place-items-center rounded transition ease-in-out hover:bg-slate-300 hover:opacity-95 duration-200">
                <div className="flex flex-row">
                  <img src={user.picture.thumbnail} className="rounded-full"/>
                  <span className='bg-green-600 rounded-full h-2 w-2 online_dot'></span>
                </div>
                <p className=''>{user.name.first} {user.name.last}</p>
            </button>
          )})
          }
      </div>
    </div>
  )
}

export default FriendSidebar