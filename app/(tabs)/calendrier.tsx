import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useState } from "react";
import { Button, StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";
import { TextInput } from "react-native-gesture-handler";
import { View } from "react-native-reanimated/lib/typescript/Animated";

export default function Calendrier() {
  const [selectedDate, setselectedDate] = useState(""); // création d'un état avec useState pour stocker la date sélectionnée par l'utilisateur
  // ex de fonctionnement : const [valeurActuelle, fonctionPourModifierValeur] = useState(valeurInitiale);
  // valeurActuelle -> C’est la donnée que tu veux stocker (ex. : une date, un objet, une liste, etc.)
  // fonctionPourModifierValeur -> Tu l’utilises pour mettre à jour cette donnée quand quelque chose change
  // valeurInitiale -> Ce que cette donnée vaut au départ, avant toute interaction

  const [historiqueEmotions, setHistoriqueEmotions] = useState({}); // création d'un état pour stocker l'historique des dates sélectionnées
  // historique -> C’est un tableau qui va contenir toutes les dates que l’utilisateur a sélectionnées
  const [humeur, setHumeur] = useState("");
  const [commentaire, setCommentaire] = useState("");
  let contenuFormulaire = null; // variable pour contenir tout le bloc d'affichage du formulaire

  if (selectedDate) {
    contenuFormulaire = (
      <View> 
      <TextInput placeholder="Ton humeur du jour" value={humeur} onChangeText={setHumeur} />
      <TextInput placeholder="Indique un commentaire" value={commentaire} onChangeText={setCommentaire} />
      <Button title="Enregistrer" onPress={() => {
        setHistoriqueEmotions((historiqueExistant) => ({
          ...historiqueExistant,
          [selectedDate]: {
            humeur: humeur,
            commentaire: commentaire,
          },
        }));
      setHumeur("");
      setCommentaire("");
      }}
      />
      </View>
    );
  }

  return (
    <ThemedView style={styles.titleContainer}>
      <ThemedText type="title">Calendrier</ThemedText>
      <Calendar
        onDayPress={(day) => {
          setselectedDate(day.dateString);
        }}
      />
      <ThemedText>{selectedDate}</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flex: 1, // aligner le titre Calendrier en haut et le centrer
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingTop: 50,
    gap: 8,
  },
});
