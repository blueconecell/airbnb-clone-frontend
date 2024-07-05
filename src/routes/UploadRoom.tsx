import {
  Box,
  Text,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  InputLeftElement,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Textarea,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { FaBed, FaMoneyBill, FaToilet, FaUsb } from 'react-icons/fa';
import useHostOnlyPage from '../components/HostOnlyPage';
import ProtectedPage from '../components/ProtectedPage';
import { useMutation, useQuery } from '@tanstack/react-query';
import { IAmenity, ICategory, IRoomDetail } from '../types';
import { IUploadRoomVariables, getAmenities, getCategories, uploadRoom } from '../api';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

export default function UploadRoom() {
  const { register, handleSubmit } = useForm<IUploadRoomVariables>();
  const toast = useToast();
  const navigate = useNavigate();
  const { data: amenities, isLoading: isAmenitiesLoading } = useQuery<IAmenity[]>({
    queryKey: ['amenities'],
    queryFn: getAmenities,
  });
  const { data: categories, isLoading: isCategoriesLoading } = useQuery<ICategory[]>({
    queryKey: ['categories'],
    queryFn: getCategories,
  });
  const mutation = useMutation({
    mutationFn: uploadRoom,
    onSuccess: (data: IRoomDetail) => {
      toast({
        status: 'success',
        title: '방 업로드 됨!',
        position: 'top',
      });
      navigate(`/rooms/${data.id}`);
    },
  });
  useHostOnlyPage(); //훅으로 만들어서 사용하기(컴포넌트로 해도 됨)
  const onSubmit = (data: IUploadRoomVariables) => {
    mutation.mutate(data);
  };
  return (
    <ProtectedPage>
      <Box
        pb={40}
        mt={10}
        px={{
          base: 10,
          lg: 40,
        }}>
        <Container>
          <Heading textAlign={'center'}>Upload Room</Heading>
          <VStack spacing={10} as="form" mt={5} onSubmit={handleSubmit(onSubmit)}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input {...register('name', { required: true })} required type="text" />
              <FormHelperText>Write the name of your room.</FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>Country</FormLabel>
              <Input {...register('country', { required: true })} required type="text" />
            </FormControl>
            <FormControl>
              <FormLabel>City</FormLabel>
              <Input {...register('city', { required: true })} required type="text" />
            </FormControl>
            <FormControl>
              <FormLabel>Address</FormLabel>
              <Input {...register('address', { required: true })} required type="text" />
            </FormControl>
            <FormControl>
              <FormLabel>Price</FormLabel>
              <InputGroup>
                <InputLeftAddon children={<FaMoneyBill />} />
                <Input {...register('price', { required: true })} type="number" min={0} />
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel>Rooms</FormLabel>
              <InputGroup>
                <InputLeftAddon children={<FaBed />} />
                <Input {...register('rooms', { required: true })} type="number" min={0} />
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel>Toilets</FormLabel>
              <InputGroup>
                <InputLeftAddon children={<FaToilet />} />
                <Input {...register('toilets', { required: true })} type="number" min={0} />
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Textarea {...register('description', { required: true })} />
            </FormControl>
            <FormControl>
              <Checkbox {...register('pet_friendly', { required: true })}>Pet friendly?</Checkbox>
            </FormControl>
            <FormControl>
              <FormLabel>Kind of room</FormLabel>
              <Select {...register('kind', { required: true })} placeholder="Choose a kind">
                <option value="entire_place">Entire Place</option>
                <option value="private_room">Private Room</option>
                <option value="shared_room">Shared Room</option>
              </Select>
              <FormHelperText>What kind of room are you renting?</FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>Category</FormLabel>
              <Select {...register('category', { required: true })} placeholder="Choose a category">
                {categories?.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </Select>
              <FormHelperText>What category describes your room?</FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>Amenities</FormLabel>
              <Grid templateColumns={'1fr 1fr'} gap={5}>
                {amenities?.map((amenity) => (
                  <Box key={amenity.pk}>
                    <Checkbox value={amenity.pk} {...register('amenities', { required: true })}>
                      {amenity.name}
                    </Checkbox>
                    <FormHelperText>{amenity.description}</FormHelperText>
                  </Box>
                ))}
              </Grid>
            </FormControl>
            {mutation.isError ? <Text color="red">업로드 과정에서 뭔가 잘못됨</Text> : null}
            <Button type="submit" isLoading={mutation.isPending} colorScheme={'red'} size="lg" w="100%">
              Upload Room
            </Button>
          </VStack>
        </Container>
      </Box>
    </ProtectedPage>
  );
}
