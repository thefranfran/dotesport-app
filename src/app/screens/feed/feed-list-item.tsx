import { subDays, formatDistance } from 'date-fns';
import { memo } from 'react';
import { View, type TextStyle, type ViewStyle } from 'react-native';

import AutoImage from '@/components/auto-image';
import { Flex, Row, Stack } from '@/components/layout';
import Text from '@/components/text';
import { type Feed } from '@/types';
import { radius, spacing } from '@/ui';

const MAX_HEIGHT = 200;
const MAX_WIDTH = 200;

interface FeedListItemProps extends Feed {
  currentFontSize: number;
}

const FeedListItem = ({
  image,
  blurhash,
  title,
  type,
  posted_at,
  description,
  currentFontSize,
}: FeedListItemProps) => {
  return (
    <Flex flex={1}>
      <Row align='center' style={$item} gap={spacing.lg}>
        <AutoImage
          source={{
            uri: image,
            blurhash,
          }}
          style={$image}
          cachePolicy='none'
          maxWidth={MAX_WIDTH * currentFontSize}
          placeholder={{
            blurhash,
            height: MAX_HEIGHT * currentFontSize,
            width: MAX_WIDTH * currentFontSize,
          }}
        />
        <FeedListItem.Content
          title={title}
          description={description}
          posted_at={posted_at}
          type={type}
        />
      </Row>
    </Flex>
  );
};

FeedListItem.Content = ({
  title,
  description,
  type,
  posted_at,
}: {
  title: string;
  description: string;
  type: string;
  posted_at: string;
}) => {
  return (
    <Stack gap={spacing.md}>
      <Text preset='subheading' size='sm' numberOfLines={1} style={$title}>
        {title}
      </Text>
      <Text preset='default' size='xs' numberOfLines={2} style={$description}>
        {description}
      </Text>
      <Row align='center' justify='space-between'>
        <View style={$label}>
          <Text preset='default' size='xxs'>
            {type.toUpperCase()}
          </Text>
        </View>
        <Text preset='bold' size='xs'>
          {formatDistance(subDays(new Date(posted_at), 3), new Date(), {
            addSuffix: true,
          })}
        </Text>
      </Row>
    </Stack>
  );
};

const $image = {
  borderRadius: radius.sm,
} satisfies ViewStyle;

const $label = {
  borderRadius: radius.sm,
  paddingVertical: spacing.sm,
  paddingHorizontal: spacing.lg,
  backgroundColor: 'rgba(0, 0, 0, 0.1)',
} satisfies ViewStyle;

const $title = {
  maxWidth: 200,
} satisfies TextStyle;

const $description = {
  maxWidth: 200,
} satisfies TextStyle;

const $item = {
  marginBottom: spacing.xl,
} satisfies ViewStyle;

export default memo(FeedListItem, (prev, next) => {
  return prev.currentFontSize === next.currentFontSize;
});
