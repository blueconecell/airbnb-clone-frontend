import { FaAirbnb, FaMoon, FaSun } from 'react-icons/fa';
import {
  Box,
  Button,
  HStack,
  IconButton,
  useDisclosure,
  Stack,
  LightMode,
  useColorMode,
  useColorModeValue,
  Avatar,
  Skeleton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useToast,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import LoginModal from './LoginModal';
import SignUpModal from './SignUpModal';
import useUser from '../lib/useUser';
import { logOut } from '../api';
import { useQueryClient } from '@tanstack/react-query';

export default function Header() {
  const { userLoading, isLoggedIn, user } = useUser();
  const { isOpen: isLoginOpen, onClose: onLoginClose, onOpen: onLoginOpen } = useDisclosure();
  const { isOpen: isSignUpOpen, onClose: onSignUpClose, onOpen: onSignUpOpen } = useDisclosure();
  const { toggleColorMode } = useColorMode();
  const logoColor = useColorModeValue('red.500', 'red.200');
  const Icon = useColorModeValue(FaMoon, FaSun);
  const toast = useToast();
  const queryClient = useQueryClient();
  const onLogOut = async () => {
    const toastId = toast({
      title: 'Login out...',
      description: 'sad to see you go...',
      status: 'loading',
      position: 'top-right',
    });
    await logOut();
    queryClient.refetchQueries({ queryKey: ['me'] });
    toast.update(toastId, {
      title: 'Good Bye!',
      description: 'See you later!',
      status: 'success',
      position: 'top-right',
      duration: 2000,
    });
  };
  return (
    <Stack
      justifyContent={'space-between'}
      alignItems="center"
      py={5}
      px={40}
      direction={{
        sm: 'column',
        md: 'row',
      }}
      spacing={{
        sm: 4,
        md: 0,
      }}
      borderBottomWidth={1}>
      <Box color={logoColor}>
        <Link to={'/'}>
          <FaAirbnb size={'48'} />
        </Link>
      </Box>
      <HStack spacing={2}>
        <IconButton variant={'ghost'} aria-label="Toggle dark mode" onClick={toggleColorMode} icon={<Icon />} />

        {!userLoading ? (
          !isLoggedIn ? (
            <>
              <Button onClick={onLoginOpen}>Log in</Button>
              <LightMode>
                <Button onClick={onSignUpOpen} colorScheme={'red'}>
                  Sign up
                </Button>
              </LightMode>
            </>
          ) : (
            <Menu>
              <MenuButton>
                <Avatar name={user?.avatar} src={user?.avatar} size={'md'} />
              </MenuButton>
              <MenuList>
                <MenuItem onClick={onLogOut}>Log out</MenuItem>
              </MenuList>
            </Menu>
          )
        ) : (
          <Skeleton />
        )}
      </HStack>
      <LoginModal isOpen={isLoginOpen} onClose={onLoginClose} />
      <SignUpModal isOpen={isSignUpOpen} onClose={onSignUpClose} />
    </Stack>
  );
}
