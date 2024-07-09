import { Box, Button, Container, FormControl, Heading, Input, VStack, Link, Text, useToast } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import useHostOnlyPage from '../components/HostOnlyPage';
import ProtectedPage from '../components/ProtectedPage';
import { useMutation } from '@tanstack/react-query';
import { IUploadPhoto, uploadPhoto } from '../api';

export default function UploadPhotos() {
  const { register, handleSubmit } = useForm();
  const { roomPK } = useParams();
  console.log('roomPK', roomPK);
  const roomPK_num = parseInt(roomPK || '0'); // roomPK 값을 숫자로 변환합니다.
  const toast = useToast();
  useHostOnlyPage();
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const description = '이미지 세부사항';
  const mutation = useMutation({
    mutationFn: uploadPhoto,
    onSuccess: () => {
      toast({
        title: '이미지 전송 성공',
        status: 'success',
      });
    },
    onError: () => {
      console.log('mutation error');
      toast({
        title: '이미지 전송 실패',
        status: 'error',
      });
    },
  });

  const onSubmit = async (data: any) => {
    const { file } = data;
    const formData = new FormData();
    formData.append('image', file[0]);

    try {
      setLoading(true);
      const response = await axios.post(
        'https://api.imgbb.com/1/upload?key=3a2dfa179a1e131d7f3c7b9089d5f67a',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      const uploadedUrl = response.data.data.url;
      setUploadedUrl(uploadedUrl);
      mutation.mutate({ file: uploadedUrl, description, roomPK: roomPK_num });
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
