import { memo } from 'react';
import { TextInput } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Flex } from '@/components/layout';

interface FeedHeaderProps {
  search: string;
  setSearch: (search: string) => void;
}

const FeedHeader = (props: FeedHeaderProps) => {
  const { search, setSearch } = props;

  const { styles } = useStyles(stylesheet);
  return (
    <Flex gap={12} style={styles.container}>
      <TextInput
        placeholder='Search by title'
        value={search}
        onChangeText={setSearch}
        style={styles.input}
      />
    </Flex>
  );
};

const stylesheet = createStyleSheet((theme) => ({
  container: {
    paddingHorizontal: theme.spacing.xl,
    marginBottom: theme.spacing.xl,
  },
  input: {
    padding: 10,
    borderColor: '#000',
    borderRadius: 16,
    borderWidth: 1,
  },
}));

export default memo(FeedHeader, (prev, next) => {
  return prev.search === next.search;
});
