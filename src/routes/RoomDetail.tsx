import {useQuery} from '@tanstack/react-query';
import {useParams} from 'react-router-dom';
import {getRoomDetail} from '../api';
import {IRoomDetail} from '../types';
import {Box, Grid, Heading, Skeleton, Image, GridItem} from '@chakra-ui/react';
export default function RoomDetail() {
  const {roomPK} = useParams();
  const {isLoading, data: roomDetailData} = useQuery<IRoomDetail>({
    queryKey: ['roomPk', roomPK],
    queryFn: getRoomDetail,
  });
  return (
    <Box mt={10} px={{base: 10, lg: 40}}>
      <Skeleton isLoaded={!isLoading} h={'43px'} w={'25%'}>
        <Heading>{roomDetailData?.name}</Heading>
      </Skeleton>
      <Grid
        mt={8}
        rounded="xl"
        overflow={'hidden'}
        gap={2}
        height="60vh"
        templateRows={'1fr 1fr'}
        templateColumns={'repeat(4, 1fr)'}
      >
        {[0, 1, 2, 3, 4].map((index) => (
          <GridItem colSpan={index === 0 ? 2 : 1} rowSpan={index === 0 ? 2 : 1} overflow={'hidden'} key={index}>
            <Skeleton isLoaded={!isLoading} h="100%" w="100%">
              <Image objectFit={'cover'} w="100%" h="100%" src={roomDetailData?.photos[index].file} />
            </Skeleton>
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
}
