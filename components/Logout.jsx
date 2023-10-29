"use client"
import { useRouter } from "next/navigation";
import { logoutUser } from "../utils/dataQuery";

const Logout= ()=>{
    const Router= useRouter();

    const logout = async()=>{
        
        const logoutStatus= await logoutUser();
        console.log(logoutStatus.message);
        
        
    }

    return<>
        <button onClick={logout} >LOGOUT</button>
    
    
    
    
    </>

}

export default Logout;