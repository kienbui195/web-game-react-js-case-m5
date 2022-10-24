import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import DashboardAppPage from './pages/DashboardAppPage';
import SignupPage from './pages/SignupPage';
import Quiz from './components/game/gameQuiz/Quiz';
import GameHighOrLow from './components/game/GameHighOrLow/GameHighOrLow';
import UserProfile from './pages/UserProfile';
import LeaderBoard from './pages/LeaderBoard';
import RpsPage from './components/game/RockPaperScissors/RpsPage';
import AboutPage from './pages/About';
import GamePage from './pages/Game';

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'leaderboard', element: <LeaderBoard /> },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'game', element: <GamePage /> },
        { path: 'quiz', element: <Quiz /> },
        { path: 'casino', element: <GameHighOrLow /> },
        { path: 'RockPaperScissors', element: <RpsPage /> },
        { path: 'profile', element: <UserProfile /> },
        { path: 'about', element: <AboutPage /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },

        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '/signup',
      element: <SignupPage />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
