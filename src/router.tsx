import { createBrowserRouter } from 'react-router-dom';
import Root from './components/Root';
import Home from './routes/Home';
import Users from './routes/Users';
import NotFound from './routes/NotFound';
import RoomDetail from './routes/RoomDetail';
import GithubConfirm from './routes/GithubConfirm';
import KakaoConfirm from './routes/KakaoConfirm';
import UploadRoom from './routes/UploadRoom';
import UploadPhotos from './routes/UploadPhotos';

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
        path: 'rooms/upload',
        element: <UploadRoom />,
      },
      {
        path: 'rooms/:roomPK',
        element: <RoomDetail />,
      },
      {
        path: 'rooms/:roomPK/photos',
        element: <UploadPhotos />,
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
