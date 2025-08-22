import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import { Animated, Button, Easing, StyleSheet, View } from "react-native";

const quotes = [
  "La vie est belle",
  "Chaque jour est une nouvelle chance",
  "Respire, tout va bien",
  "Le bonheur est un chemin, pas une destination",
  "Avance pas à pas, mais avance toujours",
  "Tout ce que vous avez toujours voulu est de l'autre côté de la peur",
  "Chaque jour est une nouvelle opportunité de changer votre vie",
];

// Composant titre animé (scintillement clair-obscur)
const AnimatedTitle = () => {
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.6,
          duration: 800,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 800,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <Animated.Text style={[styles.title, { opacity }]}>
      Bloom 🌸
    </Animated.Text>
  );
};

// Composant citation fade-in
const FadeInQuote = ({ text }: { text: string }) => {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  return <Animated.Text style={[styles.quote, { opacity }]}>{text}</Animated.Text>;
};

export default function HomeScreen() {
  const today = new Date();
  const dayIndex = today.getDay();
  const quoteOfTheDay = quotes[dayIndex];

  const router = useRouter();

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#fde2e4", dark: "#1D3D47" }}
      headerImage={<ThemedView style={{ height: 0 }} />}
    >
      <View style={styles.contentContainer}>
        {/* Titre animé */}
        <AnimatedTitle />

        {/* Description encadrée */}
        <View style={styles.descriptionBox}>
          <ThemedText type="default" style={styles.description}>
            Note tes émotions, explore tes pensées et découvre des moments de calme chaque jour.
          </ThemedText>
        </View>

        {/* Citation fade-in */}
        <ThemedView style={styles.quoteContainer}>
          <FadeInQuote text={`« ${quoteOfTheDay} »`} />
        </ThemedView>

        {/* Bouton */}
        <Button
          title="Créer ton profil"
          onPress={() => router.push("/profil-formulaire")}
          color="#f78da7"
        />
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 42,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  descriptionBox: {
    backgroundColor: "rgba(255,255,255,0.7)",
    padding: 16,
    borderRadius: 16,
    marginBottom: 20,
    width: "100%",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  description: {
    fontSize: 16,
    color: "#444",
    textAlign: "center",
  },
  quoteContainer: {
    marginBottom: 24,
    paddingHorizontal: 12,
  },
  quote: {
    fontSize: 18,
    fontStyle: "italic",
    color: "#555",
    textAlign: "center",
  },
});
