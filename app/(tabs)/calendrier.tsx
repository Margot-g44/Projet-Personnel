import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { openDatabase } from "expo-sqlite";
import { useEffect, useState } from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";
import { Calendar } from "react-native-calendars";

declare module "expo-sqlite" {
  export function openDatabase(name: string): any;
}

const db = openDatabase("bienetre.db");

const Calendrier = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [humeur, setHumeur] = useState("");
  const [commentaire, setCommentaire] = useState("");
  const [historiqueEmotions, setHistoriqueEmotions] = useState<{
    [key: string]: { humeur: string; commentaire: string };
  }>({});

  // Crée la table si elle n'existe pas
  useEffect(() => {
    db.transaction((tx: any) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS emotions (
          date TEXT PRIMARY KEY NOT NULL,
          humeur TEXT,
          commentaire TEXT
        );`
      );
    });
    loadAllEmotions();
  }, []);

  // Charge toutes les émotions depuis la base
  const loadAllEmotions = () => {
    db.transaction((tx: any) => {
      tx.executeSql(
        "SELECT * FROM emotions;",
        [],
        (_tx: any, resultSet: any) => {
          const data: {
            [key: string]: { humeur: string; commentaire: string };
          } = {};
          for (let i = 0; i < resultSet.rows.length; i++) {
            const row = resultSet.rows.item(i);
            data[row.date] = {
              humeur: row.humeur,
              commentaire: row.commentaire,
            };
          }
          setHistoriqueEmotions(data);
        }
      );
    });
  };

  const saveEmotion = () => {
    if (!selectedDate) return;
    db.transaction((tx: any) => {
      tx.executeSql(
        `INSERT OR REPLACE INTO emotions (date, humeur, commentaire) VALUES (?, ?, ?)`,
        [selectedDate, humeur, commentaire],
        () => {
          setHistoriqueEmotions(
            (prev: {
              [key: string]: { humeur: string; commentaire: string };
            }) => ({
              ...prev,
              [selectedDate]: { humeur, commentaire },
            })
          );
          setHumeur("");
          setCommentaire("");
        },
        (_tx: any, error: any) => {
          console.log("Erreur lors de l'enregistrement :", error);
          return false;
        }
      );
    });
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
