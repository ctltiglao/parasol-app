import { APOLLO_URL } from '@/assets/values/strings';
import { ApolloClient, gql, HttpLink, InMemoryCache } from '@apollo/client';

const http = new HttpLink({uri: APOLLO_URL});

export const APOLLO_CLIENT = new ApolloClient({
    link: new HttpLink({uri: APOLLO_URL}),
    cache: new InMemoryCache()
});

// export const GET_START_TRIP = gql`
//     query GetAllStartTrips {
//         passengerAppFeeds_startTrip {
//             id
//             tripCode
//             timestamp
//             location
//         }
//     }
// `;

export const SEND_START_TRIP = gql`
    mutation startPassengerTrip(
        $altitude: Float!,
        $deviceCode: String!,
        $latitude: Float!,
        $longitude: Float!,
        $qrCode: String,
        $timestamp: DateTime!,
        $tripCode: String!,
        $userCode: String!
    ) {
        passengerAppFeeds_startTrip(
            startTrip: {
                accuracy: HIGH,
                altitude: $altitude,
                deviceCode: $deviceCode,
                location: { coordinates: [$latitude, $longitude] },
                mode: ELECTRIC_BUS,
                purpose: PERSONAL,
                qrCode: $qrCode,
                timestamp: $timestamp,
                tripCode: $tripCode,
                userCode: $userCode
            }
        ) {
            id
        }
    }
`;

export const SEND_STOP_TRIP = gql`
    mutation endPassengerTrip(
        $altitude: Float!,
        $latitude: Float!,
        $longitude: Float!,
        $timestamp: DateTime!,
        $tripCode: String!,
    ) {
        passengerAppFeeds_endTrip(
            endTrip: {
                accuracy: HIGH,
                altitude: $altitude,
                location: { coordinates: [$latitude, $longitude] },
                timestamp: $timestamp,
                tripCode: $tripCode
            }
        ) {
            id
        }
    }
`;

export const SEND_START_FLEET = gql`
    mutation startRoutePuvVehicleTrip(
        $altitude: Float!,
        $deviceCode: String!,
        $latitude: Float!,
        $longitude: Float!,
        $qrCode: String!,
        $timestamp: DateTime!,
        $tripCode: String!,
        $userCode: String!
    ) {
        routePuvVehicleAppFeeds_startTrip(
            startTrip: {
                accuracy: HIGH,
                altitude: $altitude,
                deviceCode: $deviceCode,
                location: { coordinates: [$latitude, $longitude] },
                mode: ELECTRIC_BUS,
                purpose: PERSONAL,
                qrCode: $qrCode,
                timestamp: $timestamp,
                tripCode: $tripCode,
                userCode: $userCode
            }
        ) {
            id
        }
    }
`;

export const SEND_STOP_FLEET = gql`
    mutation endRoutePuvVehicleTrip(
        $altitude: Float!,
        $latitude: Float!,
        $longitude: Float!,
        $timestamp: DateTime!,
        $tripCode: String!,
    ) {
        routePuvVehicleAppFeeds_endTrip(
            endTrip: {
                accuracy: HIGH,
                altitude: $altitude,
                location: { coordinates: [$latitude, $longitude] },
                timestamp: $timestamp,
                tripCode: $tripCode
            }
        ) {
            id
        }
    }
`;