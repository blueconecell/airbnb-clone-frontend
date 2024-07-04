import { createBrowserRouter } from 'react-router-dom';
import Root from './components/Root';
import Home from './routes/Home';
import Users from './routes/Users';
import NotFound from './routes/NotFound';
import RoomDetail from './routes/RoomDetail';
import GithubConfirm from './routes/GithubConfirm';
import KakaoConfirm from './routes/KakaoConfirm';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'rooms/:roomPK',
        element: <RoomDetail />,
      },
      {
        path: 'social',
        children: [{ path: 'github', element: <GithubConfirm /> }],
      },
      {
        path: 'social',
        children: [{ path: 'kakao', element: <KakaoConfirm /> }],
      },
    ],
  },
]);
export default router;
