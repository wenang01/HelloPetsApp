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

const TransactionSuccess = ({ navigation }) => {
    return (
        <SafeAreaView>
            <View style={style.Transaksi}>
                <Icon name="arrow-back-ios" size={28} />
                <Text style={style.textTransaksi}>Transaksi</Text>
            </View>
            <View style={style.Personal}>
                <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                    Transaction Succes
                </Text>
            </View>
            <View style={style.fullName}>
                <Text>Silahkan lanjutkan pembayaran via Transfer ke rekening:</Text>
                <Text>BNI:001-001-001-001-001</Text>
                <Text>a/n: HelloPets</Text>
            </View>
            <View style={style.fullName}>
                <Text>Apabila Anda Sudah Melakukan Pembayaran silahkan konfirmasi melalui Chat Admin</Text>
            </View>
            <View style={style.Button}>
                <PrimaryButton onPress={() => navigation.navigate('Product')} title="Shop Again" />
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

export default TransactionSuccess;
