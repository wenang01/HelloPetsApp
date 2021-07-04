import React, { Component } from 'react'
import { SafeAreaView, StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { FlatList, TextInput, TouchableHighlight } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../consts/colors';
import biodata from '../../consts/biodata';
import APIKit, { setClientToken } from '../../router/APIKit';
import globaldata from '../../../../globaldata';

import { CometChat } from '@cometchat-pro/react-native-chat';
import { CometChatUI, CometChatMessages } from '../../cometchat-pro-react-native-ui-kit/src';
import { COMETCHAT_CONSTANTS } from '../../consts/CONSTS';
import CometChatManager from '../../cometchat-pro-react-native-ui-kit/src/utils/controller';

const Consultation = ({ navigation, route }) => {
    // const data = route.params;
    // console.log("<<<<<<<<<<<<<<<<data>>>>>>>>>>>>>>>")
    // console.log(data)

    const currentUser = globaldata.currentUser
    console.log("<<<<<<<<<<<<<<<<user for chat>>>>>>>>>>>>>>>")
    console.log(currentUser)


    var appID = COMETCHAT_CONSTANTS.APP_ID;
    var region = COMETCHAT_CONSTANTS.REGION;
    var appSetting = new CometChat.AppSettingsBuilder().subscribePresenceForAllUsers().setRegion(region).build();
    CometChat.init(appID, appSetting).then(
        () => {
            console.log("Initialization completed successfully");
            // You can now call login function.
            var UID = currentUser.username;
            var authKey = COMETCHAT_CONSTANTS.AUTH_KEY;

            CometChat.login(UID, authKey).then(
                user => {
                    console.log("Login Successful:", { user });
                },
                error => {
                    console.log("Login failed with exception:", { error });
                }
            );
            // CometChat.RECEIVER_TYPE.USER
            // CometChat.
        },
        error => {
            console.log("Initialization failed with error:", error);
            // Check the reason for error and take appropriate action.
        }
    );

    return (
        <View style={{ flex: 1 }}>
            < CometChatUI />
            {/* <CometChatMessages /> */}
        </View>
    )
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

// export class Consultation extends Component {
//     item = this.props.item
//     constructor(props) {
//         super(props)
//         this.state = {

//         }
//     }

//     getUser() {
//         APIKit.get().then(
//             response => {
//                 console.log(response)
//             }
//         ).catch(
//             error => {
//                 console.log(error.response);
//             }

//         )
//     }

//     getDokter() {

//     }

//     componentDidMount() {
//         console.log("<<<<<<<<item>>>>>>>>>>>");
//         // console.log(this.state.item);
//         console.log(this.item)
//         this.getUser()
//         var appID = COMETCHAT_CONSTANTS.APP_ID;
//         var region = COMETCHAT_CONSTANTS.REGION;
//         var appSetting = new CometChat.AppSettingsBuilder().subscribePresenceForAllUsers().setRegion(region).build();
//         CometChat.init(appID, appSetting).then(
//             () => {
//                 console.log("Initialization completed successfully");
//                 // You can now call login function.
//                 var UID = "SUPERHERO1";
//                 var authKey = COMETCHAT_CONSTANTS.AUTH_KEY;

//                 CometChat.login(UID, authKey).then(
//                     user => {
//                         console.log("Login Successful:", { user });
//                     },
//                     error => {
//                         console.log("Login failed with exception:", { error });
//                     }
//                 );
//             },
//             error => {
//                 console.log("Initialization failed with error:", error);
//                 // Check the reason for error and take appropriate action.
//             }
//         );

//     }
//     render() {
//         return (
//             <View style={{ flex: 1 }}>
//                 < CometChatUI />
//             </View>
//         )
//     }
// }

// export default Consultation