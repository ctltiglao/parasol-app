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

if (!global.Buffer) global.Buffer = Buffer;
if (!global.atob) global.atob = decode;
if (!global.btoa) global.btoa = encode;

const MQTT_URL = 'ws://staging-mqtt.safetravel.ph:8000/mqtt';
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
            console.log('MQTT: Connected');
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
                }
            })
        }

        client.publish(topic, message);
        
        client.on('message', (topic, message) => {
            // if (topic === 'route_puv_vehicle_app_feeds') {
            //     console.log(`Received message from ${topic}: message: ${message.toString()}`);
            // } else if (topic === 'boardings' || topic === 'alightings' || topic === 'ratings' || topic === 'alerts') {
            //     console.warn(`Received message from ${topic}: message: ${message.toString()}`);
            // }
        })

        return true
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