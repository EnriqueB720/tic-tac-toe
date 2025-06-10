import { Layout } from "@components";
import { useState } from "react";

export default function Home(prop: any) {

  const [removeLastPlay, setRemoveLastPlay] = useState(false);

  return (
    <>
      <Layout />
    </>
  )
}