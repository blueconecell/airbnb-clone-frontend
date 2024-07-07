import { Box, Grid, HStack, Skeleton, SkeletonText } from '@chakra-ui/react';
import Room from '../components/Room';
import RoomSkeleton from '../components/RoomSkeleton';
import { useQuery } from '@tanstack/react-query';
import { getRooms } from '../api';

const BASIC_HOUSE_IMG = 'https://i.pinimg.com/736x/98/58/f3/9858f37662de08511199dd7712494133.jpg';

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

export default function Home() {
  const { isLoading, data: roomsData } = useQuery<IRoom[]>({
    queryKey: ['rooms'],
    queryFn: getRooms,
  });
  return (
    <Grid
      mt={10}
      px={{
        base: 10,
        lg: 40,
      }}
      columnGap={4}
      rowGap={8}
      templateColumns={{
        sm: '1fr',
        md: '1fr 1fr',
        lg: 'repeat(3, 1fr)',
        xl: 'repeat(4, 1fr)',
        '2xl': 'repeat(5, 1fr)',
      }}>
      {isLoading ? (
        <>
          <RoomSkeleton />
          <RoomSkeleton />
          <RoomSkeleton />
          <RoomSkeleton />
          <RoomSkeleton />
          <RoomSkeleton />
          <RoomSkeleton />
          <RoomSkeleton />
          <RoomSkeleton />
          <RoomSkeleton />
        </>
      ) : null}
      {roomsData?.map((room) => (
        <></>
      ))}
      {roomsData?.map((room) => (
        <>
          {room.photos.length > 0 ? (
            <Room
              imageUrl={room.photos[0]?.file}
              isOwner={room.is_owner}
              name={room.name}
              rating={room.rating}
              city={room.city}
              country={room.country}
              price={room.price}
              pk={room.pk}
            />
          ) : (
            <Room
              imageUrl={BASIC_HOUSE_IMG}
              isOwner={room.is_owner}
              name={room.name}
              rating={room.rating}
              city={room.city}
              country={room.country}
              price={room.price}
              pk={room.pk}
            />
          )}
        </>
      ))}
    </Grid>
  );
}
