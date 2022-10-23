import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import DashboardAppPage from './pages/DashboardAppPage';
import SignupPage from './pages/SignupPage';
import Quiz from "./components/game/gameQuiz/Quiz";
import {FieldLevelValidationExample} from "./pages/Test";
import GameHighOrLow from './components/game/GameHighOrLow/GameHighOrLow';
import LuckyGame from './components/game/GameMayMan/LuckyGame';
import UserProfile from './pages/UserProfile';
import LeaderBoard from "./pages/LeaderBoard";

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
        { path: 'quiz', element: <Quiz /> },
        { path: 'casino', element: <GameHighOrLow /> },
        { path: 'luckynumber', element: <LuckyGame /> },
        {path: 'profile', element: <UserProfile />},
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
      path: 'test',
      element: <FieldLevelValidationExample />
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    }
  ]);

  return routes;
}
