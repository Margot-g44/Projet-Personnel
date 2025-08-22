// app/(tabs)/JournalScreen.tsx
import ThoughtsEditor from "@/components/ThoughtsEditor";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BookOpen } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

type JournalEntry = {
  date: string;
  text: string;
};

export default function Journal() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);

  useEffect(() => {
    const loadEntries = async () => {
      try {
        const savedEntries = await AsyncStorage.getItem("journalEntries");
        if (savedEntries) {
          setEntries(JSON.parse(savedEntries));
        }
      } catch (error) {
        console.error("Erreur lors du chargement :", error);
      }
    };
    loadEntries();
  }, []);

  const addEntry = async (text: string) => {
    const newEntry = {
      date: new Date().toLocaleDateString(),
      text,
    };
    const updatedEntries = [newEntry, ...entries];
    setEntries(updatedEntries);
    try {
      await AsyncStorage.setItem("journalEntries", JSON.stringify(updatedEntries));
    } catch (error) {
      console.error("Erreur lors de la sauvegarde :", error);
    }
  };

  return (
      <View style={styles.container}>
      {/* HEADER CENTRÉ */}
      <View style={styles.header}>
        <BookOpen size={48} color="#4A5568" />
        <Text style={styles.headerText}>Journal</Text>
      </View>


      {/* Zone de texte + bouton */}
      <ThoughtsEditor onSave={addEntry} />

      {/* Liste des entrées */}
      <FlatList
        data={entries}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.entry}>
            <Text style={styles.entryDate}>{item.date}</Text>
            <Text style={styles.entryText}>{item.text}</Text>
            </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  header: { alignItems: "center", marginBottom: 16 },
  headerText: { fontSize: 22, fontWeight: "bold", marginTop: 8, color: "#333" },
  entry: { padding: 12, borderBottomWidth: 1, borderBottomColor: "#eee" },
  entryDate: { fontWeight: "bold", marginBottom: 4, color: "#555" },
  entryText: { fontSize: 16, color: "#333" },
});