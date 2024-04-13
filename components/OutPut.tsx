import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

interface OutPutPropsProps {
    children: React.ReactNode;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function OutPut({ children }: OutPutPropsProps): React.JSX.Element {
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
        // backgroundColor: 'lightgray',
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

export default OutPut;