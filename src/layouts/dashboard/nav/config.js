// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'Leaderboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'quiz',
    path: '/dashboard/quiz',
    icon: icon('quiz_black_24dp'),
  },
  {
    title: 'casino',
    path: '/dashboard/casino',
    icon: icon('casino_black_24dp'),
  },
  {
    title: 'blog',
    path: '/dashboard/blog',
    icon: icon('ic_blog'),
  },
  {
    title: 'login',
    path: '/login',
    icon: icon('ic_lock'),
  },
  {
    title: 'Not found',
    path: '/404',
    icon: icon('ic_disabled'),
  },
];

export default navConfig;
