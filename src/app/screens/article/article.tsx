import { View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { WebView } from 'react-native-webview';

import { FocusAwareStatusBar } from '@/ui';

const Article = ({ route }) => {
  const { url } = route.params;
  const { styles } = useStyles(stylesheet);

  return (
    <View style={styles.container}>
      <FocusAwareStatusBar barStyle='light-content' />
      <WebView
        style={styles.container}
        cacheMode='LOAD_CACHE_ELSE_NETWORK'
        source={{ uri: url }}
      />
    </View>
  );
};

const stylesheet = createStyleSheet(() => ({
  container: {
    flex: 1,
  },
}));

export default Article;
