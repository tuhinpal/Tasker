import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

function Task(props) {
    return (
        <View style={styles.taskbox}>
            <View style={styles.bigrec}>
                <Text style={styles.number}>{props.num}</Text>
            </View>
            <Text style={styles.tasktext}>{props.text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    taskbox: {
        minHeight: 68,
        backgroundColor: '#f0ebeb',
        padding: 10,
        borderRadius: 17,
        marginBottom: 13,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center'
    },
    bigrec: {
        width: 25,
        height: 25,
        borderColor: '#f2aa4c',
        borderWidth: 1.9,
        borderRadius: 10,
        marginLeft: 9,
        alignItems: 'center',
        justifyContent: 'center'
    },
    tasktext: {
        width: '83%',
        paddingRight: 10,
        fontFamily: 'sans-serif-light',
    },
    number: {
        fontFamily: 'notoserif',
        fontSize: 8,
    }
});

export default Task