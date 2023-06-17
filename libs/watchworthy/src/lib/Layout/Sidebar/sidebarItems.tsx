import {
  CalendarOutlined,
  CommentOutlined,
  PlayCircleOutlined,
  ProfileOutlined,
  RightCircleOutlined,
  StarOutlined,
  TeamOutlined,
  VideoCameraAddOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';

export const sidebarMenu = [
  {
    label: 'Movies',
    icon: <VideoCameraOutlined />,
    path: '/',
  },
  {
    label: 'TV Shows',
    icon: <CalendarOutlined />,
    path: '/tvshows',
  },
  {
    label: 'Awards',
    icon: <StarOutlined />,
    path: '/awards',
  },
  {
    label: 'Events',
    icon: <ProfileOutlined />,
    path: '/events',
  },
  {
    label: 'People',
    icon: <TeamOutlined />,
    path: '/people',
  },
  {
    label: 'Community',
    icon: <CommentOutlined />,
    path: '/community',
  },
  {
    label: 'Popular',
    icon: <PlayCircleOutlined />,
    path: '/popular',
  },
  {
    label: 'Recommendations',
    icon: <RightCircleOutlined />,
    path: '/recommendations',
  },
  {
    label: 'Upcoming',
    icon: <VideoCameraAddOutlined />,
    path: '/upcoming',
  },
];
