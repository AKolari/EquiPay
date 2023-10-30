"use client"
import React from "react";
import { getWalletById } from "../utils/dataQuery";
import { useState, useEffect } from "react";

const Wallet =  ({wallet_id})=>{

const [walletData, setWalletData]= useState({});
const [walletStatus, setWalletStatus]= useState("Loading")
const [walletError, setWalletError]=useState(null)






const getWallet = async()=>{
    const Data = await getWalletById(wallet_id);

    setWalletData(Data.data);
    setWalletStatus(Data.status);
    setWalletError(Data.error);
    console.log(Data.status)

}

useEffect(()=>{
   getWallet();
    
    
    




}, [])


    return(
        <>
        { (walletStatus=="Loading")? <p>Loading</p>: 
        !!walletError? <p>{walletError}</p>: <div>
            <p className=" text-blue " > <span className="font-bold">Name: </span>{walletData.name}</p>
            <p className=" text-blue " > <span className="font-bold">Description: </span>{walletData.description}</p>
            <p className=" text-blue " > <span className="font-bold">Currency: </span>{walletData.currency}</p>
            <p className=" text-blue " > <span className="font-bold">Balance: </span>{walletData.balance}</p>
            

            

        </div>
        
        
        
        
        
        }
        </>
    )
}
export default Wallet;