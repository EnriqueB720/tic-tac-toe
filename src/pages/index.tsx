import { BoardItem } from "@/shared/components/molecules";

export default function Home(prop: any) {

  
  return (
    <>
      <BoardItem WhoIsPlaying="O"/>
      <BoardItem WhoIsPlaying="X"/>
      <BoardItem WhoIsPlaying="X"/>
    </>
  )
}