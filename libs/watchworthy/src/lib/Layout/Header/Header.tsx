import {
  DownOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useUser } from '@watchworthy/ui';
import { Avatar, Col, Dropdown, Layout, MenuProps, Row, Space } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styles from './Header.module.less';

const { Header: HeaderLayout } = Layout;

interface LayoutProps {
  toggleSidebar: (collapse: boolean) => void;
}

export const Header = ({ toggleSidebar }: LayoutProps) => {
  const [collapsed, setCollapsed] = useState(true);
  const user = useUser();
  const router = useRouter();
  useEffect(() => {
    console.log(user.user);
  });
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <a rel="noopener noreferrer" href="/profile">
          Profile Page
        </a>
      ),
    },
    {
      key: '2',
      label: (
        <a rel="noopener noreferrer" href="/accountsettings">
          Account Settings
        </a>
      ),
    },
    {
      key: '3',
      label: (
        <a rel="noopener noreferrer" href="#">
          Language
        </a>
      ),
    },
    {
      key: '4',
      danger: true,
      label: 'Logout',
      onClick: () => {
        localStorage.removeItem('token');
        router.reload();
      },
    },
  ];

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
          {/* <Col>
            <div className={styles.search}>
              <Search />
            </div>
          </Col> */}
          <Col>
            <div className={styles.thirdWrapper}>
              <Link href="#">EN</Link>
              {user.user ? (
                <>
                  <Link href="/watchlist">Watch List</Link>
                  <div style={{ color: '#fff' }}>{user.user?.email}</div>
                  <Dropdown menu={{ items }}>
                    <Space>
                      <a>
                        <Avatar size="large" icon={<UserOutlined />} />
                        <DownOutlined />
                      </a>
                    </Space>
                  </Dropdown>
                </>
              ) : (
                <>
                  {<Link href="/register">Register</Link>}
                  {<Link href="/login">Login</Link>}
                  {/* {
                    <Link href="/profile"> 
                          <Avatar size="large" icon={<UserOutlined />} />   
                    </Link>
                  } */}
                </>
              )}
            </div>
          </Col>
        </Row>
      </HeaderLayout>
    </Layout>
  );
};
