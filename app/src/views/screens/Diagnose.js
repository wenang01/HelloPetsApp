import React, { Component } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import WebView from 'react-native-webview';
import { PermissionsAndroid } from 'react-native';

export class Diagnose extends Component {

    cameraPermission = async () => {

        let granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
                title: "Camera Permission",
                message:
                    "App needs access to your camera " +
                    "so others can see you.",
                buttonNeutral: "Ask Me Later",
                buttonNegative: "Cancel",
                buttonPositive: "OK"
            }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("You can use the camera");
        } else {
            console.log("Camera permission denied");
        }
    }

    componentDidMount() {
        this.cameraPermission();
    }

    render() {
        return (
            <SafeAreaView>
                <ScrollView>
                    <View>
                        {/* <WebView
                            style={{ flex: 1 }}
                            mediaPlaybackRequiresUserAction={false}
                            domStorageEnabled={true}
                            allowsInlineMediaPlayback={true}
                            source={{ uri: 'https://diagnosepet.herokuapp.com/analyse' }}
                            startInLoadingState={true}
                            allowUniversalAccessFromFileURLs={true}
                            javaScriptEnabled={true}
                        /> */}
                        <WebView
                            userAgent={this.state.userAgent} //Set your useragent (Browser) **Very Important
                            originWhitelist={['*']}
                            allowsInlineMediaPlayback
                            bounces={true}
                            source={{
                                uri: 'https://diagnosepet.herokuapp.com/analyse', //URL of your redirect site
                            }}
                            startInLoadingState
                            scalesPageToFit
                            javaScriptEnabled={true}
                        />
                    </View>
                </ScrollView>
            </SafeAreaView>

        );
    }
}
export default Diagnose
