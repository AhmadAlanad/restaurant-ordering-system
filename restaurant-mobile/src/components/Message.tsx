import { Pressable, Text, View } from 'react-native';

type MessageType = 'success' | 'error' | 'warning';

type MessageProps = {
  visible: boolean;
  type: MessageType;
  message: string;
  onClose: () => void;
};

export default function Message({
  visible,
  type,
  message,
  onClose,
}: MessageProps) {
  if (!visible) {
    return null;
  }

  const getContainerStyle = () => {
    switch (type) {
      case 'success':
        return {
          backgroundColor: '#d1e7dd',
          borderColor: '#0f5132',
        };

      case 'error':
        return {
          backgroundColor: '#f8d7da',
          borderColor: '#842029',
        };

      case 'warning':
        return {
          backgroundColor: '#fff3cd',
          borderColor: '#856404',
        };
    }
  };

  const getTextStyle = () => {
    switch (type) {
      case 'success':
        return '#0f5132';

      case 'error':
        return '#842029';

      case 'warning':
        return '#856404';
    }
  };

  return (
    <View
      style={[
        {
          padding: 14,
          borderRadius: 10,
          borderWidth: 1,
          marginBottom: 15,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        },
        getContainerStyle(),
      ]}
    >
      <Text
        style={{
          flex: 1,
          fontSize: 14,
          fontWeight: '600',
          color: getTextStyle(),
        }}
      >
        {message}
      </Text>

      <Pressable onPress={onClose}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: '700',
            marginLeft: 10,
            color: getTextStyle(),
          }}
        >
          ×
        </Text>
      </Pressable>
    </View>
  );
}