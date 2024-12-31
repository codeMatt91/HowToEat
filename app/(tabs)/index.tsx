import { View, StyleSheet } from "react-native";
import * as imagePicker from "expo-image-picker";
import {
  useEffect,
  useRef,
  useState,
} from "react";
import { type ImageSource } from "expo-image";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as MediaLibrary from "expo-media-library";

import { Image } from "expo-image";
import Button from "@/components/Buttons";
import IconButton from "@/components/IconButton";
import CircleButton from "@/components/CircleButton";
import EmojiPicker from "@/components/EmojiPicker";
import EmojiList from "@/components/EmojiList";
import EmojiSticker from "@/components/EmojiSticker";
import { captureRef } from "react-native-view-shot";

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

  const imageRef = useRef<View>(null);

  /*
   * An app that requires sensitive information,
   * such as accessing a device's media library, has to prompt permission to allow or deny access.
   * Using usePermissions() hook from expo-media-library, we can use the permission status and requestPermission() method to ask for access
   */
  const [status, requestPermission] =
    MediaLibrary.usePermissions();

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

  /**
   *We can capture a screenshot of the view by calling the captureRef() method from react-native-view-shot inside the onSaveImageAsync() *function. It accepts an optional argument where we can pass the width and height of the screenshot capturing area.
   *The captureRef() method also returns a promise that fulfills with the screenshot's URI. We will pass this URI as a parameter to *MediaLibrary.saveToLibraryAsync() and save the screenshot to the device's media library.
   */

  const onSaveImageAsync = async () => {
    try {
      const localUri = await captureRef(
        imageRef,
        {
          height: 440,
          quality: 1,
        }
      );

      await MediaLibrary.saveToLibraryAsync(
        localUri
      );
      if (localUri) {
        alert("Saved!");
      }
    } catch (e) {
      console.log(e);
    }
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

  useEffect(() => {
    if (status === null) {
      requestPermission();
    }
  }, [status]);

  return (
    <GestureHandlerRootView
      style={styles.container}
    >
      <View style={styles.imageContainer}>
        <View ref={imageRef} collapsable={false}>
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
