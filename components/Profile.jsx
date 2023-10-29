"use client";

import React from "react";

import Link from "next/link";
import "/src/app/globals.css";
import { useState, useEffect } from "react";


import { useReducer } from "react";
import { useRouter } from "next/navigation";
import Wallet from "./Wallet.jsx";

import {
  getCurrentUser,
  logoutUser,
  getWallets,
  ifOwnList,
  getCurrentID,
} from "../utils/dataQuery.js";

//Is now specific by user_id.
const Profile = ({ user_id }) => {
  const [localUsername, setLocalUsername] = useState("");
  const [localLists, setLocalLists] = useState({});
  const router = useRouter();

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const { data: lists } = await getWallets(user_id);
        console.log(lists);

        var allLists = {};

        //Adds list_ids as keys in a dictionary with their respective titles
     

        for(let i=0; i<lists.length; i++){
            allLists[i]=lists[i].id;
        }

        //Update localLists
        setLocalLists(allLists);
      } catch (error) {
        // Handle the error
        console.log("Error fetching lists:", error);
      }
    };
    fetchLists();
  }, [user_id]);

  //Reroutes user to editing page, if its their list. key = list_id
  const checkListOwner = (key) => {
    if (ifOwnList(key, user_id)) {
      return `/user/${user_id}/list/${key}/edit`; // Redirect to the list edit page
    } else {
      return `/user/${user_id}/list/${key}`;
    }
  };

  const redirectToViewer = (key) => {
    return `/user/${user_id}/list/${key}`;
  };

  // Redirects to the list edit page
  const redirectToEdit = (key) => {
    return `/user/${user_id}/list/${key}/edit`;
  };


  return (
    <>
    
      {/* <h3 className="text-start text-5xl p-10">Hello {localUsername}!</h3> */}
      <h3 className="text-center text-5xl font-bold p-10">Current Lists</h3>
      {/* <p>{localLists}</p> */}

     <div className="grid flex justify-center">
        {Object.entries(localLists).map(([key, value]) => {
            console.log(value)
          return (
            <div key={key} >
                <Wallet wallet_id={value} ></Wallet>


            </div>
            
            
           
          );
        })}
      </div>
     
    </>
  );
};

export default Profile;



/*
ORIGINAL CONTENT RETURNED BY MAP

 <div className="container text-center justify-items-center py-3" key={key}>
              <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <Link href={redirectToViewer(key)}>
                  <div className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {value}
                  </div>
                </Link>
                <div className="padd2">
                  <Link href={redirectToEdit(key)}>
                    <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                      Edit
                    </button>
                  </Link>
                </div>
              </div>
            </div>

*/