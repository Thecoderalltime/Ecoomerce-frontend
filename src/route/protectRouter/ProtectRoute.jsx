import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import { sleletedUser } from "../../Components/auth/authSlice"


const ProtectRoute = ({children}) => {

   const user =useSelector(sleletedUser)
    if (!user) {
       return <Navigate to="/login"></Navigate>
    }
  return children
   
  
}

export default ProtectRoute