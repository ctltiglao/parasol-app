// import * as Device from 'expo-device';

// import mqtt, { IClientOptions, MqttClient, MqttProtocol } from "mqtt/dist/mqtt";

// import { MQTT_HOST, MQTT_PASSWORD, MQTT_PORT, MQTT_USERNAME } from "@/assets/values/strings";

// export const UseMqttClient = ({ topic, description } : { topic: string, description: any }) => {
//     const clientId = Device.osBuildId ?? Device.osInternalBuildId ?? '';
//     console.log(clientId);

//     const options = {
//         protocol: 'mqtts' as MqttProtocol,
//         clientId: clientId,
//         username: MQTT_USERNAME,
//         password: MQTT_PASSWORD,
//     }

//     console.log(topic);
//     console.log(description);

//     const client = mqtt.connect(`mqtts://${MQTT_HOST}:${MQTT_PORT}`, options);

//     client.on('connect', () => {
//         console.log('Connected to MQTT broker');
//         client.subscribe(topic);
//     });

//     client.on('message', (topic, description) => {
//         console.log(`Received message on topic ${topic}: ${description}`);    
//     });

//     client.publish(topic, description);

//     client.on('error', (error) => {
//         console.log(`MQTT error: ${error}`);
//     });

//     return null;
// }