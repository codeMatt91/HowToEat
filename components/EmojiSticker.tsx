import { View } from "react-native";
import {
  Image,
  type ImageSource,
} from "expo-image";
import {
  Gesture,
  GestureDetector,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

type Props = {
  imageSize: number;
  stickerSource: ImageSource;
};

export default function EmojiSticker({
  imageSize,
  stickerSource,
}: Props) {
  const scaleImage = useSharedValue(imageSize);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  // Funzione per gestire il resize al doppio tocco
  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onStart(() => {
      if (scaleImage.value !== imageSize * 2) {
        scaleImage.value = scaleImage.value * 2;
      } else {
        scaleImage.value = Math.round(
          scaleImage.value / 2
        );
      }
    });

  // Funzione che sfrutta l'hook della libreria per modificare la grandezza dell'immagine
  const imageStyle = useAnimatedStyle(() => {
    return {
      width: withSpring(scaleImage.value),
      height: withSpring(scaleImage.value),
    };
  });

  // Sfruttiamo la funzione Pan() e onChange() per modificare i valori della posizione dell'immagine man mano che la spostiamo nello spazio
  const drag = Gesture.Pan().onChange((event) => {
    translateX.value += event.changeX;
    translateY.value += event.changeY;
    // console.log(
    //   "🚀 ~ drag ~ translateX.value:",
    //   translateX.value
    // );
    // console.log(
    //   "🚀 ~ drag ~ translateY.value:",
    //   translateY.value
    // );
  });

  // Applichiamo la posizione aggiornata dell'immagine usando l'hook useAnimatedStyle()
  const containerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
        {
          translateY: translateY.value,
        },
      ],
    };
  });

  return (
    <GestureDetector gesture={drag}>
      <Animated.View
        style={[containerStyle, { top: -350 }]}
      >
        <GestureDetector gesture={doubleTap}>
          <Animated.Image
            source={stickerSource}
            resizeMode="contain"
            style={[
              imageStyle,
              {
                width: imageSize,
                height: imageSize,
              },
            ]}
          />
        </GestureDetector>
      </Animated.View>
    </GestureDetector>
  );
}
