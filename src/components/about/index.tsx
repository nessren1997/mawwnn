import React, { FC, useEffect } from 'react';
import { Col, Image, Row, Space, Typography } from 'antd';
import useTranslation from 'next-translate/useTranslation';
import { useDispatch, useSelector } from 'react-redux';
import { selectAboutUs, selectAboutUsStatus, FetchAboutUsAsync } from '../../redux/about-us';
import './style.less';
import LoadingData from '../LoadingData';
import { primaryColor } from '../../constants/layout/color';

const { Title } = Typography;

const AboutUs: FC = () => {
  const { t } = useTranslation('common');
  const { lang } = useTranslation();
  const dispatch = useDispatch();
  const status = useSelector(selectAboutUsStatus);
  const about = useSelector(selectAboutUs);

  useEffect(() => {
    dispatch(FetchAboutUsAsync());
  }, [lang]);
  return (
    <LoadingData dataValid={() => (about ? true : false)} loading={status === 'loading'}>
      <div className='about-back' />
      <div className='about-card'>
        <Image preview={false} className='about-img' width='100%' src='/assets/new/about-us.jpg' />
        <div className='about-content'>
          <Title level={2} style={{ fontWeight: 'normal', color: primaryColor }}>
            {t('introduction')}
          </Title>
          <Row
            justify='center'
            style={{
              fontWeight: 500,
              lineHeight: 2.6,
            }}
          >
            <Col span={23}>
              <Space direction='vertical' size={40}>
              <Row style={{maxWidth:"1100px" ,display: 'flex',alignItems: 'center' }} className="tygh-content clearfix">
                <Col className="container-fluid  content-grid">

                        <Row   justify='center'  className="row-fluid ">
                            <Col style={{lineHeight:"1.15" ,marginTop:"30px"}} span={10} className="span8 ut2-top-bottom">
                                <div className="ty-wysiwyg-content" data-ca-live-editor-object-id="0" data-ca-live-editor-object-type="">
                                    <h1 style={{color:"#882bdb" ,fontSize:"28px" ,fontWeight:"bold" ,fontFamily:"sans-serif"}} className="text-justify">
                                        <span ><br/>MawenApp<br/></span>
                                    </h1>
                                    <p>
                                        <span style={{color:"#882bdb"}}>Easy To Shop,, Easy To Get ..</span>
                                    </p>
                                    <p style={{fontSize:"25px" ,fontFamily:"Ariala"}} className="text-justify">
                                        <span>
                                        Mawen platform is a wholesale shop for the business sector for small and hypermarkets to facilitate the supply to your store ..&nbsp;<br/></span>
                                        <span style={{color:"#fa3e4f"}}>We Work Perfectly</span>
                                    </p>
                                </div>
                            </Col>


                            <Col  span={14} className="span8 ut2-top-bottom">
                                <div id="banner_slider_29857" className="banners owl-carousel owl-theme">
                                    <div className="owl-wrapper-outer">
                                        <div className="owl-wrapper">
                                            <div className="owl-item">
                                                <div className="ut2-banner">


                                                    <img style={{maxWidth:"90%" ,height:"auto"}} className="ty-pict lazyOwl cm-image abt-ut2-lazy-loaded" id="det_img_1648284790" src="https://mawenapp.com/images/promo/17/3_f1np-lv.png" data-src="https://mawenapp.com/images/promo/17/3_f1np-lv.png" alt="" title=""/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>

                    <div style={{marginTop:"30px"}} className="container-fluid-row container-fluid-row-full-width ">
                        <div className="row-fluid ">
                            <div className="span16 ut2-top-bottom">
                                <div className="row-fluid ">
                                    <div className="span16  ut2-top-bottom">
                                        <div className="ty-wysiwyg-content" data-ca-live-editor-object-id="0" data-ca-live-editor-object-type="">
                                            <h1 className="text-center">
                                                <span style={{display:"block" ,textAlign:"center" ,fontSize:"28px",color:"#fa3e4f",fontWeight:"bold" ,fontFamily:"sans-serif"}}>Why Mawen?!</span>
                                            </h1>
                                            <hr/>
                                            <p><br/></p>
                                        </div>
                                    </div>
                                </div>


                               


                                <div className="row-fluid ">
                                    <div className="span16  ut2-top-bottom">
                                        <div style={{lineHeight:"1.15",marginBottom:"50px"}} className="ty-wysiwyg-content" data-ca-live-editor-object-id="0" data-ca-live-editor-object-type="">
                                            <h2 style={{color:"rgb(136, 43, 219)",fontWeight:"bold"}}>
                                                <span>Shop by Barcode</span>
                                            </h2>
                                            <p>
                                                <span>Easy to shop easy to get an Access more than 50,000 SKUs from top brands through barcode scan <br/></span><br/></p>
                                        </div>
                                        <div style={{lineHeight:"1.15",marginBottom:"50px"}} className="ty-wysiwyg-content" data-ca-live-editor-object-id="0" data-ca-live-editor-object-type="">
                                            <h2 style={{color:"rgb(136, 43, 219)",fontWeight:"bold"}}>
                                                <span>Logistics Support</span>
                                            </h2>
                                            <p>
                                                <span>On Demand Order, We provide you full of services of logistics and deliver to your store
                                                </span><br/></p>
                                        </div>
                                        <div style={{lineHeight:"1.15",marginBottom:"50px"}} className="ty-wysiwyg-content" data-ca-live-editor-object-id="0" data-ca-live-editor-object-type="">
                                            <h2 style={{color:"rgb(136, 43, 219)",fontWeight:"bold"}}>
                                                <span><br/>Flexible Payment Method</span>
                                            </h2>
                                            <p>
                                                <span>We provide you a several way for paying Cash on delivery: Cash on delivery, MADA,Credit card and Installment
                                                </span><br/></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="container-fluid-row container-fluid-row-full-width hidden-tablet hidden-phone">
                        <div className="row-fluid ">
                            <div className="span16 ut2-top-bottom">
                                <div className="row-fluid ">
                                    <div className="span16  ut2-top-bottom">
                                        <div className="ty-wysiwyg-content" data-ca-live-editor-object-id="0" data-ca-live-editor-object-type="">
                                            <h1 style={{display:"block" ,textAlign:"center" ,fontSize:"28px",color:"#fa3e4f",fontWeight:"bold" ,fontFamily:"sans-serif"}} className="text-center">
                                                <span>
                                                    <strong>Our Advantages<br/></strong>
                                                </span>
                                            </h1>
                                            <hr/></div>
                                    </div>
                                </div>


                                <Row  style={{marginTop:"30px"}} gutter={[32,32]} justify="space-around"  className="row-fluid ">
                                    <Col span={4} className="span2 offset2  ">
                                        <div className="ty-wysiwyg-content" data-ca-live-editor-object-id="0" data-ca-live-editor-object-type="">
                                            <figure style={{display:"flex",flexDirection:"column",alignItems:"center"}} className="text-center"><img src="https://oda.sa/store/images/mawen%20icons/barcode.png?1625408163978"/><br/><br/>Barcode</figure>
                                        </div>
                                    </Col>


                                    <Col style={{display:"flex",flexDirection:"column",alignItems:"center"}} span={4} className="span2  ">
                                        <div className="ty-wysiwyg-content" data-ca-live-editor-object-id="0" data-ca-live-editor-object-type="">
                                            <figure style={{display:"flex",flexDirection:"column",alignItems:"center"}} className="text-center"><img src="https://oda.sa/store/images/mawen%20icons/Manage%20your%20bussines.png?1625408250864"/><br/><br/>&nbsp;Manage your work</figure>
                                        </div>
                                    </Col>


                                    <Col style={{display:"flex",flexDirection:"column",alignItems:"center"}} span={4} className="span2  ">
                                        <div className="ty-wysiwyg-content" data-ca-live-editor-object-id="0" data-ca-live-editor-object-type="">
                                            <p style={{display:"flex",flexDirection:"column",alignItems:"center"}} className="text-center"><img src="https://oda.sa/store/images/mawen%20icons/Delivery.png?1625408204526"/><br/><br/>Delivery</p>
                                        </div>
                                    </Col>


                                    <Col style={{display:"flex",flexDirection:"column",alignItems:"center"}} span={4} className="span2  ">
                                        <div className="ty-wysiwyg-content" data-ca-live-editor-object-id="0" data-ca-live-editor-object-type="">
                                            <p style={{display:"flex",flexDirection:"column",alignItems:"center"}} className="text-center"><img src="https://oda.sa/store/images/mawen%20icons/COD.png?1625408289289"/><br/><br/>COD</p>
                                        </div>
                                    </Col>


                                    <Col style={{display:"flex",flexDirection:"column",alignItems:"center"}} span={4} className="span2  ">
                                        <div  className="ty-wysiwyg-content" data-ca-live-editor-object-id="0" data-ca-live-editor-object-type="">
                                            <figure style={{display:"flex",flexDirection:"column",alignItems:"center"}} className="text-center"><img src="https://oda.sa/store/images/mawen%20icons/E-pay.png?1625408326209"/><br/><br/>E-Pay</figure>
                                        </div>
                                    </Col>


                                    <Col style={{display:"flex",flexDirection:"column",alignItems:"center"}} span={4} className="span2  ">
                                        <div className="ty-wysiwyg-content" data-ca-live-editor-object-id="0" data-ca-live-editor-object-type="">
                                            <figure  style={{display:"flex",flexDirection:"column",alignItems:"center"}} className="text-center"><img src="https://oda.sa/store/images/mawen%20icons/installment.png?1625408354251"/><br/>
                                                <br/>Installment</figure>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </div>
                  </Col>
              </Row>

              </Space>
            </Col>
          </Row>
        </div>
      </div>
    </LoadingData>
  );
};
export default AboutUs;
