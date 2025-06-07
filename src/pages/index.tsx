import { Board } from "@/shared/components/organisms";

export default function Home(prop: any) {

  
  return (
    <>
      <Board isGameOver={false} isNewGame = {false} actualPlayer={"O"} playerMoves={[]}/>
    </>
  )
}