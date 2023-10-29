"use client";

import React from "react";

import Link from "next/link";
import "/src/app/globals.css";
import { useState, useEffect } from "react";


import { useReducer } from "react";
import { useRouter } from "next/navigation";
import Wallet from "./Wallet.jsx";

import {
  
  getWallets,
  
  
} from "../utils/dataQuery.js";

//Is now specific by user_id.
const Profile = ({ user_id }) => {
  const [localUsername, setLocalUsername] = useState("");
  const [localWallets, setLocalWallets] = useState({});
  const router = useRouter();

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const { data: wallets } = await getWallets(user_id);
        

        var allWallets = {};

        //Adds list_ids as keys in a dictionary with their respective titles
     

        for(let i=0; i<wallets.length; i++){
            allWallets[i]=wallets[i].id;
        }

        //Update localWallets
  
        setLocalWallets(allWallets);
      } catch (error) {
        // Handle the error
        console.log("Error fetching lists:", error);
      }
    };
    fetchLists();
  }, [user_id]);

  


  return (
    <>
    
      {/* <h3 className="text-start text-5xl p-10">Hello {localUsername}!</h3> */}
      <h3 className="text-center text-5xl font-bold p-10">Current Wallet</h3>
      {/* <p>{localWallets
}</p> */}

     <div className="grid flex justify-center">
        {Object.entries(localWallets
  ).map(([key, value]) => {
            console.log(value)
          return (
            <div key={key} >
                <Wallet wallet_id={value} ></Wallet>




            </div>
            
            
           
          );
        })}
      </div>
      <Link href={`/${user_id}/create`}>
      <button className="text-white bg-stone-700 hover:bg-stone-800 focus:ring-4 focus:outline-none focus:ring-stone-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-stone-600 dark:hover:bg-stone-700 dark:focus:ring-stone-800">
        Add to Your Wallet
      </button>
    </Link>
    </>
  );
};

export default Profile;



