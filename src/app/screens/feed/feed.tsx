import { useMemo, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

import { type HomeTabScreenProps } from '@/app/bottom-navigation';

interface FeedProps extends HomeTabScreenProps<'Feed'> {}

const Feed = (props: FeedProps) => {
  return null;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Feed;
