import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { GlobalStyle, muiTheme } from '../theme';
import { ThemeProvider } from '@mui/material/styles';
import Error from 'next/error';

function MyApp({ Component, pageProps }: AppProps) {
  if (pageProps.error) {
    return <Error statusCode={pageProps.error.statusCode} title={pageProps.error.message} />;
  }
  return (
    <ThemeProvider theme={muiTheme}>
      <GlobalStyle />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
