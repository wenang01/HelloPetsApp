import React from 'react';
import { Text, StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import COLORS from '../../consts/colors';
import { PrimaryButton } from '../components/Button';

const OnBoardScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={{ height: 450 }}>
        <Image
          style={{
            width: '100%',
            alignItems: 'center',
            top: -30,
          }}
          source={require('../../assests/Photo_16230847363801.png')}
        />
      </View>
      <View style={style.textContainer}>
        <View>
          <Text style={{ fontSize: 35, fontWeight: 'bold', textAlign: 'center' }}>
            Welcome to HelloPet
          </Text>
          <Text
            style={{
              marginTop: 10,
              fontSize: 20,
              textAlign: 'center',
              color: COLORS.grey,
            }}>
            We help you to find best and healthcare Animals
          </Text>
        </View>
        <View style={style.indicatorContainer}></View>
        <TouchableOpacity

          onPress={() => navigation.navigate('Home')}
          title="Get Started"
        />
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  textContainer: {
    flex: 1,
    paddingHorizontal: 50,
    justifyContent: 'space-between',
    paddingBottom: 40,
  },
  indicatorContainer: {
    height: 50,
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  currentIndicator: {
    height: 12,
    width: 30,
    borderRadius: 10,
    backgroundColor: COLORS.primary,
    marginHorizontal: 5,
  },
  indicator: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: COLORS.grey,
    marginHorizontal: 5,
  },
});

export default OnBoardScreen;
