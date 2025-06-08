import { Button } from "@/shared/components/atoms";
import { Board } from "@/shared/components/organisms";
import { useState } from "react";

export default function Home(prop: any) {

  const [removeLastPlay, setRemoveLastPlay] = useState(false);
  
  return (
    <>
      <Board isGameOver={false} isNewGame = {false} playerMoves={[]} removeLastMoveFlag={removeLastPlay} setRemoveLastMoveFlag={setRemoveLastPlay}/>

      <Button onClick={() => {
        setRemoveLastPlay(true)
      }}>Remove last play</Button>
    </>
  )
}