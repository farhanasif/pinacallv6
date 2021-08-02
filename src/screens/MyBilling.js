import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MyBilling = props => {

    const [guestReportData, setGuestReportData] = useState('');

    useEffect(() => {

        const fetchData = async () => {
            const value = await AsyncStorage.getItem('@mobile')
            if(value !== ''){
                fetch("http://103.108.144.246/pinacallapi/process.php", {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    action: "getGuestCallDetails",
                    mobile: value})
                })
                .then(response => response.json())
                .then(response => {
                    setGuestReportData(response);
                })
                .catch(error => console.log('error', error));
            }

        };
        fetchData();
    },[]);

    const DurationFormat = (time) => {
        // Hours, minutes and seconds
        var hrs = ~~(time / 3600);
        var mins = ~~((time % 3600) / 60);
        var secs = ~~time % 60;

        // Output like "1:01" or "4:03:59" or "123:03:59"
        var ret = "";
        if (hrs > 0) {
            ret += hrs + " Hrs " + (mins < 10 ? "0" : "");
        }
        ret += "" + mins + " Min " + (secs < 10 ? "0" : "");
        ret += secs + " Sec";
        return ret;
    }

    return (
        <View style={styles.container}>
        <ScrollView contentInsetAdjustmentBehavior='automatic' showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>

            <SafeAreaView>

            {/* CallList */}
            <View styles={styles.callListWraper}>
                <Text style={{fontSize: 20, paddingTop: 20, paddingHorizontal: 20, alignSelf:'flex-start'}}>Current Balance: 20.00 BDT</Text>

                <View style={styles.callListCardWraper}>
                    <View style={{flexDirection:'row', flexWrap:'wrap', justifyContent: "flex-start"}}>

                        <View style={{flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 10}}>
                            <View>
                                <Text style={{fontSize:20}}>Number of audio call :</Text>
                            </View>
                            <View style={{paddingHorizontal: 20}}>
                                <Text style={{fontSize:20}}>{guestReportData? guestReportData.number_of_audio_call : ""}</Text>
                            </View>
                        </View>
                        <View style={{flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 10}}>
                            <View>
                                <Text style={{fontSize:20}}>Number of Video :</Text>
                            </View>
                            <View style={{paddingHorizontal: 20}}>
                                <Text style={{fontSize:20}}>{guestReportData? guestReportData.number_of_video_call: ''}</Text>
                            </View>
                        </View>
                        <View style={{flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 10}}>
                            <View>
                                <Text style={{fontSize:20}}>Duration of audio :</Text>
                            </View>
                            <View style={{paddingHorizontal: 20}}>
                                <Text style={{fontSize:20}}>{guestReportData? DurationFormat(guestReportData.duration_of_audio): ''}</Text>
                            </View>
                        </View>
                        <View style={{flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 10}}>
                            <View>
                                <Text style={{fontSize:20}}>Duration of video :</Text>
                            </View>
                            <View style={{paddingHorizontal: 20}}>
                                <Text style={{fontSize:20}}>{guestReportData? DurationFormat(guestReportData.duration_of_video): ''}</Text>
                            </View>
                        </View>
                        <View style={{flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 10}}>
                            <View>
                                <Text style={{fontSize:20}}>Audio Charges :</Text>
                            </View>
                            <View style={{paddingHorizontal: 20}}>
                                <Text style={{fontSize:20}}>{guestReportData? guestReportData.audio_charges+ " BDT": ''}</Text>
                            </View>
                        </View>
                        <View style={{flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 10}}>
                            <View>
                                <Text style={{fontSize:20}}>Video Charges :</Text>
                            </View>
                            <View style={{paddingHorizontal: 20}}>
                                <Text style={{fontSize:20}}>{guestReportData? guestReportData.video_charges + " BDT": ''}</Text>
                            </View>
                        </View>
                        <View style={{flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 10}}>
                            <View>
                                <Text style={{fontSize:20}}>Account balance :</Text>
                            </View>
                            <View style={{paddingHorizontal: 20}}>
                                <Text style={{fontSize:20}}>{guestReportData? guestReportData.balance + " BDT": ''}</Text>
                            </View>
                        </View>
                    </View>
                </View>




            </View>
            </SafeAreaView>

        </ScrollView>

    </View>
    );
};

export default MyBilling;


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#ffff',
        paddingHorizontal: 20,
        paddingTop: 40,
        alignItems: 'center'
        },
    ScreenButton: {
        flexDirection:'row',
        justifyContent: 'space-around',
        backgroundColor: '#ffff',
        paddingTop: 15,
        paddingBottom: 12,
        marginTop: 0,
        borderBottomWidth: 0.5,
        borderBottomColor: '#f1faee'
    },
    ScreenButtonView: {
        flexDirection: 'column',
        backgroundColor: '#ffff',
        justifyContent: 'center',
        alignItems: 'center'

    },
    IconView:{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    IconText: {
        color: '#264653'
    },
    ScreenButtonViewRecv: {
        flexDirection: 'row',
        backgroundColor: '#ffff',
        justifyContent: 'center',
        alignItems: 'center',

    },
    ButtonOne: {
        color: "#0083B0",
    },
    ButtonTextOne: {
        color: "blue",
        fontSize: 20
    },
    callListWraper : {
        paddingHorizontal: 20,
        backgroundColor: '#ffff'
    },
    callListCardWraper: {
        backgroundColor: '#ffff',
        borderRadius: 10,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        marginHorizontal: 15,
        marginVertical: 15,
        flexDirection: 'row',
        overflow: 'hidden',
        borderBottomColor: '#DEDEDE',
        borderBottomWidth: 1,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2
    }
})