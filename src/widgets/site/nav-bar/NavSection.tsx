import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import { useRouter } from 'next/router';

const linkStyle: React.CSSProperties = {
  color: '#fff',
  display: 'inline-block',
  textAlign: 'left',
  paddingLeft: 5,
  textTransform: 'capitalize',
  textUnderlineOffset: 10,
};

const NavSection: React.FC = () => {
  const { t } = useTranslation('navbar');
  const { pathname } = useRouter();

  return (
    <nav
      style={{
        display: 'flex',
        justifyContent: 'space-evenly',
        width: '96%',
        fontSize: '1.2em',
      }}
    >
      <Link href='/'>
        <a style={{ ...linkStyle, textDecoration: pathname === '/' ? 'underline' : 'none' }}>{t`links.home`}</a>
      </Link>

      <Link href='/about'>
        <a style={{ ...linkStyle, textDecoration: pathname === '/about' ? 'underline' : 'none' }}>{t`links.about-us`}</a>
      </Link>

      <Link href='/products'>
        <a style={{ ...linkStyle, textDecoration: pathname === '/products' ? 'underline' : 'none' }}>{t`links.our-products`}</a>
      </Link>

      <Link href='/contact'>
        <a style={{ ...linkStyle, textDecoration: pathname === '/contact' ? 'underline' : 'none' }}>{t`links.contact-us`}</a>
      </Link>

      <Link href='/jobs'>
        <a style={{ ...linkStyle, textDecoration: pathname === '/jobs' ? 'underline' : 'none' }}>{t`links.jobs`}</a>
      </Link>

      <Link href='/check-order'>
        <a style={{ ...linkStyle, textDecoration: pathname === '/check-order' ? 'underline' : 'none' }}>{t`links.check-order`}</a>
      </Link>
    </nav>
  );
};

export default NavSection;
