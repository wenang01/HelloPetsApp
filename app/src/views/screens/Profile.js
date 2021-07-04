import React from 'react';
import { SafeAreaView, StyleSheet, View, Text, Image } from 'react-native';
import { FlatList, TextInput, TouchableHighlight } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../consts/colors';
import biodata from '../../consts/biodata';
import globaldata from '../../../../globaldata';

const Profile = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={{ flexDirection: 'column', height: 320, backgroundColor: COLORS.primary, }}>
        <Text style={{ marginHorizontal: 30, marginTop: 20, fontSize: 25, fontWeight: 'bold', color: COLORS.white }}>
          Profile
        </Text>
        <View style={{ flex: 1.5, justifyContent: 'center', alignItems: 'center', }}>
          <Image
            source={require('../../assests/user.png')}
            style={{ height: 160, width: 160, borderRadius: 50, top: -20 }} />
        </View>
        <View style={{ flex: 0.3, backgroundColor: '#FFFFFF', borderTopStartRadius: 60, borderTopEndRadius: 60, }}></View>
      </View>
      <View style={{ flexDirection: 'column' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 20, paddingTop: 50, }}>
          <Icon name="person" size={30}
            style={{ color: COLORS.primary }} />
          <Text style={{ marginHorizontal: 2, fontSize: 17, alignItems: 'center', color: '#0C1229' }}>{globaldata.currentUser.name}</Text>
        </View>
        {/* <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 20, paddingTop: 20, }}>
          <Icon name="phone" size={30}
            style={{ color: COLORS.primary }} />
          <Text style={{ marginHorizontal: 5, fontSize: 17, alignItems: 'center', color: '#0C1229' }}> 0896789534277</Text>
        </View> */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 20, paddingTop: 20, }}>
          <Icon name="mail" size={30}
            style={{ color: COLORS.primary }} />
          <Text style={{ marginHorizontal: 2, fontSize: 17, alignItems: 'center', color: '#0C1229' }}>{globaldata.currentUser.email}</Text>
        </View>
      </View>
    </SafeAreaView>
  )
};

export default Profile;