import {
  Image,
  VStack,
  Text,
  Center,
  Heading,
  ScrollView,
  useToast,
} from "native-base";

import BackgroundIMg from "../../assets/background.png";
import Logo from "@/assets/logo.svg";

import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { AppError } from "@/utlis/AppError";

export default function signIn() {
  const { signInFn } = useAuth();
  const toast = useToast();
  const [isSubmiting, setIsSubmitting] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { push } = useRouter();

  async function handleSign({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    setIsSubmitting(true);
    try {
      await signInFn({
        email,
        password,
      });
    } catch (error) {
      const isAppError = error instanceof AppError;
      toast.show({
        title: isAppError
          ? error.message
          : "Nao foi possivel criar a conta tente novamente mais tarde",
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleCreate() {
    push("/(auth)/signUp");
  }
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
            Acesse a conta
          </Heading>

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="E-mail"
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Senha"
                secureTextEntry
                onChangeText={onChange}
                value={value}
              />
            )}
          />

          <Button
            title="Acessar"
            onPress={handleSubmit(handleSign)}
            isLoading={isSubmiting}
          />
        </Center>

        <Center mt={24}>
          <Text color="gray.100" fontSize="sm" mb={3} fontFamily="body">
            Ainda não tem acesso?
          </Text>

          <Button
            title="Criar Conta"
            variant="outline"
            onPress={handleCreate}
          />
        </Center>
      </VStack>
    </ScrollView>
  );
}
