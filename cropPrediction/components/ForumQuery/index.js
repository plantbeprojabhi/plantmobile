//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// create a component
class ForumQuery extends Component {
    render() {
        const { navigation } = this.props;
        const forumId = navigation.getParam('forumId',0 );
        return (
            <View style={styles.container}>
                <Text>{forumId}</Text>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});

//make this component available to the app
export default ForumQuery;
