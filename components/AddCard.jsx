"use client";

import React from "react";

import "/src/app/globals.css";
import "./generalCSS.css";
import Link from "next/link";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import useUser from "../hooks/useUser";
import {
  addNewWallet,
  getCurrentUser,
  getCurrentID,
  addNewPayment,
} from "../utils/dataQuery";

const AddCard = ({ userId }) => {
  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [CSV, setCSV] = useState(0);
  const [localUsername, setLocalUsername] = useState("");
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [submissionMessage, setSubmissionMessage] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
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

    const addedWallet = await addNewPayment(
      user.id, //user_id
      cardNumber,
      name,
      CSV
    );

    console.log(addedWallet);
    router.push(`/user/${localID}`);

    setSubmissionStatus("success");
    setSubmissionMessage("Card submitted successfully!");
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

  const handleCurrencyChange = (e) => {
    setSelectedCurrency(e.target.value);
  };

  return (
    <div>
      <div className="flex justify-start">
        <Link href={`/user/${userId}`}>
          <button className=" m-2 text-white bg-stone-400 hover:bg-red-800  focus:ring-4 focus:outline-none focus:ring-stone-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-stone-600 dark:hover:bg-stone-700 dark:focus:ring-stone-800">
            Profile
          </button>
        </Link>
      </div>
      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          Add New Credit Card
        </h2>
        <form onSubmit={addList} href="/User">
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div className="sm:col-span-2">
              <label
                htmlFor="large-input"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Cardholder Name*
              </label>
              <input
                type="text"
                id="large-input"
                className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Type Cardholder Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required=""
              />
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="large-input"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Card Number*
              </label>
              <input
                type="text"
                id="large-input"
                className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Type Wallet Name"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                required=""
              />
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="large-input"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Carrier
              </label>
              <select
                className="block p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={selectedCurrency}
                onChange={handleCurrencyChange}
              >
                <option value="USD">Visa</option>
                <option value="EUR">American Express</option>
                <option value="GBP">Discover</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="large-input"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                CSV*
              </label>
              <input
                type="number"
                id="large-input"
                className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Type Wallet Name"
                value={CSV}
                onChange={(e) => setCSV(e.target.value)}
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
              Add Card
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

export default AddCard;
