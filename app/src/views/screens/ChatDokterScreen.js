import React, { Component } from 'react'
import { SafeAreaView, StyleSheet, View, Text, Image } from 'react-native';
import { FlatList, TextInput, TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../consts/colors';
import biodata from '../../consts/biodata';
import APIKit, { setClientToken } from '../../router/APIKit';
import DokterService from '../../middleware/dokter.service';
import globaldata from '../../../../globaldata';
import person from '../../assests/user.png'

export class ChatDokterScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {
      listdokter: undefined,
      isLoading: false,
      isAuthorized: false,
    }
  }

  getDokter() {
    const onSuccess = ({ data }) => {
      // Set JSON Web Token on success
      setClientToken(data.accessToken);
      this.setState({ isLoading: false, isAuthorized: true, listdokter: data });
      // this.props.navigation.navigate('Consultation')
      console.log(data)
    };

    const onFailure = (error) => {
      console.log(error && error.response);
      this.setState({
        errors: 'error! email and pass not match',
        isLoading: false,
      });
    };

    this.setState({ isLoading: true });

    APIKit.get('/doctors/').then(onSuccess).catch(onFailure)
  }

  componentDidMount() {
    this.getDokter()
  }

  CartCard = ({ item }) => {
    return (
      <TouchableHighlight
        underlayColor={COLORS.white}
        activeOpacity={0.9}
      // onPress={() => this.props.navigation.navigate('DetailBiodata', listdokter)}
      >
        <View style={style.cartCard}>
          <Image source={require('../../assests/user.png')} style={{ height: 90, width: 90, resizeMode: 'contain' }} />
          <View
            style={{
              height: 100,
              marginLeft: 10,
              paddingVertical: 10,
              flex: 1,
            }}>
            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{item.user.name}</Text>
            <Text style={{ fontSize: 13, color: COLORS.grey }}>
              {item.noStr}
            </Text>
            {/* <Text style={{ fontSize: 17, fontWeight: 'bold' }}>Rp.{item.price}</Text> */}
          </View>
          <View style={{ marginRight: 10, alignItems: 'center' }}>
            <TouchableOpacity style={style.actionBtn}
              onPress={() => {
                globaldata.selectedDoctor = item
                this.props.navigation.navigate('Consultation', item)

              }}>
              <Text style={{ fontWeight: 'bold', fontSize: 15, textAlign: 'center', color: '#FFFFFF' }}>Chat</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableHighlight>
    );
  };

  render() {
    const { listdokter } = this.state
    return (
      <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
        <View style={style.header}>
          <Text style={{ fontSize: 25, textAlign: 'justify', fontWeight: 'bold' }}>Chat Dokter</Text>
        </View>
        <View style={style.inputContainer}>
          <Icon name="search" size={30} />
          <TextInput style={{ marginHorizontal: 5, flex: 1, fontSize: 18 }}
            placeholder="Search for Dokter" />
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 80 }}
          data={listdokter}
          renderItem={({ item }) => <this.CartCard item={item} />}
          ListFooterComponentStyle={{ paddingHorizontal: 20, marginTop: 20 }}
          ListFooterComponent={() => (
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginVertical: 20,
                }}>
              </View>
            </View>
          )}
        />
      </SafeAreaView>
    )
  }
}

export default ChatDokterScreen

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