import { useMemo, useState } from 'react';
import { FlatList, Pressable } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { useFontSize } from '@/core/font-scaling';
import { type Feed } from '@/types';
import { spacing } from '@/ui';

import { useFeed } from './feed.hooks';
import FeedHeader from './feed-header';
import FeedListItem from './feed-list-item';
import { useNavigation } from '@react-navigation/native';

const FeedList = () => {
  const navigation = useNavigation();
  const [search, setSearch] = useState<string>('');
  const { styles } = useStyles(stylesheet);
  const { currentFontSize } = useFontSize();
  const { data, isLoading, fetchMore } = useFeed(search);

  const articles: Feed[] = useMemo(() => {
    if (!data) return [];

    return data.pages.map((page) => page.data).flat();
  }, [data]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <FeedHeader search={search} setSearch={setSearch} />
      <FlatList
        data={articles}
        style={styles.list}
        renderItem={({ item }) => {
          return (
            <Pressable
              onPress={() => {
                navigation.navigate('Article', { url: item.url });
              }}
            >
              <FeedListItem {...item} currentFontSize={currentFontSize} />
            </Pressable>
          );
        }}
        onEndReachedThreshold={0.5}
        onEndReached={fetchMore}
        initialNumToRender={6}
        removeClippedSubviews
        maxToRenderPerBatch={6}
        windowSize={7}
        keyExtractor={(item) => item.title}
        ListEmptyComponent={() => {
          return <></>;
        }}
      />
    </>
  );
};

const stylesheet = createStyleSheet(() => ({
  list: {
    paddingHorizontal: spacing.xl,
    flex: 1,
  },
}));

export default FeedList;
