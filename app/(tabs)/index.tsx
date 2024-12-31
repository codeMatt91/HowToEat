import { View, StyleSheet } from "react-native";
import * as imagePicker from "expo-image-picker";
import { useState } from "react";
import { type ImageSource } from "expo-image";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { Image } from "expo-image";
import Button from "@/components/Buttons";
import IconButton from "@/components/IconButton";
import CircleButton from "@/components/CircleButton";
import EmojiPicker from "@/components/EmojiPicker";
import EmojiList from "@/components/EmojiList";
import EmojiSticker from "@/components/EmojiSticker";

const PlaceholderImage = require("@/assets/images/react-logo.png");

export default function Index() {
  //Immagine selezionata
  const [selectedImage, setSelectedImage] =
    useState<string | undefined>(undefined);
  const [showAppOptions, setShowAppOptions] =
    useState<boolean>(false);
  const [pickedEmoji, setPickedEmoji] = useState<
    ImageSource | undefined
  >(undefined);

  const [isModalVisible, setIsModalVisible] =
    useState<boolean>(false);

  const onReset = () => {
    setShowAppOptions(false);
  };

  const onAddSticker = () => {
    setIsModalVisible(true);
  };

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  const onSaveImageAsync = async () => {
    // we will implement this later
  };

  // Funzione asincrona per selezionare un immagine dal telefono
  const pickImageAsync = async () => {
    let result =
      await imagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        quality: 1,
      });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setShowAppOptions(true);
      console.log(result);
    } else {
      alert("You did not select any image.");
    }
  };
  return (
    <GestureHandlerRootView
      style={styles.container}
    >
      <View style={styles.imageContainer}>
        <Image
          source={
            selectedImage ?? PlaceholderImage
          }
          style={styles.image}
        />
        {pickedEmoji && (
          <EmojiSticker
            imageSize={40}
            stickerSource={pickedEmoji}
          />
        )}
      </View>
      {showAppOptions ? (
        <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            <IconButton
              icon="refresh"
              label="Reset"
              onPress={onReset}
            />
            <CircleButton
              onPress={onAddSticker}
            />
            <IconButton
              icon="save-alt"
              label="Save"
              onPress={onSaveImageAsync}
            />
          </View>
        </View>
      ) : (
        <View style={styles.button}>
          <Button
            label="Search"
            handlePress={pickImageAsync}
          />
          <Button
            label="Use this photo"
            handlePress={() =>
              setShowAppOptions(true)
            }
          />
        </View>
      )}
      <EmojiPicker
        isVisible={isModalVisible}
        onClose={onModalClose}
      >
        <EmojiList
          onSelect={setPickedEmoji}
          onCloseModal={onModalClose}
        />
      </EmojiPicker>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#25292e",
  },

  link: {
    color: "white",
    fontSize: 20,
    padding: 10,
    borderColor: "1px solid white",
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    width: 310,
    height: 400,
    borderRadius: 18,
    objectFit: "contain",
  },
  button: {
    paddingBottom: 10,
  },
  optionsContainer: {
    position: "absolute",
    bottom: 80,
  },
  optionsRow: {
    alignItems: "center",
    flexDirection: "row",
  },
});
