import { type HomeTabScreenProps } from '@/app/bottom-navigation';
import { Screen } from '@/components/screen';

import Feed from './feed';

interface FeedProviderProps extends HomeTabScreenProps<'Feed'> {}

export const FeedProvider = (props: FeedProviderProps) => {
  return <Feed {...props} />;
};
