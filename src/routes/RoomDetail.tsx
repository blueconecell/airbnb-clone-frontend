import {useQuery} from '@tanstack/react-query';
import {useParams} from 'react-router-dom';
import {getRoomDetail, getRoomReviews} from '../api';
import {IRoomDetail, IReview} from '../types';
import {Box, Grid, Heading, Skeleton, Image, GridItem, VStack, Text, HStack, Avatar} from '@chakra-ui/react';
import {FaStar} from 'react-icons/fa';

export default function RoomDetail() {
  const {roomPK} = useParams();
  const {isLoading, data: roomDetailData} = useQuery<IRoomDetail>({
    queryKey: ['roomPk', roomPK],
    queryFn: getRoomDetail,
  });
  const {isLoading: isReviewsLoading, data: roomReviewsData} = useQuery<IReview[]>({
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
      <HStack width={'40%'} justifyContent={'space-between'} mt={10}>
        <VStack alignItems={'flex-start'}>
          <Skeleton isLoaded={!isLoading} height={'30px'}>
            <Heading fontSize={'2xl'}>House hosted by {roomDetailData?.owner.name}</Heading>
          </Skeleton>
          <Skeleton isLoaded={!isLoading} height={'30px'}>
            <HStack justifyContent={'flex-start'} w="100%">
              <Text>
                {roomDetailData?.toilets} toliet{roomDetailData?.toilets === 1 ? '' : 's'}
              </Text>
              <Text>∙</Text>
              <Text>
                {roomDetailData?.rooms} room{roomDetailData?.rooms === 1 ? '' : 's'}
              </Text>
            </HStack>
          </Skeleton>
        </VStack>
        <Avatar name={roomDetailData?.owner.name} size={'xl'} src={roomDetailData?.owner.avatar} />
      </HStack>
      <Box mt={10}>
        <Heading fontSize={'2xl'}>
          <HStack>
            <FaStar />
            <Text>{roomDetailData?.rating}</Text>
            <Text>∙</Text>
            <Text>
              {roomReviewsData?.length} review{roomReviewsData?.length === 1 ? '' : 's'}
            </Text>
          </HStack>
        </Heading>
      </Box>
    </Box>
  );
}
