import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { THEME } from '@/lib/theme';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetTextInput,
  BottomSheetView,
  type BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet';
import { useColorScheme } from 'nativewind';
import * as React from 'react';
import { View } from 'react-native';

export type CreatePostSheetRef = React.ComponentRef<typeof BottomSheetModal>;

export type CreatePostValues = {
  title: string;
  body: string;
};

type CreatePostSheetProps = {
  onSubmit?: (values: CreatePostValues) => void;
};

export const CreatePostSheet = React.forwardRef<CreatePostSheetRef, CreatePostSheetProps>(
  function CreatePostSheet({ onSubmit }, ref) {
    const { colorScheme } = useColorScheme();
    const theme = THEME[colorScheme ?? 'light'];
    const innerRef = React.useRef<CreatePostSheetRef>(null);
    const [title, setTitle] = React.useState('');
    const [body, setBody] = React.useState('');

    React.useImperativeHandle(ref, () => innerRef.current as CreatePostSheetRef, []);

    const renderBackdrop = React.useCallback(
      (props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} opacity={0.5} />
      ),
      []
    );

    const resetForm = React.useCallback(() => {
      setTitle('');
      setBody('');
    }, []);

    const handleCancel = React.useCallback(() => {
      innerRef.current?.dismiss();
    }, []);

    const handleSubmit = React.useCallback(() => {
      const trimmedTitle = title.trim();
      const trimmedBody = body.trim();
      if (!trimmedTitle && !trimmedBody) return;

      onSubmit?.({ title: trimmedTitle, body: trimmedBody });
      innerRef.current?.dismiss();
    }, [title, body, onSubmit]);

    return (
      <BottomSheetModal
        ref={innerRef}
        enableDynamicSizing
        keyboardBehavior="interactive"
        keyboardBlurBehavior="restore"
        android_keyboardInputMode="adjustResize"
        onDismiss={resetForm}
        backdropComponent={renderBackdrop}
        backgroundStyle={{ backgroundColor: theme.card }}
        handleIndicatorStyle={{ backgroundColor: theme.mutedForeground }}>
        <BottomSheetView className="gap-4 px-6 pb-10 pt-2">
          <Text variant="h4">글 작성</Text>

          <View className="gap-1.5">
            <Text className="text-muted-foreground text-sm">제목</Text>
            <BottomSheetTextInput
              value={title}
              onChangeText={setTitle}
              placeholder="제목을 입력하세요"
              placeholderTextColor={theme.mutedForeground}
              className="border-input bg-background text-foreground h-11 rounded-md border px-3 text-base"
            />
          </View>

          <View className="gap-1.5">
            <Text className="text-muted-foreground text-sm">내용</Text>
            <BottomSheetTextInput
              value={body}
              onChangeText={setBody}
              placeholder="내용을 입력하세요"
              placeholderTextColor={theme.mutedForeground}
              multiline
              textAlignVertical="top"
              className="border-input bg-background text-foreground min-h-32 rounded-md border px-3 py-2 text-base"
            />
          </View>

          <View className="flex-row justify-end gap-2 pt-2">
            <Button variant="outline" onPress={handleCancel}>
              <Text>취소</Text>
            </Button>
            <Button onPress={handleSubmit}>
              <Text>등록</Text>
            </Button>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    );
  }
);
