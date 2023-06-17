import '@fontsource/lato';
import { Inter } from '@next/font/google';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthLayout, Layout } from '@watchworthy/ui';
import { ConfigProvider } from 'antd';
import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useState } from 'react';
import '../styles/Movie.scss';
import '../styles/globals.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '700'],
});

const App = ({ Component, pageProps }: AppProps) => {
  const [queryClient] = useState(() => new QueryClient());
  const router = useRouter();

  const LayoutComponent =
    router.pathname === '/register' || router.pathname === '/login'  || router.pathname === '/forgot-password'  || router.pathname === '/reset-password'
      ? AuthLayout
      : Layout;

  return (
    <main className={inter.className}>
      <ConfigProvider
        theme={{
          token: {
            fontFamily: 'Lato',
          },
        }}
      >
        <QueryClientProvider client={queryClient}>
          <LayoutComponent>
            <Component {...pageProps} />
          </LayoutComponent>
        </QueryClientProvider>
      </ConfigProvider>
    </main>
  );
};

export default appWithTranslation(App);
