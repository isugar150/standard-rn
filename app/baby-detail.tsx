import { Stack } from 'expo-router';
import BabyDetailScreen from '@/screens/baby-detail-screen';

export default function BabyDetailRoute() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <BabyDetailScreen />
    </>
  );
}