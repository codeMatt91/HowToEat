import {
  StyleSheet,
  View,
  Pressable,
  Text,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
("expo-linear-gradient");

type Props = {
  label: string;
  handlePress?: () => void;
};

export default function Button({
  label,
  handlePress,
}: Props) {
  return (
    <View style={styles.buttonContainer}>
      <Pressable
        style={({ pressed }) => [
          styles.button,
          pressed
            ? styles.buttonPressed
            : styles.buttonNotPressed,
        ]}
        onPress={handlePress}
      >
        {/* <LinearGradient
          colors={[
            "#4c669f",
            "#3b5998",
            "#192f5d",
          ]}
          start={{ x: 1, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradient}
        > */}
        <Text style={styles.buttonLabel}>
          {label}
        </Text>
        {/* </LinearGradient> */}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: 320,
    height: 68,
    marginHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    padding: 3,
  },
  button: {
    borderRadius: 10,
    borderColor: "#ffd33d",
    borderWidth: 2,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    // shadowColor: "#ffd33d",
    // shadowOffset: { width: 0, height: 0 }, // Posizione dell'ombra
    // shadowOpacity: 0.3, // Trasparenza dell'ombra
    // shadowRadius: 10, // Raggio dell'ombra
    // backgroundColor: "#25292e",
  },
  buttonLabel: {
    color: "#ffd33d",
    fontSize: 16,
  },
  buttonPressed: {
    // Quando il bottone è premuto
    shadowOffset: { width: 0, height: 0 }, // Ombra più piccola e più vicina
    shadowOpacity: 0,
    elevation: 2, // Elevazione più bassa
    transform: [{ translateY: 4 }], // Quando premuto, il bottone si abbassa
  },
  buttonNotPressed: {
    // Stato normale, nessun cambiamento
    transform: [{ translateY: 0 }], // Il bottone torna alla posizione originale
  },
  gradient: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
