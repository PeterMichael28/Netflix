import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { StoreContextProvider } from '../Context/Store';



function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StoreContextProvider>
      <Component {...pageProps} />
    </StoreContextProvider>

  )

}

export default MyApp
