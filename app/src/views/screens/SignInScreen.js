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
import HomeScreen from './HomeScreen';
import OnBoardScreen from './OnBoardScreen';

const initialState = {
  email: '',
  password: '',
  errors: '',
  isAuthorized: false,
  isLoading: false,
  userData: undefined,
};
class SignInScreen extends Component {
  state = initialState;

  componentWillUnmount() { }

  onEmailChange = (email) => {
    this.setState({ email });
  };

  onPasswordChange = (password) => {
    this.setState({ password });
  };

  onPressLogin() {
    const { email, password } = this.state;
    const payload = { email, password };
    console.log(payload);

    const onSuccess = ({ data }) => {
      // Set JSON Web Token on success
      setClientToken(data.accessToken);
      this.setState({ isLoading: false, isAuthorized: true, userData: data });
      this.props.navigation.navigate('Consultation')
    };

    const onFailure = (error) => {
      console.log(error && error.response);
      this.setState({
        errors: 'error! email and pass not match',
        isLoading: false,
      });
    };

    // Show spinner when call is made
    this.setState({ isLoading: true });

    APIKit.post('/api/auth/signin/', payload).then(onSuccess).catch(onFailure);
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

  getErrorMessageByField(email) {
    // Checks for error message in specified field
    // Shows error message from backend
    let message = null;
    if (this.state.errors[email]) {
      message = (
        <View style={styles.errorMessageContainerStyle}>
          {this.state.errors[email].map((item) => (
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
                style={{
                  fontSize: 27,
                  fontWeight: 'bold',
                  color: COLORS.dark,
                }}>
                Welcome Back,
              </Text>
              <Text
                style={{
                  fontSize: 19,
                  fontWeight: 'bold',
                  color: COLORS.light,
                }}>
                Sign in to continue
              </Text>
            </View>

            <View style={{ marginTop: 10 }}>
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
              <Text>{this.state.errors}</Text>
              {/* {this.getErrorMessageByField('email')} */}
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
              <Text>{this.state.errors}</Text>
              {/* {this.getErrorMessageByField('password')}

              {this.getNonFieldErrorMessage()} */}

              <View style={STYLES.btnPrimary}>
                <TouchableOpacity onPress={this.onPressLogin.bind(this)}>
                  <Text
                    style={{ color: '#fff', fontWeight: 'bold', fontSize: 18 }}>
                    Sign In
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  marginVertical: 10,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View style={STYLES.line}></View>
                <Text style={{ marginHorizontal: 5, fontWeight: 'bold' }}>
                  OR
                </Text>
                <View style={STYLES.line}></View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View style={STYLES.btnSecondary}>
                  <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
                    Sign in with
                  </Text>
                  <Image
                    style={STYLES.btnImage}
                    source={require('../../assests/facebook.png')}
                  />
                </View>
                <View style={{ width: 10 }}></View>
                <View style={STYLES.btnSecondary}>
                  <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
                    Sign in with
                  </Text>
                  <Image
                    style={STYLES.btnImage}
                    source={require('../../assests/google.png')}
                  />
                </View>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'flex-end',
                justifyContent: 'center',
                marginTop: 20,
                marginBottom: 20,
              }}>
              <Text style={{ color: COLORS.light, fontWeight: 'bold' }}>
                Don`t have an account ?
              </Text>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('SignUp')}>
                <Text style={{ color: COLORS.pink, fontWeight: 'bold' }}>
                  Sign up
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        ) : (
          <View>
            {/* <OnBoardScreen /> */}
            < HomeScreen />
          </View>
        )}
      </SafeAreaView>
    );
  }
}

const styles = {
  errorMessageContainerStyle: {
    marginBottom: 8,
    backgroundColor: '#fee8e6',
    padding: 8,
    borderRadius: 4,
  },
  errorMessageTextStyle: {
    color: '#db2828',
    textAlign: 'center',
    fontSize: 12,
  },
};

export default SignInScreen;
