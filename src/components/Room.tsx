import { FaCamera, FaRegHeart, FaStar } from 'react-icons/fa';
import { Box, Button, Grid, HStack, Image, Text, useColorModeValue, VStack } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import React from 'react';
interface IRoomProps {
  imageUrl: string;
  name: string;
  rating: number;
  city: string;
  country: string;
  price: number;
  pk: number;
  isOwner: boolean;
}
export default function Room({ imageUrl, name, rating, city, country, price, pk, isOwner }: IRoomProps) {
  const gray = useColorModeValue('gray.600', 'gray.300');
  const navigate = useNavigate();
  const onCameraClick = (event: React.SyntheticEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate(`/rooms/${pk}/photos`);
  };
  return (
    <Link to={`/rooms/${pk}`}>
      <VStack alignItems={'flex-start'}>
        <Box position="relative" overflow={'hidden'} mb={3} rounded="2xl">
          <Image minH="280" src={imageUrl} />
          <Button variant={'unstyled'} position="absolute" top={0} right={0} color="white" onClick={onCameraClick}>
            {isOwner ? <FaCamera size="20px" color="red" /> : <FaRegHeart size="20px" color="red" />}
          </Button>
        </Box>
        <Box>
          <Grid gap={2} templateColumns={'6fr 1fr'}>
            <Text display={'block'} as="b" noOfLines={1} fontSize="md">
              {name}
            </Text>
            <HStack spacing={1} alignItems="center">
              <FaStar size={12} />
              <Text fontSize={'sm'}>{rating}</Text>
            </HStack>
          </Grid>
          <Text fontSize={'sm'} color={gray}>
            {city}, {country}
          </Text>
        </Box>
        <Text fontSize={'sm'} color={gray}>
          <Text as="b">${price}</Text> / night
        </Text>
      </VStack>
    </Link>
  );
}
