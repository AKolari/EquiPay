"use client"

import React, { useState, useEffect } from "react";
import "src/app/globals.css";
import { addNewWallet, getCurrentUser, getCurrentID } from "../utils/dataQuery";
import useUser from "../hooks/useUser";
import { useRouter } from "next/navigation";


const CreateWallet = ({userId}) => {
  const [walletName, setWalletName] = useState("");
  const [walletDescription, setWalletDescription]=useState("");
  const [walletBalance, setWalletBalance]=useState(0);
  const [localUsername, setLocalUsername] = useState("");
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [submissionMessage, setSubmissionMessage] = useState("");
  const router = useRouter();

  const handleAddItem = () => {
    setListItems([...listItems, ""]);
  };

  const { user } = useUser();

  const handleRemoveItem = (index) => {
    const updatedListItems = [...listItems];
    updatedListItems.splice(index, 1);
    setListItems(updatedListItems);
  };

  const [localID, setLocalID] = useState("");

  //Gets the user id to put into url link before anything else
  const idFetcher = async () => {
    const hold = await getCurrentID();
    if (hold) {
      setLocalID(hold);
    }
  };

  useEffect(() => {
    idFetcher();
  }, []);

  const addList = async (e) => {
    e.preventDefault();
    //const listId = uuidv4();
  
      const addedWallet = await addNewWallet(
        user.id, //user_id
        walletBalance,
        walletName,
        walletDescription
      );
    
        console.log(addedWallet);
    router.push(`/user/${localID}`);

    setSubmissionStatus("success");
    setSubmissionMessage("Wallet submitted successfully!");
  };

  useEffect(() => {
    const fetchCurrentUsername = async () => {
      const { data, error } = await getCurrentUser();

      if (data) {
        setLocalUsername(data.ListoMeta?.username || "");
      } else {
        console.log("Error fetching current user:", error);
      }
    };

    fetchCurrentUsername();
  }, []);

  const handleClick = () => {
    router.push({
      pathname: "/user",
      query: { listItems: JSON.stringify(listItems) },
    });
  };

  return (
    <div>
    
      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          Create a New Wallet
        </h2>
        <form onSubmit={addList} href="/User">
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div className="sm:col-span-2">
              <label
                htmlFor="large-input"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Wallet Name*
              </label>
              <input
                type="text"
                id="large-input"
                className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Type Wallet Name"
                value={walletName}
                onChange={(e) => setWalletName(e.target.value)}
                required=""
              />
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="large-input"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Wallet Description*
              </label>
              <input
                type="text"
                id="large-input"
                className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Type Wallet Name"
                value={walletDescription}
                onChange={(e) => setWalletDescription(e.target.value)}
                required=""
              />
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="large-input"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Wallet Balance*
              </label>
              <input
                type="number"
                id="large-input"
                className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Type Wallet Name"
                value={walletBalance}
                onChange={(e) => setWalletBalance(e.target.value)}
                required=""
              />
            </div>
           
          </div>
          <div className="padd2">
            <button
              type="submit"
              className="text-white bg-stone-700 hover:bg-stone-800 focus:ring-4 focus:outline-none focus:ring-stone-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-stone-600 dark:hover:bg-stone-700 dark:focus:ring-stone-800"
              href="/User"
            >
              Create Wallet
            </button>
            {submissionStatus === "success" && (
              <p className="text-green-500">{submissionMessage}</p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateWallet;