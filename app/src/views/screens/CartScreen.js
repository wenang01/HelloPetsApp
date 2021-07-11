import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, View, Text, Image } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../consts/colors';
import fiture from '../../consts/fiture';
import { PrimaryButton } from '../components/Button';
import APIKit from '../../router/APIKit';
import globaldata from '../../../../globaldata';

export class CartScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {
      cartsData: [],
      countCart: 0,
      sumCart: 0,
      userId: globaldata.currentUser.id,
    }
    this.updateCart = this.updateCart.bind(this)
  }

  componentDidMount() {
    this.getCart()
    this.getCount()
  }

  getCart() {

    const userId = this.state.userId

    const onSuccess = ({ data }) => {
      this.setState({ cartsData: data })

      console.log('<<<<<<<<<<<<<<<<first carts data>>>>>>>>>>>>>')
      console.log(data)
      console.log('<<<<<<<<<<<<<<<<first carts data>>>>>>>>>>>>>')
    }
    const onFaill = (error) => {
      console.log(error)
    }

    APIKit.get(`/carts/u/${userId}`).then(onSuccess).catch(onFaill)
  }

  updateCart(cartId, productId, qty) {
    const userId = this.state.userId
    const uqty = qty + 1
    const payload = { userId, productId, uqty }

    const onSuccess = ({ data }) => {
      this.setState({ cartsData: data })

      console.log('<<<<<<<<<<<<<<<<update carts data>>>>>>>>>>>>>')
      console.log(data)
      console.log('<<<<<<<<<<<<<<<<update carts data>>>>>>>>>>>>>')
    }
    const onFaill = (error) => {
      console.log(error)
    }

    APIKit.put(`/carts/u/${userId}/${cartId}`, payload).then(onSuccess).catch(onFaill)
  }

  getCount() {
    const userId = this.state.userId

    const onSuccess = (data) => {
      this.setState({ sumCart: data })

      console.log('<<<<<<<<<<<<<<<<count carts data>>>>>>>>>>>>>')
      console.log(data)
      console.log('<<<<<<<<<<<<<<<<count carts data>>>>>>>>>>>>>')
    }
    const onFaill = (error) => {
      console.log(error)
    }

    APIKit.get(`/carts/sumCart/${userId}`).then(onSuccess).catch(onFaill)
  }

  CartCard({ item }) {
    return (
      <View style={style.cartCard}>
        <Image source={{ uri: `http://192.168.0.14:3030/products/photo/${item.products.productImage}` }} style={{ height: 80, width: 80 }} />
        <View
          style={{
            height: 100,
            marginLeft: 10,
            paddingVertical: 20,
            flex: 1,
          }}>
          <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{item.products.productName}</Text>
          <Text style={{ fontSize: 14, marginTop: 2 }}>Rp.{item.products.price}</Text>
        </View>
        <View style={{ marginRight: 20, alignItems: 'center' }}>
          {/* <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{item.qty}</Text> */}
          <View>
            {/* <Text> */}
            {/* <TouchableOpacity
                style={style.btnMinus} >
                <Icon name="remove" size={20} color={COLORS.white} style={{ alignSelf: 'center' }} />
              </TouchableOpacity>
              <TouchableOpacity style={style.btnPlus}>
                <Icon name="add" size={20} color={COLORS.white} style={{ alignSelf: 'center' }} />
              </TouchableOpacity> */}
            <TouchableOpacity style={style.removeBtn}>
              <Icon name="delete" size={20} color={COLORS.white} style={{ alignSelf: 'center' }} />
            </TouchableOpacity>
            {/* </Text> */}
          </View>
        </View>
      </View>
    );
  };

  render() {
    const { cartsData, sumCart } = this.state
    console.log("<<<<<<<<<<<carts data>>>>>>>>>>>>>>>>>")
    console.log(cartsData)
    console.log("---------------------------")
    console.log(sumCart)
    console.log("<<<<<<<<<<<carts data>>>>>>>>>>>>>>>>>")
    return (
      <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
        <View style={style.header}>
          <Text style={{ fontSize: 25, fontWeight: 'bold' }}>Cart</Text>
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 80 }}
          data={cartsData}
          renderItem={({ item }) => <this.CartCard item={item} />}
          ListFooterComponentStyle={{ paddingHorizontal: 20, marginTop: 20 }}
          ListFooterComponent={() => (
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginVertical: 15,
                }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                  Total Price
                </Text>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Rp.{sumCart.data}</Text>
              </View>
              <View style={{ marginHorizontal: 30 }}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Transaksi')}>
                  <PrimaryButton title="CHECKOUT" />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </SafeAreaView>
    )
  }
}

