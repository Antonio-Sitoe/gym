import {
  Image,
  VStack,
  Text,
  Center,
  Heading,
  ScrollView,
  Toast,
  useToast,
} from "native-base";

import BackgroundIMg from "../../assets/background.png";
import Logo from "@/assets/logo.svg";
import { api } from "@/lib/axios";
import { Input } from "@/components/Input";
import { Alert } from "react-native";
import { Button } from "@/components/Button";
import { useState } from "react";
import { useRouter } from "expo-router";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";

import axios from "axios";
import * as yup from "yup";
import { AppError } from "@/utlis/AppError";
import { useAuth } from "@/contexts/AuthContext";

type FormDataProps = {
  name: string;
  email: string;
  password: string;
  password_confirm: string;
};

const signUpSchema = yup.object({
  name: yup.string().required("Informe o nome."),
  email: yup.string().required("Informe o e-mail").email("E-mail inválido."),
  password: yup
    .string()
    .required("Informe a senha")
    .min(6, "A senha deve ter pelo menos 6 dígitos."),
  password_confirm: yup
    .string()
    .required("Confirme a senha.")
    .oneOf(
      [yup.ref("password"), null as any],
      "A confirmação da senha não confere"
    ),
});

export default function SignIn() {
  const toast = useToast();
  const { signInFn } = useAuth();
  const [isSubmiting, setIsSubmitting] = useState(false);
  const {
    control,
    handleSubmit,

    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: yupResolver(signUpSchema) as any,
  });
  const { push } = useRouter();

  async function handleSignUp({ name, email, password }: FormDataProps) {
    setIsSubmitting(true);
    try {
      const { data } = await api.post("/users", {
        name,
        email,
        password,
      });
      console.log({ data });
      if (data) {
        await signInFn({ email, password });
      }
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

          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Nome"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.name?.message}
              />
            )}
          />

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
                errorMessage={errors.email?.message}
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
                errorMessage={errors.password?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password_confirm"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Confirmar a Senha"
                secureTextEntry
                onChangeText={onChange}
                value={value}
                onSubmitEditing={handleSubmit(handleSignUp)}
                returnKeyType="send"
                errorMessage={errors.password_confirm?.message}
              />
            )}
          />
          <Button
            title="Criar e acessar"
            onPress={handleSubmit(handleSignUp)}
            isLoading={isSubmiting}
          />
        </Center>

        <Button
          title="Voltar para login"
          variant="outline"
          onPress={() => push("/")}
          mt={24}
        />
      </VStack>
    </ScrollView>
  );
}
