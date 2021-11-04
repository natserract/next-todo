import Layout from '../containers/layout'
import '../styles/globals.scss'
import { ThemeProvider } from '@material-ui/core/styles';
import Head from 'next/head'
import theme from '../config/theme'

function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      {/* Issues: https://nextjs.org/docs/messages/no-document-title */}
      <Head children={<title>To Do List App</title>} />
      <Layout children={<Component {...pageProps} />} />
    </ThemeProvider>
  )
}

export default App;