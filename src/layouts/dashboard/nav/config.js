// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'Leaderboard',
    path: '/dashboard/leaderboard',
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
    title: 'Rock Paper Scissors',
    path: '/dashboard/RockPaperScissors',
    icon: icon('videogame_asset_black_24dp'),
  },
  {
    title: 'User Profile',
    path: '/dashboard/profile',
    icon: icon('account_circle_black_24dp'),
  },
  {
    title: 'login',
    path: '/login',
    icon: icon('ic_lock'),
  },
  {
    title: 'about',
    path: '/dashboard/about',
    icon: icon('psychology_alt_black_24dp'),
  },
];

export default navConfig;
