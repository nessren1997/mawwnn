import { useEffect, useState } from 'react';
import { SmallNav, LargeNav } from './Views';
import { FetchSearchCategoriesAsync } from '../../../redux/categories';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsMobile } from '../../../redux';
import { FetchProductsByNameAsync, selectRequestedProducts } from '../../../redux/search-products';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { useWidth } from '../../../utils/helpers/use-is-mobile';

const NavBar: React.FC = () => {
  const { lang } = useTranslation();
  const { pathname, push } = useRouter();

  // search bar logic
  const productsList = useSelector(selectRequestedProducts);

  const [searchString, setSearchString] = useState('');
  const [searchCategory, setSearchCategory] = useState(99);

  const handleSearchCategoryChange = (val: number) => setSearchCategory(val);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearchString(e.target.value);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pathname !== '/') {
      push('/');
    }
    if (searchString.trim().length > 0) {
      if (searchCategory === 99) {
        dispatch(FetchProductsByNameAsync([searchString]));
      } else {
        dispatch(FetchProductsByNameAsync([searchString, searchCategory + '']));
      }
    }
  };

  useEffect(() => {
    if (productsList.length === 0) {
      setSearchString('');
    }
  }, [productsList]);

  //-----------------------------------
  // Fetch Categories Logic
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(FetchSearchCategoriesAsync());
  }, [lang]);

  //-----------------------------------
  // set viewport logic
  const { outerWidth } = useWidth();

  if (outerWidth <= 992)
    return (
      <SmallNav
        searchString={searchString}
        searchCategoryHandler={handleSearchCategoryChange}
        handleSearchChange={handleSearchChange}
        handleSearchSubmit={handleSearchSubmit}
      />
    );
  return (
    <LargeNav
      searchString={searchString}
      searchCategoryHandler={handleSearchCategoryChange}
      handleSearchChange={handleSearchChange}
      handleSearchSubmit={handleSearchSubmit}
    />
  );
};
export default NavBar;
