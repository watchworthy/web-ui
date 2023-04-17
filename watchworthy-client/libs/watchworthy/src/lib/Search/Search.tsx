import { SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { ReactNode, useState } from 'react';
import styles from './Search.module.less';

interface Props {
  children?: ReactNode;
}

export const Search = ({ children }: Props) => {
  const [searchTerm, setSearchTerm] = useState('');
  return (
    <div style={{ width: '400px' }}>
      <div>
        <Input
          className={styles.searchInput}
          placeholder="Search for Movies, TV Shows, Actors"
          type="search"
          prefix={<SearchOutlined style={{ color: '#fff' }} />}
          onChange={(event) => setSearchTerm(event.target.value)}
          // style={{ backgroundColor: '#333333', color: '#fff' }}
        />
      </div>
      {children}
    </div>
  );
};
