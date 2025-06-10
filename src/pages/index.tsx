import { Layout } from "@components";
import { useState } from "react";

export default function Home(prop: any) {

  const [removeLastPlay, setRemoveLastPlay] = useState(false);

  return (
    <>
      <Layout />
      {/* <Board isGameOver={false} isNewGame = {false} playerMoves={[]} removeLastMoveFlag={removeLastPlay} setRemoveLastMoveFlag={setRemoveLastPlay}/>

      <Button onClick={() => {
        setRemoveLastPlay(true)
      }}>Remove last play</Button> */}
    </>
  )
}