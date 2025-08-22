import React, { useState } from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";

type ThoughtsEditorProps = {
  onSave: (text: string) => void;
};

export default function ThoughtsEditor({ onSave }: ThoughtsEditorProps) {
  const [text, setText] = useState("");

  const handleSave = () => {
    if (text.trim().length > 0) {
      onSave(text);
      setText(""); // reset après sauvegarde
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Écris tes pensées..."
        value={text}
        onChangeText={setText}
        multiline
      />
      <Button title="Sauvegarder" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
    minHeight: 60,
  },
});
