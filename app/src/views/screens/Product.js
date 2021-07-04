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

const width = Dimensions.get('window').width / 2 - 30;

export class Product extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            listproduct: undefined,
            listcategories: undefined,
            isLoading: false,
            isAuthorized: false,
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
                onPress={() => this.props.navigation.navigate('ProductDetail', plant)}
            >
                <View style={style.card}>
                    <View style={{ alignItems: 'flex-end' }}>
                        <View
                            style={{
                                width: 30,
                                height: 30,
                                borderRadius: 20,
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: plant.like
                                    ? 'rgba(245, 42, 42,0.2)'
                                    : 'rgba(0,0,0,0.2) ',
                            }}>
                            <Icon
                                name="favorite"
                                size={16}
                                color={plant.like ? COLORS.red : COLORS.black}
                            />
                        </View>
                    </View>

                    <View
                        style={{
                            height: 100,
                            alignItems: 'center',
                        }}>
                        <Image
                            // https://raw.githubusercontent.com/wenang01/HelloPetService/main/src/main/java/product-photos/
                            // source={"http://localhost:3030/products/photo/" + plant.productImage}
                            source={{ uri: `http://192.168.0.14:3030/products/photo/${plant.productImage}` }}
                            style={{ flex: 1, resizeMode: 'contain', width: 350, height: 400 }}
                        />
                        {console.log(plant.productImage)}
                    </View>

                    <Text style={{ fontWeight: 'bold', fontSize: 17, marginTop: 10 }}>
                        {plant.productName}
                    </Text>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: 5,
                        }}>
                        <Text style={{ fontSize: 15 }}>
                            Rp.{plant.price}
                        </Text>
                        <View
                            style={{
                                height: 25,
                                width: 25,
                                backgroundColor: COLORS.green,
                                borderRadius: 5,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <Text style={{ fontSize: 20, color: COLORS.white, fontWeight: 'bold', textAlign: 'center' }}>+</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };
    render() {
        const { listproduct } = this.state
        return (
            <SafeAreaView
                style={{ flex: 1, paddingHorizontal: 20, backgroundColor: COLORS.white }}>
                <View style={style.header}>
                    <View>
                        <Text style={{ fontSize: 25 }}>Hello Pet</Text>
                        <Text style={{ fontSize: 38, color: COLORS.green, fontWeight: 'bold' }}>
                            Pet Store
                        </Text>
                    </View>
                    <TouchableOpacity onPress={() => { navigation.navigate('Cart') }}>
                        <Icon name="shopping-cart" size={28} />
                    </TouchableOpacity>
                </View>
                <View style={{ marginTop: 30, flexDirection: 'row' }}>
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
        marginTop: 30,
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
        height: 225,
        backgroundColor: COLORS.light,
        width,
        marginHorizontal: 2,
        borderRadius: 10,
        marginBottom: 20,
        padding: 10,
    },
    header: {
        marginTop: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    searchContainer: {
        height: 50,
        backgroundColor: COLORS.light,
        borderRadius: 10,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        fontSize: 18,
        fontWeight: 'bold',
        flex: 1,
        color: COLORS.dark,
    },
    sortBtn: {
        marginLeft: 10,
        height: 50,
        width: 50,
        borderRadius: 10,
        backgroundColor: COLORS.green,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

