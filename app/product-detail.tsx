import { Stack } from 'expo-router';
import ProductDetailScreen from '@/screens/product-detail-screen';

export default function ProductDetailRoute() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ProductDetailScreen />
    </>
  );
}