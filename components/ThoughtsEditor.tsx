import React, { useState } from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";

export default function ThoughtsEditor() {
  // state pour stocker la pensée en cours
  const [thought, setThought] = useState("");

  // fonction pour "sauvegarder" la pensée (ici juste un console.log pour l'instant)
  const handleSave = () => {
    console.log("Pensée enregistrée :", thought);
    // plus tard tu pourras stocker ça dans AsyncStorage ou une base
    setThought(""); // on vide la zone de texte après la sauvegarde
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder="Écris tes pensées ici..."
        value={thought}
        onChangeText={setThought}
        multiline
      />
      <Button title="Sauvegarder" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 16,
    padding: 12,
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
  },
  textInput: {
    height: 120,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    textAlignVertical: "top", // pour que le texte commence en haut
  },
});
