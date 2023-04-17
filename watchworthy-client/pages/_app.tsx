import '@fontsource/lato';
import { Inter } from '@next/font/google';
import { Layout } from '@watchworthy/ui';
import { ConfigProvider } from 'antd';
import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import '../styles/globals.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '700'],
});

// TODO: If we have the graphQL configuration we need to have that component as the Parent Component of all below
// TODO: Create a translation wrapper as a Parent of the LoggedInBarrier and Compoenent
// TODO: Create a LoggedIn Barrier as a Parent Component to the Child Component

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <main className={inter.className}>
      <ConfigProvider
        theme={{
          token: {
            fontFamily: 'Lato',
          },
        }}
      >
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ConfigProvider>
    </main>
  );
};

export default appWithTranslation(App);
