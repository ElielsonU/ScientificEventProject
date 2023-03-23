import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router';
import Div from '../components/cells/Div';

export default function App({ Component, pageProps }: AppProps) {

  const {asPath} = useRouter();
  const Page = asPath.replace("/", "-");
  console.log(Page)

  return (
    <Div Id={Page} alignItems="center">
      <Component {...pageProps} />
    </Div>
  )
}