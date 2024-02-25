import { ExerciseCard } from "@/components/ExerciseCard";
import { Group } from "@/components/Group";
import { HomeHeader } from "@/components/HomeHeader";
import { useRouter } from "expo-router";
import { FlatList, HStack, Heading, Text, VStack } from "native-base";
import { useState } from "react";

export default function Home() {
  const { push } = useRouter();
  const [groups, setGroups] = useState([
    "Costas",
    "Bíceps",
    "Tríceps",
    "ombro",
  ]);
  const [exercises, setExercises] = useState([
    "Puxada frontal",
    "Remada curvada",
    "Remada unilateral",
    "Levantamento terras",
  ]);
  const [groupSelected, setGroupSelected] = useState("Costas");

  function handleOpenExerciDetail() {
    // push({
    //   pathname: "/(tabs)/home/[id]",
    //   params: {},
    // });
  }
  return (
    <VStack flex={1} bg="gray.700">
      <HomeHeader />
      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Group
            name={item}
            isActive={
              groupSelected.toLocaleUpperCase() === item.toLocaleUpperCase()
            }
            onPress={() => setGroupSelected(item)}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        _contentContainerStyle={{
          px: 8,
        }}
        my={10}
        maxH={10}
      />
      <VStack px={8}>
        <HStack justifyContent="space-between" mb={5}>
          <Heading color="gray.200" fontSize="md" fontFamily="heading">
            Exercícios
          </Heading>

          <Text color="gray.200" fontSize="sm">
            {exercises.length}
          </Text>
        </HStack>

        <FlatList
          data={exercises}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <ExerciseCard onPress={handleOpenExerciDetail} />
          )}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{
            paddingBottom: 20,
          }}
        />
      </VStack>
    </VStack>
  );
}
