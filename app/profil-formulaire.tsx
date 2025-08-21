
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useState } from "react";
import { Alert, Button, TextInput } from "react-native";

export default function ProfilFormulaire() {
const [prénom, setPrénom] = useState('');
const [objectif, setObjectif] = useState('');

 const maFonctionPourValider = () => {
    console.log("Prénom :", prénom);
    console.log("Objectif :", objectif);
    Alert.alert("Informations enregistrées", `Prénom : ${prénom}\nObjectif : ${objectif}`);
  };

  return (
    <ThemedView>
      <ThemedText>Renseigne tes informations</ThemedText>
      <TextInput placeholder="Quel est ton prénom ?" value={prénom} onChangeText={setPrénom} />
      <TextInput placeholder="Quel est ton objectif ?" value={objectif} onChangeText={setObjectif} />
      <Button title="Valider" onPress={maFonctionPourValider} />
    </ThemedView>
  );
}   






   
 


