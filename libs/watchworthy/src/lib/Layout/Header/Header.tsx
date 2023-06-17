import {
  BellOutlined,
  DownOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  HeartOutlined,
} from '@ant-design/icons';
import { useUser } from '@watchworthy/ui';
import { Avatar, Badge, Col, Dropdown, Layout, Menu, MenuProps, Row, Space } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styles from './Header.module.less';

const { Header: HeaderLayout } = Layout;

interface LayoutProps {
  toggleSidebar: (collapse: boolean) => void;
}
interface Notification {
  id: number;
  userId: number;
  message: string;
  dateTimeCreated: string;
  read: boolean;
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
        <Link href="/profile" passHref>
          Profile Page
        </Link>
      ),
    },
    {
      key: '2',
      label: (
        <Link href="/accountsettings" passHref>
          Account Settings
        </Link>
      ),
    },
    // {
    //   key: '3',
    //   label: (
    //     <a rel="noopener noreferrer" href="#">
    //       Language
    //     </a>
    //   ),
    // },
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

  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        if (user && user.user) {
          const response = await fetch(`http://localhost:8081/notification/${user.user.id}`);
          const data = await response.json();
          if (Array.isArray(data)) {
            setNotifications(data);
          }
        }
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };
  
    fetchNotifications();
  }, [user]);
  

  const notificationMenu = (
    <Menu>
    {notifications.map((notification: Notification) => (
      <Menu.Item key={notification.id}>
        {notification.message}
      </Menu.Item>
    ))}
  </Menu>
  );
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
              {user.user ? (
                <>
                  <Link href="/watchlist">Watch List</Link>
                  
                  <Dropdown overlay={notificationMenu}>
                    <Space>
          <Badge count={notifications.length}>
            <a>
              Notifications <BellOutlined/>
            </a>
          </Badge>
          </Space>
        </Dropdown>
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
                  <Link href="/register">Register</Link>
                  <Link href="/login">Login</Link>
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
