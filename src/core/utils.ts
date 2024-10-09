import { Linking } from 'react-native';

export function openLinkInBrowser(url: string) {
  Linking.canOpenURL(url).then((canOpen) => canOpen && Linking.openURL(url));
}

export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
