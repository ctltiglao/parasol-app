// proto to js: pbjs -t static-module -w commonjs -o to.js from.proto
// js to ts: pbts -o to.ts from.js

// react native
import 'react-native-url-polyfill/auto';
// expo
// gluestack

import { connect as mqttConnect } from "mqtt";

import { Buffer } from 'buffer';
import { decode, encode } from 'base-64';
// import { resolve } from 'path';

import { Commuter, RoutePuvVehicleAppFeed } from './proto/safetravelph.proto.js';

if (!global.Buffer) global.Buffer = Buffer;
if (!global.atob) global.atob = decode;
if (!global.btoa) global.btoa = encode;

const MQTT_URL = 'ws://staging-mqtt.safetravel.ph:8000/mqtt';
// const MQTT_URL = 'mqtt://52.221.1.119:1883'
const MQTT_OPTIONS = {
    clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
    clean: true
}
let client = null;
let subscribedTopics = new Set();

export const onMqttConnect = () => {
    if (client && client.connected) {
        return Promise.resolve(true);
    }

    client = mqttConnect(MQTT_URL, MQTT_OPTIONS);
    return new Promise((resolve, reject) => {
        client.on('connect', () => {
            // console.log('MQTT: Connected');
            resolve(true)
        });

        client.on('error', (error) => {
            // alert('Failed to connect to MQTT: ', error.error);
            reject(false)
        });
    })
}

export const onMqttPublish = (topic, message) => {
    if (!client || !client.connected) {
        return false;
    }

    try {
        client.removeAllListeners('message');

        if (!subscribedTopics.has(topic)) {
            client.subscribe(topic, (err) => {
                if (!err) {
                    subscribedTopics.add(topic);
                    // console.log(`Subscribed to ${topic}`);
                } else {
                    console.log(`Failed to resubscribe ${err}`)
                }
            })
        }

        client.publish(topic, message);
        
        // client.on('message', (topic, message) => {
        //     if (topic === 'commuters') {
        //         console.warn(`Received message from ${topic}: message: ${message.toString()}`);
        //     }

        //     if (topic === 'route_puv_vehicle_app_feeds') {
        //         // console.warn(`Received message from ${topic}: message: ${message.toString()}`);
        //         const data = RoutePuvVehicleAppFeed.decode(new Uint8Array(message));
        //         // console.log(data);
        //         return data;
        //     }
        // })

        // return true
    } catch (error) {
        return false
    }
}

export const onMqttSubscribe = (topic, onMessageCallback) => {
    console.log('SUBSCRIBED', topic);

    if (!client || !client.connected) {
        return false;
    }

    try {
        client.removeAllListeners('message');

        if (!subscribedTopics.has(topic)) {
            console.log('here')
            client.subscribe(topic, (err) => {
                if (!err) {
                    subscribedTopics.add(topic);
                    console.log(`Subscribed to ${topic}`);
                } else {
                    console.log(`Failed to resubscribe ${err}`)
                }
            })
        }

        client.on('message', (topic, message) => {
            if (topic === 'commuters') {
                console.warn(`Received message from ${topic}: message: ${message.toString()}`);
                const data = Commuter.decode(new Uint8Array(message));
                console.warn(data);
                const coordinates = {latitude: data.lat, longitude: data.lng, userId: data.userId}

                onMessageCallback(coordinates);
            }

            if (topic === 'route_puv_vehicle_app_feeds') {
                // console.warn(`Received message from ${topic}: message: ${message.toString()}`);
                const data = RoutePuvVehicleAppFeed.decode(new Uint8Array(message));
                const coordinates = {latitude: data.latitude, longitude: data.longitude, vehicleCode: data.vehicleCode};

                onMessageCallback(coordinates);
                // return new Promise.resolve(coordinates);
                // console.log(coordinates);
            }
        })
    } catch (error) {
        return false
    }
}

export const onMqttReconnect = () => {
    if (!client) {
        return false;
    }

    client.on('reconnect', () => {
        console.log('MQTT: Reconnected');
        return true
    })
}

export const onMqttClose = () => {
    return new Promise((resolve, reject) => {
        if (!client) {
            console.log('MQTT: Disconnected');
            reject(false);
        }

        client.removeAllListeners();

        client.end(true, () => {
            console.log('MQTT: Disconnected');
            client = null;
            resolve(true)
        })
    })
}