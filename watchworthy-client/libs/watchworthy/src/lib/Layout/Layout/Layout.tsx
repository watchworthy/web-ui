import { Layout as AntdLayout } from 'antd';
import { ReactNode, useState } from 'react';
import { Header } from '../Header';
import { Sidebar } from '../Sidebar/Sidebar';
import styles from './Layout.module.less';

interface LayoutProps {
  children: ReactNode;
}

const { Content } = AntdLayout;

export const Layout = ({ children }: LayoutProps) => {
  const [collapsed, setCollapsed] = useState<boolean>();

  const handleCollapseChange = (collapse: boolean) => {
    setCollapsed(collapse);
  };

  return (
    <AntdLayout>
      <Header toggleSidebar={handleCollapseChange} />
      <AntdLayout>
        <Sidebar collapsed={collapsed} />
        <Content className={styles.content}>{children}</Content>
      </AntdLayout>
    </AntdLayout>
  );
};
