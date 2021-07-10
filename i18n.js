module.exports = {
  locales: ['en', 'ar'],
  defaultLocale: 'ar',
  pages: {
    '*': ['common', 'footer', 'errors', 'navbar', 'not-found', 'dashboard'],
    '/': ['home'],
    '/application': ['application'],
    '/jobs/apply/[id]': ['jobs'],
    '/personal-collection': ['personal-collection', 'cart'],
    '/contact-us': ['contact-us'],
    '/login': ['login'],
    '/products/[id]': ['single-product'],
    '/products': ['single-product'],
    '/cart': ['cart'],
    '/order-collection': ['order-collection', 'personal-collection'],
    '/check-order': ['check-order'],
    '/reset-password': ['reset-password'],
    '/verfiy-email': ['verfiy-email'],
    '/terms-conditions': ['terms-conditions'],
    '/privacy-policy': ['privacy-policy'],
    '/deleteIF': ['deleteIF'],
    '/contact': ['login']
  },
  interpolation: {
    prefix: '${',
    suffix: '}',
  },
  loadLocaleFrom: (locale, namespace) => import(`./src/translations/${namespace}/${locale}`).then((m) => m.default),
};
