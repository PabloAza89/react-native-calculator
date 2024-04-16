import type { PropsWithChildren } from 'react';
import {
  Text
} from 'react-native';
import { s } from '../styles';

function handlePress(val: any) {
  console.log("AA", val)
}

type OwnButtonP = PropsWithChildren<{
  value: string;
}>;

export function OwnButton({ value }: OwnButtonP): React.JSX.Element {
  return (
    <Text
      onPress={() => handlePress(value)}
      style={[s.ownButton]}
      adjustsFontSizeToFit={true}
      numberOfLines={1}
    >
      {value}
    </Text>
  );
}