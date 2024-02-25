import { HistoryCard } from "@/components/HistoryCard";
import { ScreenHeader } from "@/components/ScreenHeader";
import { Heading, SectionList, Text, VStack } from "native-base";
import { useState } from "react";
import { StyleSheet } from "react-native";

export default function TabTwoScreen() {
  const [exercicies, setExercicies] = useState([
    {
      title: "24.04.2000",
      data: ["Pizza", "Burguer", "Unilaeral"],
    },
    {
      title: "30.04.2000",
      data: ["Puxada frontal"],
    },
  ]);
  return (
    <VStack flex={1} bg="gray.700">
      <ScreenHeader title="Historico de exercicios" />
      <SectionList
        sections={exercicies}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <HistoryCard />}
        renderSectionHeader={({ section }) => (
          <Heading color={"gray.200"} fontSize={"md"} mt={10} mb={3}>
            {section.title}
          </Heading>
        )}
        px={8}
        contentContainerStyle={
          exercicies.length === 0 && {
            flex: 1,
            justifyContent: "center",
          }
        }
        ListEmptyComponent={() => (
          <Text color="gray.100" textAlign={"center"}>
            Nao ha exercicios registrados ainda
          </Text>
        )}
      />
    </VStack>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
