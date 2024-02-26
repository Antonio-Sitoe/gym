import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { ScreenHeader } from "@/components/ScreenHeader";
import { UserPhoto } from "@/components/UserPhoto";
import {
  Center,
  Heading,
  ScrollView,
  Skeleton,
  Text,
  VStack,
  useToast,
} from "native-base";
import { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";

const PHOTO_SIZE = 33;

type props = FileSystem.FileInfo & {
  size: number;
};

export default function TabTwoScreen() {
  const toast = useToast();
  const [isLoadingPhoto, setIsLoadingPhoto] = useState(false);
  const [userPhoto, setUserPhoto] = useState(
    "https://github.com/antonio-sitoe.png"
  );

  async function handleUserPhotoSelected() {
    setIsLoadingPhoto(true);
    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
      });
      if (photoSelected.canceled) {
        return;
      }
      const photoInfor = (await FileSystem.getInfoAsync(
        photoSelected.assets[0].uri
      )) as props;

      if (photoInfor.exists.valueOf() && photoInfor.size / 1024 / 1024 > 5) {
        return toast.show({
          title: "Essa imagem e muito grande. Escola uma de ate 3MB",
          bgColor: "red.500",
          placement: "top",
        });
      }
      setUserPhoto(photoSelected.assets[0].uri);
    } catch (error) {
      console.log("Erro ao buscar foto", error);
    } finally {
      setIsLoadingPhoto(false);
    }
  }
  return (
    <VStack flex={1} bg="gray.700">
      <ScreenHeader title="Perfil" />
      <ScrollView>
        <Center mt={6} px={10}>
          {isLoadingPhoto ? (
            <Skeleton
              w={PHOTO_SIZE}
              h={PHOTO_SIZE}
              rounded="full"
              startColor="gray.500"
              endColor="gray.400"
            />
          ) : (
            <UserPhoto
              alt="Foto do Usuario"
              size={PHOTO_SIZE}
              source={{ uri: userPhoto }}
            />
          )}
          <TouchableOpacity onPress={handleUserPhotoSelected}>
            <Text
              color="green.500"
              fontWeight="bold"
              fontSize="md"
              mb={8}
              mt={2}
            >
              Alterar foto
            </Text>
          </TouchableOpacity>

          <Input bg="gray.600" placeholder="Nome" />
          <Input bg="gray.600" placeholder="Email" isDisabled />
        </Center>

        <VStack px={10} mt={12} mb={9}>
          <Heading color="gray.200" fontSize="md" mb={2}>
            Alterar Senha
          </Heading>
          <Input bg="gray.600" placeholder="Senha antiga" secureTextEntry />
          <Input bg="gray.600" placeholder="Nova Senha" secureTextEntry />
          <Input
            bg="gray.600"
            placeholder="Confirme nova Senha"
            secureTextEntry
          />
          <Button title="Atualizar perfil" />
        </VStack>
      </ScrollView>
    </VStack>
  );
}
