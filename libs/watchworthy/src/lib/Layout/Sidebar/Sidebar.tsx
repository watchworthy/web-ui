import { Layout, Menu } from 'antd';
import Link from 'next/link';
import styles from './Sidebar.module.less';
import { sidebarMenu } from './sidebarItems';

const { Sider } = Layout;

interface SidebarProps {
  collapsed?: boolean;
}

const { Item } = Menu;

export const Sidebar = ({ collapsed = true }: SidebarProps) => {
  return (
    <Sider
      className={styles.sidebar}
      trigger={null}
      collapsible
      collapsed={collapsed}
    >
      <Menu className={styles.menu} mode="inline" defaultSelectedKeys={['0']}>
        {sidebarMenu.map((item, index) => {
          return (
            <Item key={index} icon={item.icon}>
              <Link href={item.path} className={styles.items}>
                {item.label}
              </Link>
            </Item>
          );
        })}
      </Menu>
    </Sider>
  );
};
