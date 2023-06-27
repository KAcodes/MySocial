import { useState, useEffect, useRef } from "react";
import { doc, getDoc } from 'firebase/firestore';
import { storage } from "@app/firebase/config";
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'

export default function useFetchPosts() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [posts, setPosts] = useState()
}