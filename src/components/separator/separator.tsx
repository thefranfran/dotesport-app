import { View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Row } from '@/components/layout';
import Text from '@/components/text';

import { type SeparatorProps } from './separator.props';

const Separator = (props: SeparatorProps) => {
  const { styles } = useStyles(stylesheet);
  return (
    <View {...props} style={[styles.container, props.style]}>
      <Row align='center'>
        <View style={styles.line} />
        <Text style={styles.content} size='xs'>
          OR
        </Text>
        <View style={styles.line} />
      </Row>
    </View>
  );
};

const stylesheet = createStyleSheet((theme) => ({
  container: {
    marginVertical: theme.spacing.lg,
  },
  content: {
    marginHorizontal: theme.spacing.xl,
  },
  line: {
    height: 1,
    flex: 1,
    backgroundColor: theme.colors.palette.neutral700,
  },
}));

export default Separator;
