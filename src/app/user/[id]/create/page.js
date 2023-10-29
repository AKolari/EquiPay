"use client"

import { useParams } from "next/navigation";
import CreateWallet from "../../../../../components/CreateWallet";

const Page=()=>{
    const params = useParams();
    return<CreateWallet userId={params.id} />

}
export default Page;