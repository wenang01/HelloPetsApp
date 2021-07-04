import React from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  FlatList,
  ScrollView,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../consts/colors';
// import categories from '../../consts/categories';
import fiture from '../../consts/fiture';
import globaldata from '../../../../globaldata';
const { width } = Dimensions.get('screen');
const cardWidth = width / 2 - 20;

const HomeScreen = ({ navigation, route }) => {

  const user = globaldata.currentUser
  console.log("===============>>>>home user<<<============")
  console.log(user)
  console.log("===============>>>>home user<<<============")

  const Card = ({ fiture }) => {
    return (
      <TouchableHighlight
        underlayColor={COLORS.white}
        activeOpacity={0.9}
        onPress={() => navigation.navigate(fiture.nav, fiture)}
      >
        <View style={style.card}>
          <View style={{ alignItems: 'center', top: -40 }}>
            <Image source={fiture.image} style={{ height: 120, width: 120 }} />
          </View>
          <View style={{ marginHorizontal: 5 }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
              {fiture.name}
            </Text>
            <Text style={{ fontSize: 12, color: COLORS.grey, marginTop: 2, alignContent: 'center' }}>
              {fiture.ingredients}
            </Text>
          </View>
          <View
            style={{
              marginTop: 10,
              marginHorizontal: 20,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}></View>
        </View>
      </TouchableHighlight>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={style.header}>
        <View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontSize: 20 }}>Halo,</Text>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 10 }}>
              {user.name}
            </Text>
          </View>
          <Text style={{ marginTop: 2, fontSize: 18, color: COLORS.grey }}>
            What do you want today
          </Text>
        </View>
        <Image
          source={require('../../assests/user.png')}
          style={{ height: 50, width: 50, borderRadius: 25 }}
        />
      </View>
      {/* <View
        style={{
          marginTop: 5,
          flexDirection: 'row',
          paddingHorizontal: 10,
        }}>
        <View style={style.inputContainer}>
          <Icon name="search" size={28} />
          <TextInput
            style={{ flex: 1, fontSize: 18 }}
            placeholder="Search for Animals"
          />
        </View>
      </View> */}
      <FlatList
        style={{
          marginTop: 20,
        }}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        data={fiture}
        renderItem={({ item }) => <Card fiture={item} />}
      />
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  header: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  inputContainer: {
    flex: 1,
    height: 50,
    borderRadius: 10,
    flexDirection: 'row',
    backgroundColor: COLORS.light,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  sortBtn: {
    width: 50,
    height: 50,
    marginLeft: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoriesListContainer: {
    paddingVertical: 30,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  categoryBtn: {
    height: 45,
    width: 120,
    marginRight: 7,
    borderRadius: 30,
    alignItems: 'center',
    paddingHorizontal: 5,
    flexDirection: 'row',
  },
  categoryBtnImgCon: {
    height: 35,
    width: 35,
    backgroundColor: COLORS.white,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    height: 190,
    width: cardWidth,
    marginHorizontal: 10,
    marginBottom: 20,
    marginTop: 50,
    borderRadius: 15,
    elevation: 10,
    backgroundColor: COLORS.white,
  },
  addToCartBtn: {
    height: 30,
    width: 30,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
