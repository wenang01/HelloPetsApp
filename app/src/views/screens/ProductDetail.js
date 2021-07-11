import React from 'react';
import { View, SafeAreaView, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../consts/colors';
import APIKit from '../../router/APIKit';
import globaldata from '../../../../globaldata';

const ProductDetail = ({ navigation, route }) => {
    const plant = route.params;
    const countCart = globaldata.countCart

    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: COLORS.white,
            }}>
            <View style={style.header}>
                <Icon name="arrow-back" size={28} onPress={() => navigation.goBack()} />
                {/* <Icon name="shopping-cart" size={28} onPress={() => navigation.navigate('Cart')} /> */}
                <TouchableOpacity onPress={() => { navigation.navigate('Cart') }}>
                    <View>
                        <Text>
                            <Icon name="shopping-cart" size={28} ></Icon>
                            <View style={{ backgroundColor: 'red', width: 15, height: 15, borderRadius: 10 }}>
                                <Text style={{ alignSelf: 'center', color: COLORS.white, fontSize: 10 }}>{countCart}</Text>
                            </View>
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={style.imageContainer}>
                <Image
                    source={{ uri: `http://192.168.0.14:3030/products/photo/${plant.productImage}` }}
                    style={{ resizeMode: 'contain', flex: 1, width: 600, height: 600 }} />
            </View>
            <View style={style.detailsContainer}>
                <View
                    style={{
                        marginLeft: 20,
                        flexDirection: 'row',
                        alignItems: 'flex-end',
                    }}>
                    <View style={style.line} />
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Best choice</Text>
                </View>
                <View
                    style={{
                        marginLeft: 20,
                        marginTop: 20,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{plant.productName}</Text>
                    <View style={style.priceTag}>
                        <Text
                            style={{
                                marginLeft: 15,
                                color: COLORS.white,
                                fontWeight: 'bold',
                                fontSize: 16,
                            }}>
                            ${plant.price}
                        </Text>
                    </View>
                </View>
                <View style={{ paddingHorizontal: 20, marginTop: 2 }}>
                    <Text style={{ fontSize: 16 }}>{plant.description}</Text>
                    <Text
                        style={{
                            color: 'grey',
                            fontSize: 16,
                            lineHeight: 22,
                            marginTop: 10,
                        }}>
                        {plant.about}
                    </Text>
                    <View
                        style={{
                            marginTop: 20,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}>
                            <View style={style.borderBtn}>
                                <Text style={style.borderBtnText}>-</Text>
                            </View>
                            <Text
                                style={{
                                    fontSize: 20,
                                    marginHorizontal: 10,
                                    fontWeight: 'bold',
                                }}>
                                1
                            </Text>
                            <View style={style.borderBtn}>
                                <Text style={style.borderBtnText}>+</Text>
                            </View>
                        </View>

                        <View style={style.buyBtn}>
                            <Text
                                style={{ color: COLORS.white, fontSize: 18, fontWeight: 'bold' }}>
                                Buy
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

const style = StyleSheet.create({
    header: {
        paddingHorizontal: 20,
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    imageContainer: {
        flex: 0.45,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    detailsContainer: {
        flex: 0.55,
        backgroundColor: COLORS.light,
        marginHorizontal: 7,
        marginBottom: 7,
        borderRadius: 20,
        marginTop: 30,
        paddingTop: 30,
    },
    line: {
        width: 25,
        height: 2,
        backgroundColor: COLORS.dark,
        marginBottom: 5,
        marginRight: 3,
    },
    borderBtn: {
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        width: 60,
        height: 40,
    },
    borderBtnText: { fontWeight: 'bold', fontSize: 28 },
    buyBtn: {
        width: 100,
        height: 40,
        backgroundColor: COLORS.green,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
    },
    priceTag: {
        backgroundColor: COLORS.green,
        width: 80,
        height: 40,
        justifyContent: 'center',
        borderTopLeftRadius: 25,
        borderBottomLeftRadius: 25,
    },
});

export default ProductDetail;
