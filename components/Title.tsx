import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

interface TitleProps {
    children: React.ReactNode;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function Title({ children }: TitleProps): React.JSX.Element {
    return (
        <View style={styles.titleText}>
            <Text style={styles.fortTitle}> {children}</Text>
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
        color: 'white',
    }
});

export default Title;