export default CartScreen

// const CartScreen = ({ navigation }) => {

//   const initialState = {
//     cartsData: []
//   }

//   const getCart = () => {
//     const userId = globaldata.currentUser.id

//     const onSuccess = ({ data }) => {
//       initialState.cartsData = data
//       console.log(data)
//     }
//     const onFaill = (error) => {
//       console.log(error)
//     }

//     APIKit.get(`/carts/u/${userId}`).then(onSuccess).catch(onFaill)
//   }

//   const CartCard = ({ item }) => {
//     return (
//       <View style={style.cartCard}>
//         <Image source={item.image} style={{ height: 80, width: 80 }} />
//         <View
//           style={{
//             height: 100,
//             marginLeft: 10,
//             paddingVertical: 20,
//             flex: 1,
//           }}>
//           <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{item.name}</Text>
//           <Text style={{ fontSize: 13, color: COLORS.grey }}>
//             {item.ingredients}
//           </Text>
//           <Text style={{ fontSize: 17, fontWeight: 'bold' }}>${item.price}</Text>
//         </View>
//         <View style={{ marginRight: 20, alignItems: 'center' }}>
//           <Text style={{ fontWeight: 'bold', fontSize: 18 }}>3</Text>
//           <View style={style.actionBtn}>
//             <Icon name="remove" size={25} color={COLORS.white} />
//             <Icon name="add" size={25} color={COLORS.white} />
//           </View>
//         </View>
//       </View>
//     );
//   };
//   return (
//     <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
//       <View style={style.header}>
//         <Text style={{ fontSize: 25, fontWeight: 'bold' }}>Cart</Text>
//       </View>
//       <FlatList
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={{ paddingBottom: 80 }}
//         data={fiture}
//         renderItem={({ item }) => <CartCard item={item} />}
//         ListFooterComponentStyle={{ paddingHorizontal: 20, marginTop: 20 }}
//         ListFooterComponent={() => (
//           <View>
//             <View
//               style={{
//                 flexDirection: 'row',
//                 justifyContent: 'space-between',
//                 marginVertical: 15,
//               }}>
//               <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
//                 Total Price
//               </Text>
//               <Text style={{ fontSize: 18, fontWeight: 'bold' }}>$50</Text>
//             </View>
//             <View style={{ marginHorizontal: 30 }}>
//               <PrimaryButton title="CHECKOUT" />
//             </View>
//           </View>
//         )}
//       />
//     </SafeAreaView>
//   );
// };
const style = StyleSheet.create({
  header: {
    paddingVertical: 20,
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
    width: 80,
    height: 30,
    backgroundColor: COLORS.primary,
    borderRadius: 30,
    paddingHorizontal: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
  },
  removeBtn: {
    width: 40,
    height: 30,
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    paddingHorizontal: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
  },
  btnPlus: {
    width: 40,
    height: 30,
    backgroundColor: COLORS.primary,
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
    justifyContent: 'center',
    alignSelf: 'flex-end'
  },
  btnMinus: {
    width: 40,
    height: 30,
    backgroundColor: COLORS.primary,
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
    justifyContent: 'center',
    alignContent: 'center',
  }
});