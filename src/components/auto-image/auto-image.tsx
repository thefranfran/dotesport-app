import { Image as ExpoImage, type ImageSource } from 'expo-image';
import { useLayoutEffect, useState } from 'react';
import { Image, Platform } from 'react-native';

import { type AutoImageProps } from './auto-image.props';

function useAutoImage(
  remoteUri: string,
  dimensions?: [maxWidth?: number, maxHeight?: number],
): [width: number, height: number] {
  const [[remoteWidth, remoteHeight], setRemoteImageDimensions] = useState([
    0, 0,
  ]);
  const remoteAspectRatio = remoteWidth / remoteHeight;
  const [maxWidth, maxHeight] = dimensions ?? [];

  useLayoutEffect(() => {
    if (!remoteUri) {
      return;
    }

    Image.getSize(remoteUri, (w, h) => {
      setRemoteImageDimensions([w, h]);
    });
  }, [remoteUri]);

  if (Number.isNaN(remoteAspectRatio)) return [0, 0];

  if (maxWidth && maxHeight) {
    const aspectRatio = Math.min(
      maxWidth / remoteWidth,
      maxHeight / remoteHeight,
    );
    return [remoteWidth * aspectRatio, remoteHeight * aspectRatio];
  } else if (maxWidth) {
    return [maxWidth, maxWidth / remoteAspectRatio];
  } else if (maxHeight) {
    return [maxHeight * remoteAspectRatio, maxHeight];
  } else {
    return [remoteWidth, remoteHeight];
  }
}

export default function AutoImage(props: AutoImageProps) {
  const { maxWidth, maxHeight, ...ImageProps } = props;
  const source = props.source as ImageSource;

  const [width, height] = useAutoImage(
    Platform.select({
      web: (source?.uri as string) ?? (source as string),
      default: source?.uri as string,
    }),
    [maxWidth, maxHeight],
  );

  return <ExpoImage {...ImageProps} style={[{ width, height }, props.style]} />;
}
