import {useQuery} from '@tanstack/react-query';
import {getMe} from '../api';

export default function useUser() {
  const {isLoading, data: meData, isError} = useQuery({queryKey: [`me`], queryFn: getMe, retry: false});
  return {
    userLoading: isLoading,
    user: meData,
    isLoggedIn: !isError,
  };
}
