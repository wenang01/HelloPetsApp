import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RNCamera } from 'react-native-camera-tflite';
import * as Progress from 'react-native-progress';

// import outputs from './Output.json';
import outputs from '../../Output2.json';
import _ from 'lodash';

let _currentInstant = 0;
export default class Diagnose extends Component {
    constructor(props) {
        super(props);
        this.state = {
            time: 0,
            output: "",
            percentage: 0
        };
    }
    processOutput({ data }) {
        const probs = _.map(data, item => _.round(item / 255.0, 0.02));
        const orderedData = _.chain(data).zip(outputs).orderBy(0, 'desc').map(item => [_.round(item[0] / 255.0, 2), item[1]]).value();
        // const outputData = _.chain(orderedData).take(1).map(item => `${item[1]}: ${(item[0] * 100)} %`).join('\n').value();
        const outputData = _.chain(orderedData).take(1).map(item => `${item[1]}`).join('\n').value();
        const percentage = _.chain(orderedData).take(1).map(item => item[0]).value();
        const time = Date.now() - (_currentInstant || Date.now());
        const output = `Result: ${outputData}\nTime:${time} ms`;
        this.setState({ percentage: percentage[0] })
        // console.log(percentage[0])
        // console.log(probs)
        this.setState(state => ({
            output
        }));
        _currentInstant = Date.now();
    }

    render() {
        const modelParams = {
            // file: "mobilenet_v1_1.0_224_quant.tflite",
            file: "model.tflite",
            inputDimX: 224,
            inputDimY: 224,
            // outputDim: 1001, // for mobile net
            outputDim: 5, // for helopet model
            freqms: 0
        };
        return (
            <View style={styles.container}>
                <RNCamera
                    ref={ref => {
                        this.camera = ref;
                    }}
                    style={styles.preview}
                    type={RNCamera.Constants.Type.back}
                    flashMode={RNCamera.Constants.FlashMode.on}
                    permissionDialogTitle={'Permission to use camera'}
                    permissionDialogMessage={'We need your permission to use your camera phone'}
                    onModelProcessed={data => this.processOutput(data)}
                    modelParams={modelParams}
                >
                    <Text style={styles.cameraText}>{this.state.output}</Text>
                    <Progress.Bar progress={this.state.percentage} width={200} />
                    <Text style={styles.cameraText}>{this.state.percentage * 100 + " %"}</Text>
                </RNCamera>
            </View>
        );
    }
} const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black'
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    cameraText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold'
    }
});