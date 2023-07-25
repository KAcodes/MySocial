import { useEffect, useState } from "react";
import { doc, getDoc} from "firebase/firestore";
import { db } from '@app/firebase/firestore/getData';
import { useAuthContext } from '@app/context/AuthContext';




const fetchPosts = () => {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [posts, setPosts] = useState({});
    const [profPic, setProfPic] = useState("")
  const { currentUser } = useAuthContext();

  useEffect(() => {
    const fetchData = async() => {
      try {
        const docSnap = await getDoc(doc(db, "users", currentUser.uid,));
        if (docSnap.exists()) {
          setPosts(docSnap.data().posts)  
        }
      }
      catch (err){
        setError("failed to load posts");
        console.log(err)
      }
      finally {
        setLoading(false)
      }
    }
    fetchData();
    
  }, [posts])

  /* useEffect(() => {
    const fetchProfPic = async() => {
      
      const docSnap = await getDoc(doc(db, "userProfilePic", currentUser.uid,));
      if (docSnap.exists()) {
        setProfPic(docSnap.data().profPic)  
      }
    }  
    fetchProfPic();
  }) */



  return {posts, loading, error, profPic, setPosts}
}

export default fetchPosts

