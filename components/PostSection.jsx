"use client";

import { useState, useEffect } from "react";
import { doc, setDoc, deleteField } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import { db } from "@app/firebase/firestore/getData";
import { useAuthContext } from "@app/context/AuthContext";
import { storage } from "@app/firebase/config";

import UserPost from "./UserPost";
import CreatePostInfo from "./CreatePostInfo";
import fetchPosts from "@hooks/fetchPosts";
import Spinner from "./Spinner";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
  faImage
} from "@fortawesome/free-solid-svg-icons";

const Tester = () => {
  const { currentUser } = useAuthContext();
  const { posts, setPosts, loading, error } = fetchPosts();

  const [newTitle, setNewTitle] = useState("Title");
  const [newCaption, setNewCaption] = useState("Caption");
 
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
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageURL(downloadURL);
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
    setFile("")
    setNewCaption("")
    setNewTitle("")
  };

  const handleDeletePost = async(id) => {
    const userRef = doc(db, "users", currentUser.uid);
    try {
      const tempPosts = {...posts};
      delete tempPosts[id];
      setPosts(tempPosts);
      await setDoc(userRef, {
        posts: {
          [id]:deleteField()
        }
      }, {merge: true})
      

    } catch (err) {
      console.log(err)
    }

  }

  return (
    <div className="sm:w-full w-4/5 m-1 p-2 ">
      <h1 className= 'font-bold text-zinc-800 my-6 text-3xl text-center'>MySocial Homepage</h1>
      <div className="mb-7 bg-white rounded-lg p-4 md:w-4/5 sm:w-full mx-auto min-w-fit min-h-max">
        <div className="mx-auto max-w-fit p-2 my-3">
          <h1 className="font-semibold text-zinc-800 my-5 text-2xl">Create New Post</h1>
        </div>
        <div className="md:flex justify-evenly mx-auto space-y-5 max-h-max">
          <div className="flex flex-col mx-3 p-6 items-center my-auto space-y-3">
            <div className="space-y-3 flex flex-col max-w-[300px] mx-auto">
              <div className="flex items-center  justify-center">
                <label htmlFor="file" className="text-center font-medium text-zinc-800 text-lg mr-2 ">
                  Choose Image: 
                </label>
                <FontAwesomeIcon className="text-blue-400 hover:scale-150 transformation duration-300 text-2xl ml-2 cursor-pointer" icon={faImage}/>
              </div>
              <input
                type="file"
                id="file"
                placeholder="Add Image"
                className="hidden"
                onChange={(e) => {
                  setFile(e.target.files[0]);
                }}
              />
              <input
                type="text"
                placeholder="Title"
                className="border rounded shadow px-3 bg-white text-sm"
                onChange={(e) => setNewTitle(e.target.value)}
              />
              <input
                type="textarea"
                placeholder="Caption"
                className="max-w-full overflow-x-hidden border rounded shadow px-2 bg-white text-sm break-keep"
                onChange={(e) => setNewCaption(e.target.value)}
              />
            </div>
            <button
              onClick={handleCreatePost}
              className="w-fit px-4 sm:px-6 py-2 sm:py-3 blue_btn duration-300 hover:opacity-40 disabled:bg-gray-500"
              disabled={perc !== null && perc < 100}
            >
              Post
            </button>
          </div>
          <div className=" my-auto p-5 max-h-max">
            <p className="mx-auto max-w-fit p-2 my-3 font-medium text-zinc-800 text-xl">Post Preview</p>
            {currentUser && (
              <CreatePostInfo
                img={file}
                caption={newCaption}
                title={newTitle}
                name={currentUser.uid}
              />
            )}
          </div>
        </div>
      </div>
      <div className="md:3/5">
        {loading && (
          <Spinner/>
        )}
        {!loading && currentUser && (
          <>
            {posts &&
              Object.keys(posts).map((post, index) => {
                return (
                  <UserPost
                    key={index}
                    img={posts[post].img}
                    caption={posts[post].caption}
                    title={posts[post].title}
                    name={currentUser.uid}
                    handleDelete={() => handleDeletePost(post)}
                    postNum={post}
                  />
                );
              })}
          </>
        )}
      </div>
    </div>
  );
};

export default Tester;
