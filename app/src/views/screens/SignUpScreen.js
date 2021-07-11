import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaView, View, Text, TextInput, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../consts/color';
import STYLES from '../../styles';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Component } from 'react';
import APIKit, { setClientToken } from '../../router/APIKit';
import Spinner from 'react-native-loading-spinner-overlay';

import { CometChat } from '@cometchat-pro/react-native-chat';
import { COMETCHAT_CONSTANTS } from '../../consts/CONSTS';

const initialState = {
  name: '',
  username: '',
  email: '',
  password: '',
  roles: 'user',
  errors: {},
  isAuthorized: false,
  isLoading: false,
};
class SignUpScreen extends Component {
  state = initialState;

  componentWillUnmount() {
  }

  onNameChange = (name) => {
    this.setState({ name });
  };

  onUsernameChange = (username) => {
    this.setState({ username });
  };

  onEmailChange = (email) => {
    this.setState({ email });
  };

  onPasswordChange = (password) => {
    this.setState({ password });
  };

  onRolesChange = () => {
    this.setState({ roles });
  };

  onPressLogin() {
    const { name, username, email, password, roles } = this.state;
    const payload = { name, username, email, password, roles };
    console.log(payload);

    const onSuccess = ({ data }) => {
      // Set JSON Web Token on success
      setClientToken(data.accessToken);
      this.setState({ isLoading: false, isAuthorized: true });
    };

    const onFailure = (error) => {
      console.log(error && error.response);
      this.setState({ errors: error.response.data, isLoading: false });
    };

    // Show spinner when call is made
    this.setState({ isLoading: true });

    APIKit.post('/api/auth/signup/', payload).then(onSuccess).catch(onFailure);

    // cometchat register
    var appID = COMETCHAT_CONSTANTS.APP_ID;
    var region = COMETCHAT_CONSTANTS.REGION;
    var appSetting = new CometChat.AppSettingsBuilder().subscribePresenceForAllUsers().setRegion(region).build();
    CometChat.init(appID, appSetting).then(
      () => {
        console.log("Initialization completed successfully");
        // You can now call login function.
        let authKey = COMETCHAT_CONSTANTS.AUTH_KEY;
        var uid = this.state.username;
        var name = this.state.name;

        var user = new CometChat.User(uid);

        user.setName(name);

        CometChat.createUser(user, authKey).then(
          user => {
            console.log("user created", user);
          }, error => {
            console.log("error", error);
          }
        )
      },
      error => {
        console.log("Initialization failed with error:", error);
        // Check the reason for error and take appropriate action.
      }
    );
  }

  getNonFieldErrorMessage() {
    // Return errors that are served in `non_field_errors`
    let message = null;
    const { errors } = this.state;
    if (errors.non_field_errors) {
      message = (
        <View style={styles.errorMessageContainerStyle}>
          {errors.non_field_errors.map((item) => (
            <Text style={styles.errorMessageTextStyle} key={item}>
              {item}
            </Text>
          ))}
        </View>
      );
    }
    return message;
  }

  getErrorMessageByField(field) {
    // Checks for error message in specified field
    // Shows error message from backend
    let message = null;
    if (this.state.errors[field]) {
      message = (
        <View style={styles.errorMessageContainerStyle}>
          {this.state.errors[field].map((item) => (
            <Text style={styles.errorMessageTextStyle} key={item}>
              {item}
            </Text>
          ))}
        </View>
      );
    }
    return message;
  }

