import { SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { ReactNode, useState } from 'react';
import styles from './Search.module.less';

interface Props {
  children?: ReactNode;
  onChange?: (e: any) => void;
  placeholder?: string;
}

export const Search = ({ children, onChange, placeholder }: Props) => {
  const [searchTerm, setSearchTerm] = useState('');
  return (
    <div style={{ width: '400px' }}>
      <div>
        <Input
          className={styles.searchInput}
          placeholder={placeholder}
          type="search"
          prefix={<SearchOutlined style={{ color: '#fff' }} />}
          onChange={onChange}
          // style={{ backgroundColor: '#333333', color: '#fff' }}
        />
      </div>
      {children}
    </div>
  );
};
