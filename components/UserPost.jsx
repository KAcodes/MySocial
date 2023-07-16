"use client"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faFilePen,
  faHeart,
  faMessageDots,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import fetchPosts from "@hooks/fetchPosts";

import { doc, setDoc } from "firebase/firestore";
import { db } from "@app/firebase/firestore/getData";
import { useAuthContext } from "@app/context/AuthContext";


const UserPost = ({
  img,
  caption,
  title,
  name,
  handleDelete,
  postNum,
}) => {
  
  const [editNo, setEditNo] = useState(null)
  const [editTitle, setEditTitle] = useState("");
  const [editCaption, setEditCaption] = useState("");

  const { currentUser } = useAuthContext();
  const { posts, setPosts } = fetchPosts()

  const addEdittedPost = async () => {
  
    setPosts({
      ...posts,
      [postNum]: {
        title: editTitle,
        caption: editCaption,
        img,
      },
    });
    setEditNo(null);

    const userRef = doc(db, "users", currentUser.uid);
    await setDoc(
      userRef,
      {
        posts: {
          [postNum]: {
            title: editTitle,
            caption: editCaption,
            img,
          },
        },
      },
      { merge: true }
    );
   
    setEditTitle("");
    setEditCaption("");

  };
  
  
  return (
    <>
      <div className="my-8 bg-transparent flex justify-center items-center">
        <div className="w-3/5 max-h-fit container bg-white rounded-xl shadow-lg ">
          <h2 className="text-gray-800 font-semibold cursor-pointer ml-4 mt-3">
            {name}
          </h2>
          <div className="flex items-center justify-between mx-4 p-2 ">
            {(editNo == postNum) ? (
              <input
              type="text"
              placeholder={title}
              className="border rounded shadow px-3 bg-white text-sm"
              onChange={(e) => setEditTitle(e.target.value)}
            />
            ) : (
              <h1 className="text-2xl mt-2 ml-4 font-medium text-gray-800 cursor-pointer hover:text-gray-900 transition duration-100">
                {title}
              </h1>
            )}

            <div className="space-x-5 text-lg">
              {(editNo == postNum) ? (
                <FontAwesomeIcon
                  icon={faFilePen}
                  className="cursor-pointer hover:scale-150 transformation duration-300 text-green-400"
                  onClick={addEdittedPost}
                />
              ) : (
                <FontAwesomeIcon
                  icon={faFilePen}
                  className="cursor-pointer hover:scale-150 transformation duration-300  text-blue-400"
                  onClick={() => setEditNo(postNum)}
                />
              )}
              <FontAwesomeIcon
                icon={faTrash}
                onClick={handleDelete}
                className="cursor-pointer hover:scale-150 transformation duration-300"
              />
            </div>
          </div>
          <img
            className="w-full object-contain cursor-pointer max-h-[500px] transform transition duration-500 hover:scale-105 my-3"
            src={img}
            alt=""
          />
          <div className="flex items-center justify-between mx-4 p-2 ">
            {(editNo == postNum) ? <input
                type="textarea"
                placeholder={caption}
                className="max-w-full overflow-x-hidden border rounded shadow px-2 bg-white text-sm break-keep"
                onChange={(e) => setEditCaption(e.target.value)}
              />
              : 
              <p>{caption}</p>
            }
            <FontAwesomeIcon
              icon={faHeart}
              className="cursor-pointer hover:scale-150 hover:text-red-400 transformation duration-300"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default UserPost;
