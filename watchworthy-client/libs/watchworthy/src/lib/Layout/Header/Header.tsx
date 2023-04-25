import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Col, Layout, Row } from 'antd';
import Link from 'next/link';
import React, { useState } from 'react';
import { Search } from '../../Search/Search';
import styles from './Header.module.less';

const { Header: HeaderLayout } = Layout;

interface LayoutProps {
  toggleSidebar: (collapse: boolean) => void;
}

export const Header = ({ toggleSidebar }: LayoutProps) => {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <Layout>
      <HeaderLayout className={styles.header} role="banner">
        <Row role="banner" className={styles.headerContent}>
          <Col>
            <div className={styles.fisrtWrapper}>
              <div className={styles.menu}>
                {React.createElement(
                  collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                  {
                    onClick: () => {
                      if (toggleSidebar) {
                        toggleSidebar(!collapsed);
                      }
                      setCollapsed(!collapsed);
                    },
                  }
                )}
              </div>
              <Link href="/" className={styles.logo}>
                WatchWorthy
              </Link>
            </div>
          </Col>
          <Col>
            <div className={styles.search}>
              <Search />
            </div>
          </Col>
          <Col>
            <div className={styles.thirdWrapper}>
              <Link href="#">EN</Link>
              <Link href="/watchlist">Watch List</Link>
              <Link href="/signup">Sign Up</Link>
            </div>
          </Col>
        </Row>
      </HeaderLayout>
    </Layout>
  );
};
