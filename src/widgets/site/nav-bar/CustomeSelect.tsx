import { Select } from 'antd';
import useTranslation from 'next-translate/useTranslation';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  selectSearchCategories,
  selectSearchCategoriesStatus,
} from '../../../redux/categories';
const { Option } = Select;

interface propsInterface {
  searchCategoryHandler: (val: number) => void;
}

const CustomeSelect: React.FC<propsInterface> = ({ searchCategoryHandler }) => {
  const { lang } = useTranslation('navbar');
  let allVal = lang === 'ar' ? 'الجميع' : 'all';

  useEffect(() => {
    allVal = lang === 'ar' ? 'الجميع' : 'all';
  }, [lang]);

  const categories = useSelector(selectSearchCategories);
  const categoriesStatus = useSelector(selectSearchCategoriesStatus);

  return (
    <Select
      loading={categoriesStatus === 'loading'}
      className='customeSelect'
      onChange={searchCategoryHandler}
      placeholder={allVal}
      dropdownStyle={{ minWidth: 200 }}
    >
      {categoriesStatus === 'data'
        ? [...categories, { id: 99, name: allVal }].map((el) => (
            <Option key={el.id} value={el.id}>
              {el.name}
            </Option>
          ))
        : null}
    </Select>
  );
};

export default CustomeSelect;

// import { Select } from 'antd';
// import useTranslation from 'next-translate/useTranslation';
// import { useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import {
//   selectSearchCategories,
//   selectSearchCategoriesStatus,
// } from '../../../redux/categories';
// const { Option } = Select;

// interface propsInterface {
//   searchCategoryHandler: (val: number) => void;
// }

// const CustomeSelect: React.FC<propsInterface> = ({ searchCategoryHandler }) => {
//   const { lang } = useTranslation('navbar');
//   let allVal = lang === 'ar' ? 'الجميع' : 'all';

//   useEffect(() => {
//     allVal = lang === 'ar' ? 'الجميع' : 'all';
//   }, [lang]);

//   const categories = useSelector(selectSearchCategories);
//   const categoriesStatus = useSelector(selectSearchCategoriesStatus);

//   return (
//     <Select
//       style={{
//         borderRadius: '0px !important',
//         border: 'none !important',
//         color: '#333 !important',
//         textAlign: 'end',
//         backgroundColor: '#fff !important',
//         borderTopLeftRadius: '25px !important',
//         borderBottomLeftRadius: '25px !important',
//         minWidth: 150,
//         outline: 'none',
//         boxShadow: 'none',
//       }}
//       loading={categoriesStatus === 'loading'}
//       className='customeSelect'
//       onChange={searchCategoryHandler}
//       placeholder={allVal}
//       showArrow={false}
//     >
//       {categoriesStatus === 'data'
//         ? [...categories, { id: 99, name: allVal }].map((el) => (
//           <Option value={el.id}>{el.name}</Option>
//         ))
//         : null}
//     </Select>
//   );
// };

// export default CustomeSelect;
