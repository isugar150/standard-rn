import type { ReactElement } from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

export type TabIconAssetProps = {
  readonly color: string;
  readonly size: number;
};

export type TabIconAsset = (props: TabIconAssetProps) => ReactElement;

export function HomeOutlineIcon({ color, size }: TabIconAssetProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M3 10.6 12 3l9 7.6v8.1A2.3 2.3 0 0 1 18.7 21H5.3A2.3 2.3 0 0 1 3 18.7v-8.1Z"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9 21v-6.2c0-.99.81-1.8 1.8-1.8h2.4c.99 0 1.8.81 1.8 1.8V21"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function HomeSolidIcon({ color, size }: TabIconAssetProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        fill={color}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.71 2.69a2 2 0 0 1 2.58 0l8 6.76A2 2 0 0 1 22 10.98v7.72A3.3 3.3 0 0 1 18.7 22H5.3A3.3 3.3 0 0 1 2 18.7v-7.72a2 2 0 0 1 .71-1.53l8-6.76ZM10 22v-7.2a.8.8 0 0 1 .8-.8h2.4a.8.8 0 0 1 .8.8V22h-4Z"
      />
    </Svg>
  );
}

export function ShoppingOutlineIcon({ color, size }: TabIconAssetProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M5 8h14l1 12H4L5 8Z"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path d="M8.5 9V7a3.5 3.5 0 0 1 7 0v2" stroke={color} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}

export function ShoppingSolidIcon({ color, size }: TabIconAssetProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        fill={color}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.5 7V6a4.5 4.5 0 0 1 9 0v1H19a1 1 0 0 1 1 .92l1 12A1 1 0 0 1 20 21H4a1 1 0 0 1-1-1.08l1-12A1 1 0 0 1 5 7h2.5Zm2 0h5V6a2.5 2.5 0 0 0-5 0v1Z"
      />
    </Svg>
  );
}

export function CommunityOutlineIcon({ color, size }: TabIconAssetProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M8.5 12.2a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4Z" stroke={color} strokeWidth={2} />
      <Path
        d="M3.5 19.5v-1.3A4.2 4.2 0 0 1 7.7 14h1.6a4.2 4.2 0 0 1 4.2 4.2v1.3"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />
      <Path
        d="M14.5 5.5h4A2.5 2.5 0 0 1 21 8v2a2.5 2.5 0 0 1-2.5 2.5H17l-2.5 2v-2"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function CommunitySolidIcon({ color, size }: TabIconAssetProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path fill={color} d="M8.5 13.2a4.2 4.2 0 1 0 0-8.4 4.2 4.2 0 0 0 0 8.4ZM2.5 19.2A6.2 6.2 0 0 1 8.7 13h.6a6.2 6.2 0 0 1 6.2 6.2v.3a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1v-.3Z" />
      <Path fill={color} d="M14.5 4.5h4A3.5 3.5 0 0 1 22 8v2a3.5 3.5 0 0 1-3.5 3.5h-1.15l-3.23 2.58A1 1 0 0 1 12.5 15.3V8a3.5 3.5 0 0 1 2-3.16Z" />
    </Svg>
  );
}

export function ExperienceOutlineIcon({ color, size }: TabIconAssetProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M4 7.5h16v9H4v-9Z" stroke={color} strokeWidth={2} strokeLinejoin="round" />
      <Path d="M8 7.5v9M16 7.5v9" stroke={color} strokeWidth={2} strokeDasharray="1.5 2.5" strokeLinecap="round" />
      <Path d="m12 2 .9 2.1L15 5l-2.1.9L12 8l-.9-2.1L9 5l2.1-.9L12 2Z" stroke={color} strokeWidth={1.8} strokeLinejoin="round" />
    </Svg>
  );
}

export function ExperienceSolidIcon({ color, size }: TabIconAssetProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path fill={color} d="M3 7.5a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-9Zm5 1v7h1.5v-7H8Zm6.5 0v7H16v-7h-1.5Z" />
      <Path fill={color} d="m12 1.5 1.08 2.42L15.5 5l-2.42 1.08L12 8.5l-1.08-2.42L8.5 5l2.42-1.08L12 1.5Z" />
    </Svg>
  );
}

export function ProfileOutlineIcon({ color, size }: TabIconAssetProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx={12} cy={12} r={9} stroke={color} strokeWidth={2} />
      <Circle cx={12} cy={9} r={3} stroke={color} strokeWidth={2} />
      <Path d="M6.5 18.2c1.3-2.4 3.1-3.7 5.5-3.7s4.2 1.3 5.5 3.7" stroke={color} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}

export function ProfileSolidIcon({ color, size }: TabIconAssetProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        fill={color}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2a10 10 0 1 1 0 20 10 10 0 0 1 0-20Zm0 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm0 9.2c-2.72 0-4.9 1.48-6.24 4.08A8.97 8.97 0 0 0 12 22a8.97 8.97 0 0 0 6.24-2.72C16.9 16.68 14.72 15.2 12 15.2Z"
      />
    </Svg>
  );
}
