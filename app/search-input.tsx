import SearchInputScreen from '@/screens/search-input-screen';
import { Stack } from 'expo-router';

export default function SearchInputRoute() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SearchInputScreen />
    </>
  );
}