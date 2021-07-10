import styles from "./styles.module.css";

interface PropsInterface {
  src: string;
  description: string;
}

const RelatedProductCard: React.FC<PropsInterface> = ({ src, description }) => {
  return (
    <div className={styles.card}>
      <div>
        <img src={src} className={styles.image} />
        <p>{description}</p>
      </div>
      <button className={styles.button}>اضافة الى السلة</button>
    </div>
  );
};

export default RelatedProductCard;
