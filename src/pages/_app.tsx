import { GameProvider } from "@/shared/context"
import { ChakraProvider, defaultSystem } from "@chakra-ui/react"
import { AppProps } from "next/app"

export default function App({ Component, pageProps }: AppProps) {


  return (
    <ChakraProvider value={defaultSystem}>
       <GameProvider>
          <Component {...pageProps} />
       </GameProvider>
    </ChakraProvider>
  )
}