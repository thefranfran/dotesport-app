import React from 'react';
import { Switch, type ViewStyle } from 'react-native';

import { Flex, Row, Stack } from '@/components/layout';
import Text from '@/components/text';
import { spacing } from '@/ui';

type SettingRowProps = {
  title: string;
  description: string;
  value: boolean;
  onToggle: () => void;
};

const OnboardingSetting = React.memo(
  ({ title, description, value, onToggle }: SettingRowProps) => {
    return (
      <Row style={$settings} align='center'>
        <Stack style={$heading}>
          <Text size='xl' preset='heading'>
            {title}
          </Text>
          <Text preset='formHelper'>{description}</Text>
        </Stack>
        <Flex align='flex-end' flex={1}>
          <Switch
            value={value}
            trackColor={{ false: '#fff', true: '#3995eb' }}
            thumbColor='#fff'
            onValueChange={onToggle}
          />
        </Flex>
      </Row>
    );
  },
  (prev, next) => prev.value === next.value,
);

const $settings = {
  marginBottom: spacing.xl * 2,
} satisfies ViewStyle;

const $heading = {
  maxWidth: 300,
} satisfies ViewStyle;

export default OnboardingSetting;
