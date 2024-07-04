import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  VStack,
  Text,
  useToast,
} from '@chakra-ui/react';
import { FaUserNinja, FaLock } from 'react-icons/fa';
import SocialLogin from './SocialLogin';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { usernameLogin, IUsernameLoginVariables } from '../api';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}
interface IForm {
  username: string;
  password: string;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IForm>();
  const toast = useToast();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: usernameLogin,
    onSuccess: () => {
      toast({
        title: 'welcome',
        status: 'success',
      });
      onClose();
      queryClient.refetchQueries({ queryKey: ['me'] });
      reset();
      console.log('mutation 성공');
    },
    onError: () => {
      console.log('mutation error');
    },
  });

  const onSubmit = ({ username, password }: IForm) => {
    mutation.mutate({ username, password });
  };

  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Log in</ModalHeader>
        <ModalCloseButton />
        <ModalBody as={'form'} onSubmit={handleSubmit(onSubmit)}>
          <VStack>
            <InputGroup size={'md'}>
              <InputLeftElement
                children={
                  <Box color="gray.500">
                    <FaUserNinja />
                  </Box>
                }
              />
              <Input
                isInvalid={Boolean(errors.username?.message)}
                {...register('username', { required: '유저이름을 적어주세요' })}
                variant={'filled'}
                placeholder="Username"
              />
            </InputGroup>
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color="gray.500">
                    <FaLock />
                  </Box>
                }
              />
              <Input
                isInvalid={Boolean(errors.password?.message)}
                {...register('password', { required: '비밀번호를 적어주세요' })}
                variant={'filled'}
                placeholder="Password"
                type="password"
              />
            </InputGroup>
          </VStack>
          {mutation.isError ? (
            <Text color="red" textAlign={'center'} fontSize={'sm'}>
              아이디 또는 비밀번호가 틀렸습니다
            </Text>
          ) : null}
          <Button isLoading={mutation.isPending} type="submit" mt={4} colorScheme={'red'} w="100%">
            Log in
          </Button>
          <SocialLogin />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
