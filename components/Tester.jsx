"use client"

import React from 'react'
import { useState, useRef } from 'react'
import { doc, setDoc, collection, addDoc } from 'firebase/firestore'
import { db } from '@app/firebase/firestore/getData';
import { useAuthContext } from '@app/context/AuthContext';
import { userInputs } from '@app/formSource';
import UserPost from './UserPost';

const Tester = () => {

    const { currentUser } = useAuthContext();
    const [newTitle, setNewTitle] = useState("");
    const [newCaption, setNewCaption] = useState("");
    const [file, setFile] = useState("");

    const [postList, setPostList] = useState([]); 

   
    console.log(file)
    
    

    const handleCreatePost = async() => {
        
        if (!newTitle || !newCaption) {
            return
        }
        const newKey = Object.keys(postList).length === 0 ? 1 : Math.max(...Object.keys(postList)) + 1;

        setPostList({...postList, [newKey]: {
            title: newTitle,
            caption: newCaption
        }})
       
        
        const userRef = doc(db, 'users', currentUser.uid)
         
        await setDoc(userRef, {
            "posts": {
                [newKey]: {
                    title: newTitle,
                    caption: newCaption
                }
            }
        }, {merge: true})

        
    }
    console.log(postList);
    
  return (
    <div>
        <div className='flex items-stretch'>
            <input type='text' placeholder="Title"
             className="outline-none p-3 text-base sm:text-lg text-slate-900 flex-1" 
             onChange={(e) => setNewTitle(e.target.value)}/>
             <input type='text' placeholder="Caption"
             className="outline-none p-3 text-base sm:text-lg text-slate-900 flex-1"
             onChange={(e) => setNewCaption(e.target.value)} />
             <input type='file' id='file'
             className="outline-none p-3 text-base sm:text-lg text-slate-900 flex-1"
             onChange={(e) => setFile(e.target.files[0])} />
            

            <button onClick={ handleCreatePost}
            className='w-fit px-4 sm:px-6 py-2 sm:py-3 bg-blue-400 text-white font-medium text-base duration-300 hover:opacity-40'>ADD
            </button>
        </div>
        
        {Object.keys(postList).map((post, id) => {
                return (
                    <UserPost key={id} img={file} caption={postList[post].caption} title={postList[post].title} name={currentUser.uid}/>
                )
            }
        )}
        
    </div>
  )
}

export default Tester