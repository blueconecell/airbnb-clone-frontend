import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { checkBooking, getRoomDetail, getRoomReviews } from '../api';
import { IRoomDetail, IReview } from '../types';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Helmet } from 'react-helmet';
import {
  Box,
  Grid,
  Heading,
  Skeleton,
  Image,
  GridItem,
  VStack,
  Text,
  HStack,
  Avatar,
  Container,
  Button,
} from '@chakra-ui/react';
import { FaStar } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { Value } from 'react-calendar/dist/cjs/shared/types';

export default function RoomDetail() {
  const BASIC_HOUSE_IMG = 'https://i.pinimg.com/736x/98/58/f3/9858f37662de08511199dd7712494133.jpg';
  const { roomPK } = useParams();
  const { data: roomDetailData, isLoading } = useQuery<IRoomDetail>({
    queryKey: ['roomPk', roomPK],
    queryFn: getRoomDetail,
  });
  const { data: reviewsData, isLoading: isReviewsLoading } = useQuery<IReview[]>({
    queryKey: ['rooms', roomPK, `reviews`],
    queryFn: getRoomReviews,
  });
  const [dates, setDates] = useState<Date[]>();
  const { data: checkBookingData, isLoading: isCheckingBooking } = useQuery({
    queryKey: ['check', roomPK, dates],
    queryFn: checkBooking,
    enabled: dates !== undefined,
    gcTime: 0,
  });
  console.log(checkBookingData, isCheckingBooking);
  console.log('checkBookingData.ok', checkBookingData?.ok);
  console.log('dates', dates);
  return (
    <Box mt={10} px={{ base: 10, lg: 40 }}>
      <Helmet>
        <title>{roomDetailData ? roomDetailData.name : 'Loading...'}</title>
      </Helmet>
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
        templateColumns={'repeat(4, 1fr)'}>
        {[0, 1, 2, 3, 4].map((index) => (
          <GridItem colSpan={index === 0 ? 2 : 1} rowSpan={index === 0 ? 2 : 1} overflow={'hidden'} key={index}>
            <Skeleton isLoaded={!isLoading} h="100%" w="100%">
              {roomDetailData?.photos && roomDetailData.photos.length > 0 ? (
                roomDetailData.photos.length < 5 ? (
                  index < roomDetailData.photos.length ? (
                    <Image objectFit={'cover'} w="100%" h="100%" src={roomDetailData?.photos[index].file} />
                  ) : (
                    <Image objectFit={'cover'} w="100%" h="100%" src={BASIC_HOUSE_IMG} />
                  )
                ) : (
                  <Image objectFit={'cover'} w="100%" h="100%" src={roomDetailData?.photos[index].file} />
                )
              ) : null}
            </Skeleton>
          </GridItem>
        ))}
      </Grid>
      <Grid gap={20} templateColumns={'2fr 1fr'} maxW={'Container.lg'}>
        <Box>
          <HStack justifyContent={'space-between'} mt={10}>
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
            <Heading mb={5} fontSize={'2xl'}>
              <HStack>
                <FaStar /> <Text>{roomDetailData?.rating}</Text>
                <Text>∙</Text>
                <Text>
                  {reviewsData?.length} review
                  {reviewsData?.length === 1 ? '' : 's'}
                </Text>
              </HStack>
            </Heading>
            <Container mt={16} maxW="container.lg" marginX="none">
              <Grid gap={10} templateColumns={'1fr 1fr'}>
                {reviewsData?.map((review, index) => (
                  <VStack alignItems={'flex-start'} key={index}>
                    <HStack>
                      <Avatar name={review.user.name} src={review.user.avatar} size="md" />
                      <VStack spacing={0} alignItems={'flex-start'}>
                        <Heading fontSize={'md'}>{review.user.name}</Heading>
                        <HStack spacing={1}>
                          <FaStar size="12px" />
                          <Text>{review.rating}</Text>
                        </HStack>
                      </VStack>
                    </HStack>
                    <Text>{review.payload}</Text>
                  </VStack>
                ))}
              </Grid>
            </Container>
          </Box>
        </Box>
        <Box pt={10}>
          <Calendar
            onChange={(value: Value) => setDates(value as Date[])}
            prev2Label={null}
            next2Label={null}
            minDetail="month"
            minDate={new Date()}
            maxDate={new Date(Date.now() + 60 * 60 * 24 * 7 * 4 * 6 * 1000)}
            selectRange
            defaultValue={[new Date(), new Date(Date.now() + 86400000)]} // 오늘과 내일 날짜로 설정
          />
          {dates?.map((date) => (
            <Text>{date.toJSON().split('T')[0]}</Text>
          ))}
          <Button isDisabled={!checkBookingData?.ok} isLoading={isCheckingBooking} w={'100%'} colorScheme="red" mt={5}>
            Make booking
          </Button>
          {!isCheckingBooking && !checkBookingData?.ok ? (
            <Text color="red.500">Can't book on those dates, sorry.</Text>
          ) : null}
        </Box>
      </Grid>
    </Box>
  );
}
