import React, { useCallback, useEffect } from 'react';
import Head from 'next/head';
import { ConfigProvider } from 'antd';
import { Provider } from 'react-redux';
import type { AppProps } from 'next/app';
import arEG from 'antd/lib/locale/ar_EG';
import enUS from 'antd/lib/locale/en_US';
import useTranslation from 'next-translate/useTranslation';
import { AnimatePresence } from 'framer-motion';

import eventManager, { EVENT_UNAUTHORIZED } from '../utils/event-manager';
import { appServices } from '../services';
import { store } from '../redux/store';
import Layout from '../widgets';
import { load } from 'recaptcha-v3';

import '../shared/antd.less';
import '../shared/style.global.less';
import { useRouter } from 'next/router';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const { lang } = useTranslation();

  const { replace } = useRouter();

  const handExitComplete = () =>
    useCallback(() => {
      if (typeof window !== 'undefined') {
        // Get the hash from the url
        const hashId = window.location.hash;

        if (hashId) {
          // Use the hash to find the first element with that id
          const element = document.querySelector(hashId);

          if (element)
            // Smooth scroll to that elment
            element.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
              inline: 'nearest',
            });
        }
      }
    }, []);

  useEffect(() => {
    if (window) {
      window.scrollTo(0, 0);
    }
    appServices.changeLang({ lang: lang === 'en' ? 'en' : 'ar' }).then(() => {
      // replace(route, route, { locale: lang })
    });

    eventManager.on(EVENT_UNAUTHORIZED, () => {
      appServices.logout();
      replace('/error/auth');
    });
  }, []);

  const recaptchaAsync = async () => {
    const recaptcha = await load('6LfKsIkaAAAAAIR2X5xRnM0HciWzGbxWYEzRCzaG', {
      autoHideBadge: true,
    });
    const token = await recaptcha.execute('<action>');
  };

  useEffect(() => {
    recaptchaAsync();
  }, []);

  return (
    <>
      <Head>
        <link rel='shortcut icon' href='/assets/dtic.ico' />
      </Head>

      <ConfigProvider direction={lang === 'en' ? 'ltr' : 'rtl'} locale={lang === 'en' ? enUS : arEG}>
        <Provider store={store}>
          <Layout>
            <AnimatePresence exitBeforeEnter onExitComplete={handExitComplete}>
              <Component {...pageProps} />
            </AnimatePresence>
          </Layout>
        </Provider>
      </ConfigProvider>
    </>
  );
};

export default MyApp;
