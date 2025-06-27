import { ThemedText } from "@/components/ThemedText"; // il faut importer les éléments dont on a besoin sur notre page
import { ThemedView } from "@/components/ThemedView";
import { StyleSheet } from "react-native";

export const screenOptions = {
  title: "Journal",
}; 

export default function Journal() {
  // il faut exporter la fonction Profil pour qu'elle soit accessible dans l'application
  return (
    // il faut un retour de cette fonction avec le titre de la page
    <ThemedView style={styles.titleContainer}>
      <ThemedText type="title">
        Bienvenue dans votre journal personnel !
      </ThemedText>
    </ThemedView> //
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    fontWeight: "bold",
  },
  subtitleContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    fontStyle: "italic",
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
