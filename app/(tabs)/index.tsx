import { Image } from "expo-image";
import { Button, StyleSheet } from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const today = new Date();
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  const dateFormatee = today.toLocaleDateString("fr-FR", options);
  const router = useRouter();

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">
          Bienvenue dans ton appli bien-être ! 
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.subtitleContainer}>
        <ThemedText type="subtitle">Renseigne ton profil afin de pouvoir bénéficier de l'app</ThemedText>
      </ThemedView>
      <Button title="Créer ton profil" onPress={() => router.push('/profil-formulaire')} />
        <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">{dateFormatee}</ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    fontWeight: "bold",
  },
  subtitleContainer: {
    flexDirection: "row",
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
