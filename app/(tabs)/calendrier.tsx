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
    flexDirection: "row",
    gap: 8,
  },
});
