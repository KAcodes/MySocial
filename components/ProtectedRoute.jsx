
import { useAuthContext } from '@app/context/AuthContext';
import { useRouter } from "next/navigation";

const ProtectedRoute = () => {
    const {currentUser} = useAuthContext();
    const router = useRouter();

   

    if (!currentUser) {
        return  router.replace("/");
    }

  return children;
}

export default ProtectedRoute