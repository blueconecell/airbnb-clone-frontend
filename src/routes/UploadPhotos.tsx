import { Box, Button, Container, FormControl, Heading, Input, VStack, Link, Text } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import useHostOnlyPage from '../components/HostOnlyPage';
import ProtectedPage from '../components/ProtectedPage';

export default function UploadPhotos() {
  const { register, handleSubmit } = useForm();
  const { roomPk } = useParams();
  useHostOnlyPage();
  const [uploadedUrl, setUploadedUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: any) => {
    const formData = new FormData();
    formData.append('image', data.file[0]);

    try {
      setLoading(true);
      const response = await axios.post(
        `https://api.imgbb.com/1/upload?expiration=600&key=3a2dfa179a1e131d7f3c7b9089d5f67a`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setUploadedUrl(response.data.data.url);
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setLoading(false);
    }
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
          <Heading textAlign={'center'}>Upload a Photo</Heading>
          <VStack spacing={5} mt={10} as="form" onSubmit={handleSubmit(onSubmit)}>
            <FormControl>
              <Input {...register('file', { required: true })} type="file" accept="image/*" />
            </FormControl>
            <Button w="full" colorScheme={'red'} type="submit" isLoading={loading}>
              Upload photos
            </Button>
            {uploadedUrl && (
              <Text mt={5}>
                Uploaded! Check your photo{' '}
                <Link href={uploadedUrl} color="blue.500" isExternal>
                  here
                </Link>
                .
              </Text>
            )}
          </VStack>
        </Container>
      </Box>
    </ProtectedPage>
  );
}
