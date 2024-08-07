import { Heading, Spinner, Text, VStack, useToast } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { githubLogin } from '../api';
import { useQueryClient } from '@tanstack/react-query';

export default function GithubConfirm() {
  const { search } = useLocation();
  const toast = useToast();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const confirmLogin = async () => {
    const params = new URLSearchParams(search);
    const code = params.get('code');
    if (code) {
      const status = await githubLogin(code);
      if (status === 200) {
        toast({
          status: 'success',
          title: 'Welcome!',
          position: 'top',
          description: 'Happy to Login',
        });
        queryClient.refetchQueries({ queryKey: ['me'] });
        navigate('/');
      }
    }
  };

  useEffect(() => {
    confirmLogin();
  }, []);
  return (
    <VStack justifyContent={'center'} mt={40}>
      <Heading>Processing log in...</Heading>
      <Text>Don't go anywhere.</Text>
      <Spinner size={'lg'}></Spinner>;
    </VStack>
  );
}
