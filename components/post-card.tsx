import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import type { Post } from '@/hooks/use-posts';
import { cn } from '@/lib/utils';
import { useFavoritesStore, useIsFavorite } from '@/store/favorites-store';
import { Heart } from 'lucide-react-native';
import { Pressable, View } from 'react-native';

type PostCardProps = {
  post: Post;
  onPress: (post: Post) => void;
};

export function PostCard({ post, onPress }: PostCardProps) {
  const isFavorite = useIsFavorite(post.id);
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);

  return (
    <Pressable onPress={() => onPress(post)}>
      <Card className="active:opacity-70">
        <CardHeader className="flex-row items-start gap-3">
          <Avatar alt={`User ${post.userId}`}>
            <AvatarFallback>
              <Text className="text-xs font-medium">U{post.userId}</Text>
            </AvatarFallback>
          </Avatar>
          <View className="flex-1 gap-1.5">
            <CardTitle numberOfLines={1} className="capitalize">
              {post.title}
            </CardTitle>
            <Badge variant="secondary" className="self-start">
              <Text>Post #{post.id}</Text>
            </Badge>
          </View>
          <Pressable hitSlop={12} onPress={() => toggleFavorite(post.id)} className="p-1">
            <Icon
              as={Heart}
              size={18}
              className={cn(isFavorite ? 'text-destructive' : 'text-muted-foreground')}
              fill={isFavorite ? 'currentColor' : 'none'}
            />
          </Pressable>
        </CardHeader>
        <CardContent>
          <Text numberOfLines={2} className="text-muted-foreground text-sm capitalize">
            {post.body}
          </Text>
        </CardContent>
      </Card>
    </Pressable>
  );
}
