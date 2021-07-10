// -------------Antd & Styles Imports-------------
import { Row, Col, Typography } from "antd";
import useTranslation from "next-translate/useTranslation";
import { responsive_constant } from "../../constants/layout/responsive";
// -------------Components Imports-------------
import DiscountForm from "../../widgets/site/pill-input";
import DetailsAndConfirmationForm from "../../widgets/site/cart_total_details";
// -------------Helpers & Logic-------------
import thousands_separators from "../../utils/helpers/thousands_separators";
import { selectCouponStatus } from "../../redux/coupon";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux";
// -------------Components' Interface-------------
interface propsInterface {
  canProcced: boolean;
  fullPrice: number;
  coupon: string;
  handleCouponChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCouponSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  nextStep: () => void;
}

const FirstStepFooter: React.FC<propsInterface> = ({
  fullPrice,
  coupon,
  handleCouponChange,
  handleCouponSubmit,
  nextStep,
  canProcced,
}) => {
  const { t } = useTranslation("cart");
  const { Text } = Typography;

  const isCouponLoading = useSelector(selectCouponStatus);

  const user = useSelector(selectUser);

  return (
    <>
      <Row justify="center">
        <Col {...responsive_constant}>
          <Row justify="center" gutter={[80, 10]}>
            {user && (
              <Col
                flex="1 1 400px"
                style={{
                  boxShadow: "#c7c7c7 3px 4px 15px",
                  paddingTop: "30px",
                  paddingBottom: "30px",
                  paddingLeft: "30px",
                  paddingRight: "30px",
                  margin: "15px 0px",
                  borderRadius: 40,
                }}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: "2.2rem",
                    margin: "0 0 20px 0",
                    textAlign: "start",
                  }}
                >
                  {t`voucher-card`}
                  <br />
                  <span style={{ fontSize: "1rem" }}>{t`enter-voucher-card`}</span>
                </Text>
                <DiscountForm
                  name="discount_code"
                  placeholder={t`voucher_code`}
                  button_text={t`verify`}
                  handleChange={handleCouponChange}
                  handleSubmit={handleCouponSubmit}
                  val={coupon}
                  isLoading={isCouponLoading === "loading"}
                />
              </Col>
            )}

            <Col flex="1 1 400px">
              <DetailsAndConfirmationForm total={fullPrice} nextStep={nextStep} procced={canProcced} />
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default FirstStepFooter;
