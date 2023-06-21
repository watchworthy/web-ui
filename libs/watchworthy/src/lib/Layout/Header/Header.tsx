import {
  BellOutlined,
  DownOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  HeartOutlined,
} from '@ant-design/icons';
import { useUser } from '@watchworthy/ui';
import { Avatar, Badge, Col, Dropdown, Layout, Menu, MenuProps, Row, Space, notification } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styles from './Header.module.less';
import Head from 'next/head';

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

  const { pathname } = router;

  let pageTitle = '';

  switch (pathname) {
    case '/':
      pageTitle = 'WatchWorthy - Home';
      break;
    case '/movies':
      pageTitle = 'WatchWorthy - Movies';
      break;
    case '/tvshows':
      pageTitle = 'WatchWorthy - TV Shows';
      break;
    case '/people':
      pageTitle = 'WatchWorthy - People';
      break;
    case '/awards':
      pageTitle = 'WatchWorthy - Awards';
      break;
    case '/events':
      pageTitle = 'WatchWorthy - Events';
      break;
    case '/recommendations':
      pageTitle = 'WatchWorthy - Recommendations';
      break;
    case '/watchlist':
      pageTitle = 'WatchWorthy - Watchlist';
      break;
    case '/popular':
      pageTitle = 'WatchWorthy - Popular';
      break;
    case '/upcoming':
      pageTitle = 'WatchWorthy - Upcoming';
      break;
    case '/community':
      pageTitle = 'WatchWorthy - Community';
      break;
    case '/login':
      pageTitle = 'WatchWorthy - Login';
      break;
    case '/sign-up':
      pageTitle = 'WatchWorthy - Sign Up';
      break;
    case '/reset-password':
      pageTitle = 'WatchWorthy - Reset Password';
      break;
    default:
      pageTitle = 'WatchWorthy - Movies';
      break;
  }

  
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
        console.log(notifications);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };
  
    fetchNotifications();
  }, [user.user]);

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
       <Head>
        <title>{pageTitle}</title>
      </Head>
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
            <div className={styles.thirdWrapper}>
              {user.user ? (
                <>
                  <Link href="/watchlist" passHref>
                    <Space>
                      
                      Watchlist
                      <HeartOutlined />
                    </Space>
                  </Link>
                  
                  <Dropdown overlay={notificationMenu}>
                    <Space>
          <Badge count={notifications.length}>
            <a>
              Notifications  <BellOutlined/>
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
