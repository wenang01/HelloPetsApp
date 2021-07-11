import React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../consts/colors';
import { PrimaryButton } from '../components/Button';

const Transaksi = ({ navigation }) => {
  return (
    <SafeAreaView>
      <View style={style.Transaksi}>
        <Icon name="arrow-back-ios" size={28} />
        <Text style={style.textTransaksi}>Transaksi</Text>
      </View>
      <View style={style.Personal}>
        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
          Personal Information
        </Text>
      </View>
      <View style={style.fullName}>
        <Text> Full Name</Text>
        <TextInput style={style.inputName} placeholder="Full Name" />
      </View>
      <View style={style.email}>
        <Text> Email </Text>
        <TextInput style={style.inputEmail} placeholder="Email" />
      </View>
      <View style={style.address}>
        <Text> Address </Text>
        <TextInput style={style.inputAddress} multiline placeholder="Address" />
      </View>
      {/* <View style={style.Payment}>
        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Payment</Text>
      </View> */}
      {/* <View style={{flexDirection: 'column'}}>
        <TouchableOpacity style={style.BCA}>
          <View style={style.borderBCA}>
            <Image
              source={require('../../assets/BCA.png')}
              style={{
                height: 50,
                width: 100,
              }}
            />
          </View>
        </TouchableOpacity>
      </View> */}
      <View style={style.Button}>
        <PrimaryButton onPress={() => navigation.navigate('TransactionSuccess')} title="Buy" />
      </View>
    </SafeAreaView>
  );
};
const style = StyleSheet.create({
  Transaksi: {
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  textTransaksi: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  Personal: {
    paddingTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 35,
  },
  fullName: {
    marginHorizontal: 30,
    marginTop: 20,
  },
  inputName: {
    backgroundColor: COLORS.white,
    marginVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  email: {
    marginHorizontal: 30,
    marginTop: 5,
    borderRadius: 5,
  },
  inputEmail: {
    backgroundColor: COLORS.white,
    marginVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  address: {
    marginHorizontal: 30,
    marginTop: 5,
    borderRadius: 5,
  },
  inputAddress: {
    backgroundColor: COLORS.white,
    marginVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  Payment: {
    paddingTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 35,
  },
  BCA: {
    flexDirection: 'row',
    marginHorizontal: 30,
    marginVertical: 20,
  },
  borderBCA: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 5,
  },
  Button: {
    marginHorizontal: 30,
    marginVertical: 100,
    backgroundColor: COLORS.primary,
    borderRadius: 50,
  },
});

export default Transaksi;
