"use client";

import { useState, useEffect } from "react";
import { doc, setDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import { db } from "@app/firebase/firestore/getData";
import { useAuthContext } from "@app/context/AuthContext";
import { storage } from "@app/firebase/config";

import UserPost from "./UserPost";
import CreatePostInfo from "./CreatePostInfo";
import fetchPosts from "@app/hooks/fetchPosts";

const Tester = () => {
  const { currentUser } = useAuthContext();
  const { posts, setPosts, loading, error } = fetchPosts();
  const [newTitle, setNewTitle] = useState("");
  const [newCaption, setNewCaption] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [file, setFile] = useState("");
  const [perc, setPerc] = useState(null);

  //Upload image file to Firebase Storage
  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name;
      const storageRef = ref(storage, name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setPerc(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          // Handle unsuccessful uploads
          console.log(error)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageURL(downloadURL);
            console.log(downloadURL)
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);

  
  //add new post to database and post list
  const handleCreatePost = async () => {
    if (!newTitle || !newCaption) {
      return;
    }
    const newKey =
      Object.keys(posts).length === 0 ? 1 : Math.max(...Object.keys(posts)) + 1;
    setPosts({
      ...posts,
      [newKey]: {
        title: newTitle,
        caption: newCaption,
        img: imageURL,
      },
    });
    const userRef = doc(db, "users", currentUser.uid);
    await setDoc(
      userRef,
      {
        posts: {
          [newKey]: {
            title: newTitle,
            caption: newCaption,
            img: imageURL,
          },
        },
      },
      { merge: true }
    );
  };

  return (
    <div className="w-4/5 ">
      <h1>Create New Post</h1>
      <div className="flex items-stretch">
        <input
          type="text"
          placeholder="Title"
          className="border rounded shadow py-1 px-3 bg-white text-sm"
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Caption"
          className="border rounded shadow py-1 px-3 bg-white text-sm"
          onChange={(e) => setNewCaption(e.target.value)}
        />
        <input
          type="file"
          id="file"
          className="border rounded shadow py-1 px-3 bg-white text-sm"
          onChange={(e) => {setFile(e.target.files[0])
            console.log(e.target.files[0])}}
        />

        <button
          onClick={handleCreatePost}
          className="w-fit px-4 sm:px-6 py-2 sm:py-3 blue_btn duration-300 hover:opacity-40 disabled:bg-gray-500"
          disabled={perc !== null && perc < 100}
        >
          ADD
        </button>
      </div>
      
      
      {currentUser && (
        <CreatePostInfo
          img={file}
          caption={newCaption}
          title={newTitle}
          name={currentUser.uid}
        />
      )}
      {loading && (
        <div>
          <p>MMMM I'm Loading</p>
        </div>
      )}
       {!loading && (
        <>
          {posts && Object.keys(posts).map((post, index) => {
            return (
              <UserPost
                key={index}
                img={posts[post].img}
                caption={posts[post].caption}
                title={posts[post].title}
                name={currentUser.uid}
              />
            );
          })}
        </>
      )}
    </div>
  );
};

export default Tester;
