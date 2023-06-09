import Image from 'next/image';
import styles from './Auth.module.less';

export const AuthLayout = ({ children }: any) => {
  return (
    <div className={styles.layout}>
      <div className={styles.image}>
        <Image src="/movies.jpg" alt="Image" width={1000} height={1000} />
      </div>
      <div className={styles.form}>{children}</div>
    </div>
  );
};
