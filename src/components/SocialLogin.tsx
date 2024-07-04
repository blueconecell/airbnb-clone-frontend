import { FaComment, FaGithub } from 'react-icons/fa';
import { Box, Button, Divider, HStack, Text, VStack } from '@chakra-ui/react';

export default function SocialLogin() {
  const kakaoParams = {
    client_id: '1af4b8b450dffcdd625ba1f8ca864120',
    redirect_uri: 'http://127.0.0.1:3000/social/kakao',
    response_type: 'code',
  };
  const params = new URLSearchParams(kakaoParams).toString();
  console.log(params);
  return (
    <Box mb={4}>
      <HStack my={8}>
        <Divider />
        <Text textTransform={'uppercase'} color="gray.500" fontSize="xs" as="b">
          Or
        </Text>
        <Divider />
      </HStack>
      <VStack>
        <Button
          as="a"
          href="https://github.com/login/oauth/authorize?client_id=Ov23licVYLUaPAnys6tz&scope=read:user,user:email"
          w="100%"
          leftIcon={<FaGithub />}
          colorScheme={'telegram'}>
          Continue with Github
        </Button>
        <Button
          as={'a'}
          href={`https://kauth.kakao.com/oauth/authorize?${params}`}
          w="100%"
          leftIcon={<FaComment />}
          colorScheme={'yellow'}>
          Continue with Kakao
        </Button>
      </VStack>
    </Box>
  );
}
