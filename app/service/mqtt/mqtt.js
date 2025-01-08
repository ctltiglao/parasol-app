// proto to js: pbjs -t static-module -w commonjs -o to.js from.proto
// js to ts: pbts -o to.ts from.js

// react native
// expo
import * as Device from 'expo-device';
// gluestack

import { connect as mqttConnect, MqttClient } from "mqtt";

const MQTT_URL = 'ws://staging-mqtt.safetravel.ph:8000/mqtt';
// const MQTT_URL = 'ws://broker.hivemq.com:8000/mqtt';
const MQTT_OPTIONS = {
    clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
    clean: true
}

export const onMqttConnect = (topic, message) => {
    const client = mqttConnect(MQTT_URL, MQTT_OPTIONS);
    // console.log(message);

    client.on('connect', () => {
        // console.log(MQTT_OPTIONS.clientId);
        // console.log('Connected to MQTT broker');
    })

    if (message !== '#') {
        if (topic !== 'route_puv_vehicle_app_feeds') {
            // console.log(message);
            client.subscribe(topic, (err) => {
                if (!err) {
                    console.warn(topic);
                    client.publish(topic, message);
                }
            });
        } else {
            client.subscribe(topic, (err) => {
                if (!err) {
                    console.log(topic);
                    client.publish(topic, message);
                }
            });
        }
    }

    if (message === '#') {
        client.on('close', () => {
            // console.log('Connection to MQTT broker closed');
        });
        client.end();
    }

    client.on('message', (topic, message) => {
        if (topic !== 'route_puv_vehicle_app_feeds') {
            console.warn(`Received message from ${topic}: ${message.toString()}`);
        } else {
            console.log(`Received message from ${topic}: ${message.toString()}`);
        }
    });

    client.on('error', (error) => {
        // console.log(`MQTT error: ${error}`);
    });

    client.on('close', () => {
        // console.log('Connection to MQTT broker closed');
    });

    return () => {
        client.end();
    }
}

export const onPublishMqtt = (topic, message) => {
    const client = mqttConnect(MQTT_URL, MQTT_OPTIONS);

    client.on('connect', () => {
        // console.log(MQTT_OPTIONS.clientId);
        // console.log('Connected to MQTT broker');
    })

    client.subscribe(topic, (err) => {
        if (!err) {
            console.warn(topic);
            client.publish(topic, message);
        }
    });

    client.on('message', (topic, message) => {
        console.log(`Received message from ${topic}: ${message.toString()}`);
    });

    client.on('error', (error) => {
        // console.log(`MQTT error: ${error}`);
    });

    client.on('close', () => {
        // console.log('Connection to MQTT broker closed');
    });

    return () => {
        client.end();
    }
}