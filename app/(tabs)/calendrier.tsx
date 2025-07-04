import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { StyleSheet } from "react-native";
import { Calendar } from 'react-native-calendars';

export default function Calendrier() {
  return (
    <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Calendrier</ThemedText>
        <Calendar />
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
    flex:1, // aligner le titre Calendrier en haut et le centrer 
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingTop: 50,
    gap: 8,

  },
});
