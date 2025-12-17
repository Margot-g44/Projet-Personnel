import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import * as SQLite from "expo-sqlite";
import { useEffect, useState } from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";
import { Calendar } from "react-native-calendars";

const Calendrier = () => {
  const db = SQLite.openDatabaseSync("bienetre.db");
  const [selectedDate, setSelectedDate] = useState("");
  const [humeur, setHumeur] = useState("");
  const [commentaire, setCommentaire] = useState("");
  const [historiqueEmotions, setHistoriqueEmotions] = useState<{
    [key: string]: { humeur: string; commentaire: string };
  }>({});

  // Crée la table si elle n'existe pas
  useEffect(() => {
    try {
      db.execSync(
        `CREATE TABLE IF NOT EXISTS emotions (
          date TEXT PRIMARY KEY NOT NULL,
          humeur TEXT,
          commentaire TEXT
        );`
      );
      loadAllEmotions();
    } catch (error) {
      console.error("Erreur lors de la création de la table :", error);
    }
  }, []);

  // Charge toutes les émotions depuis la base
  const loadAllEmotions = () => {
    try {
      const result = db.getAllSync("SELECT * FROM emotions;");
      const data: {
        [key: string]: { humeur: string; commentaire: string };
      } = {};
      result.forEach((row: any) => {
        data[row.date] = {
          humeur: row.humeur,
          commentaire: row.commentaire,
        };
      });
      setHistoriqueEmotions(data);
    } catch (error) {
      console.error("Erreur lors du chargement des émotions :", error);
    }
  };

  const saveEmotion = () => {
    if (!selectedDate) return;
    try {
      db.runSync(
        `INSERT OR REPLACE INTO emotions (date, humeur, commentaire) VALUES (?, ?, ?)`,
        [selectedDate, humeur, commentaire]
      );
      setHistoriqueEmotions((prev) => ({
        ...prev,
        [selectedDate]: { humeur, commentaire },
      }));
      setHumeur("");
      setCommentaire("");
    } catch (error) {
      console.error("Erreur lors de l'enregistrement :", error);
    }
  };

  // Pré-remplit le formulaire si une émotion existe pour cette date
  useEffect(() => {
    if (selectedDate && historiqueEmotions[selectedDate]) {
      setHumeur(historiqueEmotions[selectedDate].humeur);
      setCommentaire(historiqueEmotions[selectedDate].commentaire);
    } else {
      setHumeur("");
      setCommentaire("");
    }
  }, [selectedDate, historiqueEmotions]);

  return (
    <ThemedView style={styles.titleContainer}>
      <ThemedText type="title">Calendrier</ThemedText>
      <Calendar
        onDayPress={(day) => setSelectedDate(day.dateString)}
        markedDates={{
          ...Object.keys(historiqueEmotions).reduce((acc, date) => {
            acc[date] = { marked: true, dotColor: "#f78da7" };
            return acc;
          }, {} as any),
          ...(selectedDate
            ? { [selectedDate]: { selected: true, selectedColor: "#f78da7" } }
            : {}),
        }}
      />
      {selectedDate ? (
        <View style={{ width: "100%", marginTop: 12 }}>
          <TextInput
            placeholder="Ton humeur du jour"
            value={humeur}
            onChangeText={setHumeur}
            style={styles.input}
          />
          <TextInput
            placeholder="Indique un commentaire"
            value={commentaire}
            onChangeText={setCommentaire}
            style={styles.input}
          />
          <Button title="Enregistrer" onPress={saveEmotion} color="#f78da7" />
        </View>
      ) : null}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 16,
    paddingTop: 50,
  },
  input: {
    backgroundColor: "rgba(255,255,255,0.7)",
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
  },
});

export default Calendrier;
