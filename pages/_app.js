import { ChakraProvider } from '@chakra-ui/react';
import Home from './index.js';

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />;
    </ChakraProvider>
  );
}

export default MyApp;