  render() {
    const { isLoading } = this.state;
    return (
      <SafeAreaView
        style={{ paddingHorizontal: 20, flex: 1, backgroundColor: COLORS.white }}>
        <Spinner visible={isLoading} />
        {!this.state.isAuthorized ? (
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ flexDirection: 'row' }}>
              <Image
                style={STYLES.btnImage1}
                source={require('../../assests/hellopet.png')}
              />
            </View>
            <View style={{ marginTop: 0 }}>
              <Text
                style={{ fontSize: 27, fontWeight: 'bold', color: COLORS.dark }}>
                Welcome,
              </Text>
              <Text
                style={{ fontSize: 19, fontWeight: 'bold', color: COLORS.light }}>
                Sign up to continue
              </Text>
            </View>
            <View style={{ marginTop: 0 }}>
              <View style={STYLES.inputContainer}>
                <Icon
                  name="person-outline"
                  color={COLORS.light}
                  size={20}
                  style={STYLES.inputIcon}
                />
                <TextInput
                  placeholder="Full Name"
                  style={STYLES.input}
                  value={this.state.name}
                  maxLength={50}
                  autoCapitalize="none"
                  autoCorrect={false}
                  returnKeyType="next"
                  onSubmitEditing={() => this.username.focus()}
                  onChangeText={this.onNameChange}
                  underlineColorAndroid="transparent"
                  placeholderTextColor="#999"
                />
              </View>
              <View style={STYLES.inputContainer}>
                <Icon
                  name="person-outline"
                  color={COLORS.light}
                  size={20}
                  style={STYLES.inputIcon}
                />
                <TextInput
                  placeholder="Username"
                  style={STYLES.input}
                  ref={(node) => {
                    this.username = node;
                  }}
                  value={this.state.username}
                  maxLength={256}
                  autoCapitalize="none"
                  autoCorrect={false}
                  returnKeyType="next"
                  onSubmitEditing={() => this.email.focus()}
                  onChangeText={this.onUsernameChange}
                  underlineColorAndroid="transparent"
                  placeholderTextColor="#999"
                />
              </View>
              <View style={STYLES.inputContainer}>
                <Icon
                  name="mail-outline"
                  color={COLORS.light}
                  size={20}
                  style={STYLES.inputIcon}
                />
                <TextInput
                  placeholder="Email"
                  style={STYLES.input}
                  ref={(node) => {
                    this.email = node;
                  }}
                  value={this.state.email}
                  maxLength={256}
                  autoCapitalize="none"
                  autoCorrect={false}
                  returnKeyType="next"
                  onSubmitEditing={() => this.passwordInput.focus()}
                  onChangeText={this.onEmailChange}
                  underlineColorAndroid="transparent"
                  placeholderTextColor="#999"
                />
              </View>
              <View style={STYLES.inputContainer}>
                <Icon
                  name="lock-outline"
                  color={COLORS.light}
                  size={20}
                  style={STYLES.inputIcon}
                />
                <TextInput
                  placeholder="Password"
                  style={STYLES.input}
                  ref={(node) => {
                    this.passwordInput = node;
                  }}
                  value={this.state.password}
                  maxLength={40}
                  onChangeText={this.onPasswordChange}
                  autoCapitalize="none"
                  autoCorrect={false}
                  returnKeyType="done"
                  blurOnSubmit
                  onSubmitEditing={this.onPressLogin.bind(this)}
                  secureTextEntry
                  underlineColorAndroid="transparent"
                  placeholderTextColor="#999"
                />
              </View>
              <View style={STYLES.btnPrimary}>
                <TouchableOpacity onPress={this.onPressLogin.bind(this)}>
                  <Text
                    style={{ color: '#fff', fontWeight: 'bold', fontSize: 18 }}>
                    Sign Up
                  </Text>
                </TouchableOpacity>
              </View>
              {/* <View
                style={{
                  marginVertical: 20,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View style={STYLES.line}></View>
                <Text style={{ marginHorizontal: 5, fontWeight: 'bold' }}>
                  OR
                </Text>
                <View style={STYLES.line}></View>
              </View> */}
              {/* <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View style={STYLES.btnSecondary}>
                  <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
                    Sign up with
                  </Text>
                  <Image
                    style={STYLES.btnImage}
                    source={require('../../assests/facebook.png')}
                  />
                </View>
                <View style={{ width: 10 }}></View>
                <View style={STYLES.btnSecondary}>
                  <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
                    Sign up with
                  </Text>
                  <Image
                    style={STYLES.btnImage}
                    source={require('../../assests/google.png')}
                  />
                </View>
              </View> */}
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'flex-end',
                justifyContent: 'center',
                marginTop: 40,
                marginBottom: 20,
              }}>
              <Text style={{ color: COLORS.light, fontWeight: 'bold' }}>
                Already have an account ?
              </Text>
              <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                <Text style={{ color: COLORS.pink, fontWeight: 'bold' }}>
                  Sign in
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        ) : (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 20,
              marginBottom: 20,
            }}>
            <View>
              <Text style={{ color: COLORS.light, fontWeight: 'bold' }}>
                Congrats You Have Successfully Registered
              </Text>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('SignIn')}>
                <Text style={{ color: COLORS.pink, fontWeight: 'bold' }}>
                  Sign In
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </SafeAreaView>
    );
  }
}

export default SignUpScreen;
