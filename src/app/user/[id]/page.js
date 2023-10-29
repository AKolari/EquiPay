"use client"
import Profile from "../../../../components/Profile";
import useUser from "../../../../hooks/useUser";
import Router, { useRouter } from "next/navigation";
function Page(){
    const userObject=useUser();
    const router = useRouter();
    if(!userObject.fullyLoaded){
        return <p>LOADING!!!!!!!</p>
    }
    else
    if(!userObject.user){
      setTimeout(() => {
        router.replace("/login");
      }, 1000);
    }
    else
    return (
      <Profile user_id={userObject.user.id} />
    )
}

export default Page;