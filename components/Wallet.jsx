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
            <p className=" text-blue " > Name:{walletData.name}</p>
            <p className=" text-blue " > Description:{walletData.description}</p>
            <p className=" text-blue " > Currency:{walletData.currency}</p>
            <p className=" text-blue " > Balance:{walletData.balance}</p>
            

            

        </div>
        
        
        
        
        
        }
        </>
    )
}
export default Wallet;