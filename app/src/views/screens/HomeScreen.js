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
const { width } = Dimensions.get('screen');
const cardWidth = width / 2 - 20;

const HomeScreen = ({ navigation }) => {
  const [selectedCategoryIndex, setSelectedCategoryIndex] = React.useState(0);

  // const ListCategories = () => {
  //   return (
  //     <ScrollView
  //       horizontal
  //       showsHorizontalScrollIndicator={false}
  //       contentContainerStyle={style.categoriesListContainer}>
  //       {categories.map((category, index) => (
  //         <TouchableOpacity
  //           key={index}
  //           activeOpacity={0.8}
  //           onPress={() => setSelectedCategoryIndex(index)}>
  //           <View
  //             style={{
  //               backgroundColor:
  //                 selectedCategoryIndex == index
  //                   ? COLORS.primary
  //                   : COLORS.secondary,
  //               ...style.categoryBtn,
  //             }}>
  //             <View style={style.categoryBtnImgCon}>
  //               <Image
  //                 source={category.image}
  //                 style={{height: 35, width: 35, resizeMode: 'cover'}}
  //               />
  //             </View>
  //             <Text
  //               style={{
  //                 fontSize: 15,
  //                 fontWeight: 'bold',
  //                 marginLeft: 10,
  //                 color:
  //                   selectedCategoryIndex == index
  //                     ? COLORS.white
  //                     : COLORS.primary,
  //               }}>
  //               {category.name}
  //             </Text>
  //           </View>
  //         </TouchableOpacity>
  //       ))}
  //     </ScrollView>
  //   );
  // };
  const Card = ({ fiture }) => {
    return (
      <TouchableHighlight
        underlayColor={COLORS.white}
        activeOpacity={0.9}
        onPress={() => navigation.navigate('DetailScreen', fiture)}>
        <View style={style.card}>
          <View style={{ alignItems: 'center', top: -40 }}>
            <Image source={fiture.image} style={{ height: 120, width: 120 }} />
          </View>
          <View style={{ marginHorizontal: 20 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
              {fiture.name}
            </Text>
            <Text style={{ fontSize: 14, color: COLORS.grey, marginTop: 2 }}>
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
            <Text style={{ fontSize: 28 }}>Halo,</Text>
            <Text style={{ fontSize: 28, fontWeight: 'bold', marginLeft: 10 }}>
              Holly Immanuel
            </Text>
          </View>
          <Text style={{ marginTop: 5, fontSize: 22, color: COLORS.grey }}>
            What do you want today
          </Text>
        </View>
        <Image
          source={require('../../assests/person.png')}
          style={{ height: 50, width: 50, borderRadius: 25 }}
        />
      </View>
      <View
        style={{
          marginTop: 40,
          flexDirection: 'row',
          paddingHorizontal: 20,
        }}>
        <View style={style.inputContainer}>
          <Icon name="search" size={28} />
          <TextInput
            style={{ flex: 1, fontSize: 18 }}
            placeholder="Search for Animals"
          />
        </View>
      </View>
      <FlatList
        style={{
          marginTop: 30,
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
    marginTop: 20,
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
