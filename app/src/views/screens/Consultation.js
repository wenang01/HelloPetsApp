import React, { Component } from 'react'
import { SafeAreaView, StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { FlatList, TextInput, TouchableHighlight } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../consts/colors';
import biodata from '../../consts/biodata';
import APIKit, { setClientToken } from '../../router/APIKit';

import { CometChat } from '@cometchat-pro/react-native-chat';
import { CometChatUI } from '../../cometchat-pro-react-native-ui-kit/src';
import { COMETCHAT_CONSTANTS } from '../../consts/CONSTS';

export class Consultation extends Component {

    componentDidMount() {
        var appID = COMETCHAT_CONSTANTS.APP_ID;
        var region = COMETCHAT_CONSTANTS.REGION;
        var appSetting = new CometChat.AppSettingsBuilder().subscribePresenceForAllUsers().setRegion(region).build();
        CometChat.init(appID, appSetting).then(
            () => {
                console.log("Initialization completed successfully");
                // You can now call login function.
                var UID = "SUPERHERO1";
                var authKey = COMETCHAT_CONSTANTS.AUTH_KEY;

                CometChat.login(UID, authKey).then(
                    user => {
                        console.log("Login Successful:", { user });
                    },
                    error => {
                        console.log("Login failed with exception:", { error });
                    }
                );
            },
            error => {
                console.log("Initialization failed with error:", error);
                // Check the reason for error and take appropriate action.
            }
        );

    }
    chat = []
    render() {
        return (
            <View style={{ flex: 1 }}>
                < CometChatUI />
            </View>
        )
    }
}

export default Consultation

const style = StyleSheet.create({
    inputContainer: {
        marginHorizontal: 20,
        marginBottom: 10,
        height: 50,
        borderRadius: 10,
        flexDirection: 'row',
        backgroundColor: COLORS.light,
        alignItems: 'center',
        paddingHorizontal: 40,
    },
    header: {
        paddingVertical: 30,
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 20,
    },
    cartCard: {
        height: 100,
        elevation: 15,
        borderRadius: 10,
        backgroundColor: COLORS.white,
        marginVertical: 10,
        marginHorizontal: 20,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    actionBtn: {
        width: 60,
        height: 30,
        backgroundColor: COLORS.primary,
        borderRadius: 20,
        justifyContent: 'center',

    },
});