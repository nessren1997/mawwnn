import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import App from './app';
import Jobs from './job';
import Cart from './cart';
import Blogs from './blog';
import Events from './event';
import Brands from './brand';
import Sliders from './slider';
import Abouts from './about-us';
import Products from './product';
import Categories from './category';
import Applicants from './applicant';
import Branchs from './branch';
import Coupons from './coupon';
import Coupon from './coupons';
import OrdersForm from './order-form';
import SearchCategories from './categories';
import Orders from './orders';
import Verify from './verfiy';
import Reset from './resete-password';
import RequestedProducts from './search-products';
import IsMobile from './detect-mobile';
import Emails from './email';
import Tags from './tag';
import Gifts from './gift';
import GiftItems from './gift-item';
import Cities from './cities';
import Users from './user';
import Roles from './roles';
import NewsLetters from './news-letters';
import OrderStatus from './order-status';
import Winners from './winner';
import Statistics from './statistics';
import Addresses from './address';
import ReceivingCenter from './receiving-centers';
import CitiesAllowed from './city-allowed';

export const store = configureStore({
  reducer: {
    App,
    Events,
    Products,
    Blogs,
    Categories,
    Brands,
    Cart,
    Sliders,
    Jobs,
    Applicants,
    Branchs,
    Coupons,
    Coupon,
    Cities,
    OrdersForm,
    SearchCategories,
    Abouts,
    Orders,
    Verify,
    Reset,
    RequestedProducts,
    IsMobile,
    Emails,
    Tags,
    Gifts,
    GiftItems,
    Users,
    Roles,
    NewsLetters,
    OrderStatus,
    Winners,
    Statistics,
    Addresses,
    ReceivingCenter,
    CitiesAllowed
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
