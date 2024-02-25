import { Image, VStack, Text, Center, Heading } from 'native-base';

import BackgroundIMg from '@/assets/background.png';
import Logo from '@/assets/logo.svg';
import { Input } from '@/components/Input';


export default function signIn() {
  return (
    <VStack flex={1} bg="gray.700">
      <Image source={BackgroundIMg} alt="pessoas ter" resizeMode="contain" position="absolute" />
      <Logo />
      <Center my={24}>
        <Text color="gray.100" fontSize="sm">
          Treine a sua mente e corpo
        </Text>
        <Heading color="gray.100" fontSize="xl" mb={6} fontFamily="heading">
          Acesse sua Conta
        </Heading>
        <Input placeholder="E-mail" />
        <Input placeholder="Senha" />
      </Center>
    </VStack>
  );
}
