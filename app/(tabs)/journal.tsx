import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import ThoughtsEditor from "@/components/ThoughtsEditor";
import { StyleSheet } from "react-native";

export const screenOptions = {
  title: "Journal",
};

export default function Journal() {
  return (
    <ThemedView style={styles.container}>
      {/* Titre de la page */}
      <ThemedText type="title">
        Bienvenue dans votre journal personnel !
      </ThemedText>

      {/* Citation du jour */}
      <ThemedText type="default" style={styles.quote}>
        🌱 Citation du jour : "La vie est belle"
      </ThemedText>

      {/* Zone pour écrire ses pensées */}
      <ThoughtsEditor />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "flex-start",
    backgroundColor: "#fff",
  },
  quote: {
    fontSize: 16,
    fontStyle: "italic",
    marginVertical: 20,
  },
});
