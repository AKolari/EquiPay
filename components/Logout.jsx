"use client";
import { useRouter } from "next/navigation";
import { logoutUser } from "../utils/dataQuery";

const Logout = () => {
  const Router = useRouter();

  const logout = async () => {
    const logoutStatus = await logoutUser();
    console.log(logoutStatus.message);
  };

  return (
    <>
      {/*<div className="m-3 text-right">*/}
      <button
        onClick={logout}
        className="text-white bg-stone-700 hover:bg-stone-800 focus:ring-4 focus:outline-none focus:ring-stone-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-stone-600 dark:hover:bg-stone-700 dark:focus:ring-stone-800"
      >
        Log Out
      </button>
      {/*</div>*/}
    </>
  );
};

export default Logout;
