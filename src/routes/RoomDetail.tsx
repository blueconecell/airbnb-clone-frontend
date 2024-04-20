import {useQuery} from '@tanstack/react-query';
import {useParams} from 'react-router-dom';
import {getRoomDetail} from '../api';
interface IPhoto {
  pk: string;
  file: string;
  description: string;
}
interface IRoom {
  pk: number;
  name: string;
  country: string;
  city: string;
  price: number;
  rating: number;
  is_owner: boolean;
  photos: IPhoto[];
}
export default function RoomDetail() {
  const {roomPK} = useParams();
  const {isLoading, data: roomDetailData} = useQuery<IRoom>({
    queryKey: ['roomPk', roomPK],
    queryFn: getRoomDetail,
  });
  return <h1>Hi</h1>;
}
