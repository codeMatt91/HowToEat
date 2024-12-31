import {
  Pressable,
  StyleSheet,
  Text,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

type Props = {
  //significa che la proprietà icon deve essere una stringa che corrisponde a una delle chiavi di glyphMap. In altre parole, icon può essere un nome di icona valido come "home", "search", "settings"
  icon: keyof typeof MaterialIcons.glyphMap;
  label: string;
  onPress: () => void;
};

export default function IconButton({
  icon,
  label,
  onPress,
}: Props) {
  return (
    <Pressable
      style={styles.iconButton}
      onPress={onPress}
    >
      <MaterialIcons
        name={icon}
        size={24}
        color="#fff"
      />
      <Text style={styles.iconButtonLabel}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  iconButton: {
    justifyContent: "center",
    alignItems: "center",
  },
  iconButtonLabel: {
    color: "#fff",
    marginTop: 12,
  },
});
