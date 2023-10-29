"use client"
import Profile from "../../../../components/Profile";
import useUser from "../../../../hooks/useUser";
function Page(){
    const userObject=useUser();

    if(!userObject.fullyLoaded){
        return <p>LOADING!!!!!!!</p>
    }
    return (
      <Profile user_id={userObject.user.id} />
    )
}

export default Page;