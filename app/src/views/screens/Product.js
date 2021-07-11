import React from 'react';
import {
    View,
    SafeAreaView,
    Text,
    StyleSheet,
    FlatList,
    Image,
    Dimensions,
    ScrollView,
    AppRegistry
} from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../consts/colors';
import plants from '../../consts/plants';
import APIKit, { setClientToken } from '../../router/APIKit';
import globaldata from '../../../../globaldata';
import axios from 'axios';

const width = Dimensions.get('window').width / 2 - 30;

export class Product extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            listproduct: undefined,
            listcategories: undefined,
            isLoading: false,
            isAuthorized: false,
            countCart: 0,
        };
    };

    getProduct() {
        const onSuccess = ({ data }) => {
            // Set JSON Web Token on success
            setClientToken(data.accessToken);
            this.setState({ isLoading: false, isAuthorized: true, listproduct: data });
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

        APIKit.get('/products/').then(onSuccess).catch(onFailure)
    }

    getCategories() {
        const onSuccess = ({ data }) => {
            // Set JSON Web Token on success
            setClientToken(data.accessToken);
            this.setState({ isLoading: false, isAuthorized: true, listcategories: data });
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

        APIKit.get('/categories/').then(onSuccess).catch(onFailure)
    }

    componentDidMount() {
        this.getProduct()
        this.getCategories()
        this.getCountCart()
    }

    getCountCart() {
        const userId = globaldata.currentUser.id;

        const onSuccess = (data) => {
            this.setState({ countCart: data })
            globaldata.countCart = data.data
            console.log('<<<<<<<<<<<<<<<<count carts data>>>>>>>>>>>>>')
            console.log(data)
            console.log('<<<<<<<<<<<<<<<<count carts data>>>>>>>>>>>>>')
        }
        const onFaill = (error) => {
            console.log(error)
        }

        APIKit.get(`/carts/countCart/${userId}`).then(onSuccess).catch(onFaill)
    }

    addToCart(prodId) {

        const users = globaldata.currentUser.id;
        const products = prodId;
        const qty = 1;
        const payload = { users, products, qty };
        console.log(payload);

        // const onSuccess = ({ data }) => {
        //     // setClientToken(data.accessToken);
        //     console.log(data)

        // };

        // const onFailure = (error) => {
        //     console.log(error && error.response);

        // };

        // APIKit.post('/carts/', payload).then(onSuccess).catch(onFailure);

        const form_data = new FormData();
        form_data.append("users", users);
        form_data.append("products", products);
        form_data.append("qty", qty);
        const END_POINT = "carts/";
        axios
            .post(
                "http://192.168.0.14:3030/" + END_POINT,
                form_data,
                // { headers: authHeader() },
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            )
            .then(
                (response) => {
                    //   alert("Add Carts Successfully!");
                    //   window.location.replace("/carts/");
                    // window.location.reload();
                    console.log(response.data);
                    //   this.setState({
                    //         currentUser: response.data.users.id,
                    //         currentProduct: { id: response.data.products.id },
                    //         qty: response.data.qty,
                    //     })
                },
                (error) => {
                    console.log(error);
                    // alert("sorry, something's wrong..");
                }
            );
    }

    CategoryList = () => {
        const [catergoryIndex, setCategoryIndex] = React.useState(0);
        // const categories = ['Medicine', 'Food', 'Accesories'];
        const { listcategories } = this.state
        return (
            <View style={style.categoryContainer}>
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled={true}>
                    {listcategories && listcategories.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            activeOpacity={0.8}
                            onPress={() => setCategoryIndex(index)}>
                            <Text
                                style={[
                                    style.categoryText,
                                    catergoryIndex === index && style.categoryTextSelected,
                                ]}>
                                {" " + item.categoryName + " "}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
        );
    };

    Card = ({ plant }) => {
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => this.props.navigation.navigate('ProductDetail', plant)}>
                <View style={style.card}>
                    <View
                        style={{
                            height: 130,
                            alignItems: 'center',
                        }}>
                        <Image
                            // https://raw.githubusercontent.com/wenang01/HelloPetService/main/src/main/java/product-photos/
                            // source={"http://localhost:3030/products/photo/" + plant.productImage}
                            source={{ uri: `http://192.168.0.14:3030/products/photo/${plant.productImage}` }}
                            style={{ flex: 1, resizeMode: 'contain', width: 400, height: 600 }}
                        />
                        {console.log(plant.productImage)}
                    </View>

                    <View>
                        <Text style={{ fontWeight: 'bold', fontSize: 12, marginTop: 10 }}>
                            {plant.productName}
                        </Text>
                        <Text style={{ fontSize: 10 }}>
                            Stok : {plant.stok}
                        </Text>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginTop: 5,
                            }}>
                            <Text style={{ fontSize: 12 }}>
                                Rp.{plant.price}
                            </Text>
                            <TouchableOpacity
                                style={{
                                    height: 30,
                                    width: 40,
                                    backgroundColor: COLORS.green,
                                    borderRadius: 5,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                                onPress={() => {
                                    console.log(plant.id)
                                    this.addToCart(plant.id)
                                }}>
                                <Text style={{ fontSize: 10, color: COLORS.white, textAlign: 'center' }}>Add to Cart</Text>
                            </TouchableOpacity>

                        </View>
                    </View>

                </View>
            </TouchableOpacity>
        );
    };
    render() {
        const { listproduct, countCart } = this.state
        console.log("count cart ==========================")
        console.log(countCart)
        return (
            <SafeAreaView
                style={{ flex: 1, paddingHorizontal: 20, backgroundColor: COLORS.white }}>
                <View style={style.header}>
                    <View>
                        {/* <Text style={{ fontSize: 25 }}>Hello Pet</Text> */}
                        <Text>
                            <Text style={{ fontSize: 30 }}>Pet</Text>
                            <Text style={{ fontSize: 30, color: COLORS.green, fontWeight: 'bold' }}>Store</Text>
                        </Text>
                    </View>
                    <TouchableOpacity onPress={() => { this.props.navigation.navigate('Cart') }}>
                        <View>
                            <Text>
                                <Icon name="shopping-cart" size={28} ></Icon>
                                <View style={{ backgroundColor: 'red', width: 15, height: 15, borderRadius: 10 }}>
                                    <Text style={{ alignSelf: 'center', color: COLORS.white, fontSize: 10 }}>{countCart.data}</Text>
                                </View>
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{ marginTop: 20, flexDirection: 'row' }}>
                    <View style={style.searchContainer}>
                        <Icon name="search" size={25} style={{ marginLeft: 20 }} />
                        <TextInput placeholder="Search" style={style.input} />
                    </View>
                    <View style={style.sortBtn}>
                        <Icon name="sort" size={30} color={COLORS.white} />
                    </View>
                </View>
                <this.CategoryList />
                <FlatList
                    columnWrapperStyle={{ justifyContent: 'space-between' }}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        marginTop: 10,
                        paddingBottom: 50,
                    }}
                    numColumns={2}
                    data={listproduct}
                    renderItem={({ item }) => {
                        return <this.Card plant={item} />;
                    }}
                />
            </SafeAreaView>
        )
    }
}

export default Product;

const style = StyleSheet.create({
    categoryContainer: {
        flexDirection: 'row',
        marginTop: 20,
        marginBottom: 20,
        justifyContent: 'space-between',
    },
    categoryText: { fontSize: 16, color: 'grey', fontWeight: 'bold' },
    categoryTextSelected: {
        color: COLORS.green,
        paddingBottom: 5,
        borderBottomWidth: 2,
        borderColor: COLORS.green,
    },
    card: {
        height: 250,
        backgroundColor: COLORS.light,
        width: width,
        marginHorizontal: 2,
        borderRadius: 10,
        marginBottom: 20,
        padding: 10,
    },
    header: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    searchContainer: {
        height: 40,
        backgroundColor: COLORS.light,
        borderRadius: 10,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        fontSize: 16,
        flex: 1,
        color: COLORS.dark,
    },
    sortBtn: {
        marginLeft: 10,
        height: 40,
        width: 40,
        borderRadius: 10,
        backgroundColor: COLORS.green,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

