import { Navigate } from "react-router-dom";
import { useValue } from "../contextApi/context";
import toast from 'react-hot-toast';
import { useEffect } from "react";
import { useFirebase } from "../firebase/firebaseConfig";
 // create high-level protected route below

 const ProtectedRoute = ({children})=>{
  const {user} = useFirebase();

  //  useEffect(()=>{
    if(!user){
      toast.error("You must be logged in before accessing");
      return <Navigate to="/" replace={true}/>;
    }
  //  },[isLoggedIn])
    return children;
  }
  export default ProtectedRoute;