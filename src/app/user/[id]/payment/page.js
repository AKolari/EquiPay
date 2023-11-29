"use client";

import { useParams } from "next/navigation";
import CreateWallet from "../../../../../components/CreateWallet";
import AddCard from "../../../../../components/AddCard";

const Page = () => {
  const params = useParams();
  return <AddCard userId={params.id} />;
};
export default Page;
