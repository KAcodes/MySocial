import { useEffect, useState } from "react";
import UserPost from "./UserPost";
import { doc, getDoc} from "firebase/firestore";
import { db } from '@app/firebase/firestore/getData';
import { useAuthContext } from '@app/context/AuthContext';

const Post = () => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [posts, setPosts] = useState(null)
  const { currentUser } = useAuthContext();

  useEffect(() => {
    const fetchData = async() => {
      try {
        const docSnap = await getDoc(doc(db, "users", currentUser.uid,));
        if (docSnap.exists()) {
          setPosts(docSnap.data().posts)
          console.log(docSnap.data().posts);
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
  }, [])

  

  return (
    <>
      { loading && (
        <div>
          <p>MMMM I'm Loading</p>
        </div>
      )} 
      {(!loading && posts) && (
        <>
          {Object.keys(posts).map((post, index) => {
            return (
              <UserPost key={index} /* img={posts[post].img} */ caption={posts[post].caption} title={posts[post].title} name={currentUser.uid}/>
            )
          })}
        </>
      )}
    </>
  );
};

export default Post;
