import { View, Text, Pressable, StyleSheet } from 'react-native';
import React from 'react';

interface PrimaryButtonProps {
    children: React.ReactNode;
    onPress: () => void;
}

function PrimaryButton({ children, onPress }: PrimaryButtonProps): React.JSX.Element {
    return (
        <View style={styles.primaryButtonOuters}>
            <Pressable style={styles.primaryButton}
                android_ripple={{ color: 'red' }}
                onPress={onPress} >
                <Text style={styles.textButton}>{children}</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    primaryButtonOuters: {
        overflow: 'hidden',
        margin: 5,
        borderRadius: 50,
    },
    primaryButton: {
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        borderWidth: 2,
        borderColor: 'black',
    },
    textButton: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
    }
});

export default PrimaryButton;
