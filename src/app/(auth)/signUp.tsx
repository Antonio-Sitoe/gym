import { Image, VStack, Text, Center, Heading, ScrollView } from "native-base";

import BackgroundIMg from "../../assets/background.png";
import Logo from "@/assets/logo.svg";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { useRouter } from "expo-router";

export default function SignIn() {
  const { push } = useRouter();
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1} px={10} pb={16} bg="gray.700">
        <Image
          source={BackgroundIMg}
          defaultSource={BackgroundIMg}
          alt="Pessoas treinando"
          resizeMode="contain"
          position="absolute"
        />

        <Center my={24}>
          <Logo />

          <Text color="gray.100" fontSize="sm">
            Treine sua mente e o seu corpo.
          </Text>
        </Center>

        <Center>
          <Heading color="gray.100" fontSize="xl" mb={6} fontFamily="heading">
            Crie sua conta
          </Heading>

          <Input placeholder="Nome" autoCapitalize="none" />

          <Input
            placeholder="E-mail"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Input placeholder="Senha" secureTextEntry />

          <Button title="Criar e acessar" />
        </Center>

        <Button
          title="Voltar para login"
          variant="outline"
          onPress={()=>push('/')}
          mt={24}
        />
      </VStack>
    </ScrollView>
  );
}
