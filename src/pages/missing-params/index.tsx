// import { Typography, Col, Form, Input, Row, notification, Select } from "antd";
// import React, { useEffect, useState } from "react";
// import { styledInputNotBorderd } from "../../constants/layout/responsive";
// import useTranslation from "next-translate/useTranslation";
// import { useDispatch, useSelector } from "react-redux";
// import { selectUser, selectUpdateInfoStatus, selectCities, getUserInfoAsync, updateUserInfo } from "../../redux/app";
// import { PoweroffOutlined } from "@ant-design/icons";
// import updateUserInfoReq from "../../models/update-user-info/update-req";
// import "../../components/Register/style.less";

// import PButton from "../../components/PButton/Buttom";
// import { FetchCitiesAsync } from "../../redux";

// const { Text } = Typography;
// const MessingParams: React.FC = () => {
//   const { t } = useTranslation("messingparams");
//   const dispatch = useDispatch();
//   const user = useSelector(selectUser);
//   const [form] = Form.useForm();
//   const statusUpdate = useSelector(selectUpdateInfoStatus);

//   const { status: cities_status, cities } = useSelector(selectCities);

//   const labelStyled = (text: string) => {
//     return <Text style={{ color: "#3f428f", fontWeight: "bold" }}>{text}</Text>;
//   };

//   useEffect(() => {
//     if (user) {
//       form.setFieldsValue(user);
//     }
//   }, [form, user]);

//   useEffect(() => {
//     dispatch(getUserInfoAsync());
//     dispatch(FetchCitiesAsync());
//   }, []);

//   const { Option } = Select;
//   const onFinish = (values: any) => {
//     let res: updateUserInfoReq = {
//       email: values.email,
//       first_name: values.first_name,
//       last_name: values.last_name,
//       phone: values.phone,
//       password: values.password,
//       city_id: values.city_id,
//     };

//     // dispatch(updateUserInfo(res));

//     console.log("user", user);
//   };

//   return (
//     <>
//       <div style={{ width: "50%", margin: "auto", marginTop: 50 }}>
//         <Form labelAlign="right" layout="vertical" onFinish={onFinish} form={form}>
//           <Row>
//             <Text style={{ color: "#3f428f", fontWeight: "bold", margin: "auto" }}>الرجاء ادخال حقل الهاتف والمدينة</Text>
//           </Row>
//           <Row justify="space-around" gutter={{ lg: 18, xl: 25 }} style={{ padding: "26px 35px 21px 59px" }}>
//             <Col span={24}>
//               <Form.Item name="phone" label={labelStyled(t("phone"))}>
//                 <Input {...styledInputNotBorderd} />
//               </Form.Item>
//             </Col>
//             <Col span={24}>
//               <div className="city_select">
//                 <Form.Item name="city_id" label={labelStyled(t("city"))}>
//                   <Select direction="ltr" placeholder={t`city`}>
//                     {cities.map(
//                       (city) =>
//                         city.id === 1 && (
//                           <Option key={city.id} value={city.id}>
//                             <span dir="ltr">{city.name}</span>
//                           </Option>
//                         )
//                     )}
//                   </Select>
//                 </Form.Item>
//               </div>
//             </Col>
//           </Row>
//           <Row style={{ justifyContent: "flex-end", padding: "0 30px" }} gutter={{ lg: 8, xl: 16 }}>
//             <Col>
//               <Form.Item>
//                 <PButton
//                   loading={statusUpdate === "loading"}
//                   icon={statusUpdate === "loading" ? <PoweroffOutlined /> : ""}
//                   htmlType="submit"
//                 >
//                   {t("edit")}
//                 </PButton>
//               </Form.Item>
//             </Col>
//           </Row>
//         </Form>
//       </div>
//     </>
//   );
// };

// export default MessingParams;

import React from "react";

export default function index() {
  return <div></div>;
}
