import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

interface OutPutPropsProps {
    children: React.ReactNode;
    textColor?: string; // Thêm prop textColor, có thể không được chỉ định
}

function OutPut({ children, textColor = 'white' }: OutPutPropsProps): React.JSX.Element {
    return (
        <View style={styles.titleText}>
            <Text style={[styles.fortTitle, { color: textColor }]}>{children}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    titleText: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        marginTop: 10,
        marginHorizontal: 30,
    },
    fortTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    }
});

export default OutPut;
