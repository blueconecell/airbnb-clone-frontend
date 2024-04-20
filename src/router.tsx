import {createBrowserRouter} from 'react-router-dom';
import Root from './components/Root';
import Home from './routes/Home';
import Users from './routes/Users';
import NotFound from './routes/NotFound';
import RoomDetail from './routes/RoomDetail';

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
    ],
  },
]);
export default router;
