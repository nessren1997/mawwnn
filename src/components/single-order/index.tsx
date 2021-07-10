import { Typography, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FetchUserOrdersAsync, selectSiteOrders } from '../../redux/orders/index';
import { Order_proccess_number_Res } from '../../models/order';
const { Text } = Typography;

// const textRender = (text: string) => {
//   return <Text style={{ color: '#000', fontWeight: 'bold' }}>{text}</Text>;
// };

interface props {
  SingleOrder: Order_proccess_number_Res[];
}

const Index: React.FC<props> = ({ SingleOrder }) => {
  // const [isModalVisible, setIsModalVisible] = useState(false);

  // const showModal = () => {
  //   setIsModalVisible(true);
  // };

  // const handleOk = () => {
  //   setIsModalVisible(false);
  // };

  // const handleCancel = () => {
  //   setIsModalVisible(false);
  // };
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(FetchUserOrdersAsync());
  }, []);

  const orders = useSelector(selectSiteOrders);

  // const { t } = useTranslation('personal-collection');

  const columns: ColumnsType<any> = [
    {
      title: 'id',
      dataIndex: 'product_id',
      width: 60,
      render: (text) => <Text style={{ color: 'rgb(18 51 169)' }}>{text}</Text>,
    },
    {
      title: 'qty',
      dataIndex: 'qty',
      width: 90,
      render: (text) => <Text style={{ color: 'rgb(18 51 169)' }}>{text}</Text>,
    },

    // {
    //   title: textRender(t('total')),
    //   dataIndex: 'total',
    //   align: 'center',

    //   width: 110,
    //   render: (total) => {
    //     return (
    //       <>
    //         <Button type='primary' onClick={showModal}>
    //           Open Modal
    //         </Button>
    //         <Modal title='Basic Modal' visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={false}>
    //           <p>{total}</p>
    //         </Modal>
    //       </>
    //     );
    //   },
    // },
  ];
  console.log(orders);

  const data = [{ SingleOrder }];

  return (
    <div className='order'>
      <Table columns={columns} dataSource={data} bordered pagination={false} scroll={{ x: true }} />
    </div>
  );
};

export default Index;
