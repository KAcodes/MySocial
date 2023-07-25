"use client";

import { useState, useEffect } from "react";
import { doc, setDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import { db } from "@app/firebase/firestore/getData";
import { useAuthContext } from "@app/context/AuthContext";
import { storage } from "@app/firebase/config";


const Settings = () => {

  const [imageURL, setImageURL] = useState("");
  const [file, setFile] = useState(null);
  const [perc, setPerc] = useState(null);
  const {currentUser} = useAuthContext();

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

  const handleAddProfilePic = async () => {
    if (!imageURL) {
      return;
    }
    const userRef = doc(db, "userProfilePic", currentUser.uid);
    await setDoc(userRef, {
        profPic: imageURL
      },
      { merge: true }
    );
    setFile(null);
  };

  return (
    <section className="w-full flex-center flex-col">
        <h1>My settings</h1>
        <h1 >User email = {currentUser && currentUser.email}</h1>
        <h3>Username = {currentUser && currentUser.uid}</h3>
        <button>Change Username</button>
        <input
                type="file"
                id="file"
                placeholder="Change Profile Pic"
                className=""
                onChange={(e) => {
                  setFile(e.target.files[0]);
                }}
              />
        <img 
          src={file ? URL.createObjectURL(file) : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"}
          className="object-contain max-h-[200px] mx-auto"
          alt="User profile picture"
          />
        {file && <button 
          onClick={handleAddProfilePic}
        >Confirm Profile Picture</button>}
    </section>
  )
}

export default Settings