"use client"


import { useState, useRef, useEffect } from 'react'
import { doc, setDoc, collection, addDoc } from 'firebase/firestore'
import { db } from '@app/firebase/firestore/getData';
import { useAuthContext } from '@app/context/AuthContext';
import { storage } from "@app/firebase/config";
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import UserPost from './UserPost';

const Tester = () => {

    const { currentUser } = useAuthContext();
    const [newTitle, setNewTitle] = useState("");
    const [newCaption, setNewCaption] = useState("");
    const [imageURL, setImageURL] = useState("");
    const [file, setFile] = useState("");
    const [perc, setPerc] = useState(null);
    const [postList, setPostList] = useState([]); 

   
    useEffect(() => {
        const uploadFile = () => {
            const name = new Date().getTime() + file.name 
            const storageRef = ref(storage, name)
            const uploadTask = uploadBytesResumable(storageRef, name)

            uploadTask.on('state_changed', 
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    setPerc(progress)
                    switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                        
                    }
                }, 
                (error) => {
                    // Handle unsuccessful uploads
                }, 
                () => {
                    
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setImageURL(downloadURL)
                    });
                }
            )
        }
        file && uploadFile();
    }, [file])
    
    console.log(postList)

    const handleCreatePost = async() => {
        
        if (!newTitle || !newCaption) {
            return
        }
        const newKey = Object.keys(postList).length === 0 ? 1 : Math.max(...Object.keys(postList)) + 1;

        setPostList({...postList, [newKey]: {
            title: newTitle,
            caption: newCaption,
            img: imageURL
        }})
       
        
        const userRef = doc(db, 'users', currentUser.uid)
         
        await setDoc(userRef, {
            "posts": {
                [newKey]: {
                    title: newTitle,
                    caption: newCaption,
                    img: imageURL
                }
            }
        }, {merge: true})

        
    }
    
    
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
            className='w-fit px-4 sm:px-6 py-2 sm:py-3 bg-blue-400 text-white font-medium text-base duration-300 hover:opacity-40' 
            disabled={perc !== null && perc < 100}>ADD
            </button>
        </div>
        <img src={imageURL} alt="testimg"></img>
        <h1>Create New Post</h1>
        {currentUser && <UserPost img={file} caption={newCaption} title={newTitle} name={currentUser.uid}/>}
            
        
    </div>
  )
}

export default Tester