import Document, { Html, Head, Main, NextScript } from 'next/document';

class CustomeDoc extends Document {
  render() {
    return (
      <Html lang='ar'>
        <Head>
          <link
            rel='preload'
            href='/fonts/cocon.woff'
            as='font'
            type='font/woff'
            crossOrigin='anonymous'
          />
        </Head>
        <body style={{ overflowX: 'hidden' }}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default CustomeDoc;
