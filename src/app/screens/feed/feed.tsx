import { StyleSheet } from 'react-native';
import { useStyles } from 'react-native-unistyles';

import { type HomeTabScreenProps } from '@/app/bottom-navigation';
import { Screen } from '@/components/screen';

import FeedList from './feed-list';

interface FeedProps extends HomeTabScreenProps<'Feed'> {}

const Feed = () => {
  const { styles } = useStyles(stylesheet);

  return (
    <Screen preset='fixed' style={styles.container} safeAreaEdges={['top']}>
      <FeedList />
    </Screen>
  );
};

const stylesheet = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Feed;
