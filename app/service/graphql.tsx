import { APOLLO_URL } from '@/assets/values/strings';
import { ApolloClient, gql, HttpLink, InMemoryCache } from '@apollo/client';

const http = new HttpLink({uri: APOLLO_URL});

export const APOLLO_CLIENT = new ApolloClient({
    link: new HttpLink({uri: APOLLO_URL}),
    cache: new InMemoryCache()
});

export const GET_START_TRIP = gql`
    query GetAllStartTrips {
        passengerAppFeeds_startTrip {
            id
            tripCode
            timestamp
            location
        }
    }
`;

// export const SEND_START_TRIP = `gql
//     mutation startPassengerTrip(
//         $accuracy: String!,
//         $altitude: Int!,
//         $deviceCode: String!,
//         $location: [Float!],
//         $mode: String!,
//         $purpose: String!,
//         $qrCode: String,
//         $timestamp: String!,
//         $tripCode: String!,
//         $userCode: String!
//     ) {
//         passengerAppFeeds_startTrip(
//             accuracy: $accuracy
//             altitude: $altitude
//             deviceCode: $deviceCode
//             location: $location
//             mode: $mode
//             purpose: $purpose
//             qrCode: $qrCode
//             timestamp: $timestamp
//             tripCode: $tripCode
//             userCode: $userCode
//         ) {
//             id
//             accuracy
//             altitude
//             deviceCode
//             location
//             mode
//             purpose
//             qrCode
//             timestamp
//             tripCode
//             userCode
//         }
//     }
// `;

export const SEND_START_TRIP = gql`
    mutation startPassengerTrip($startTrip: StartTripInput!) {
        passengerAppFeeds_startTrip(startTrip: $startTrip) {
            id
            accuracy
            altitude
            deviceCode
            location {
                coordinates
            }
            mode
            purpose
            qrCode
            timestamp
            tripCode
            userCode
        }
    }
`;

export const SEND_STOP_TRIP = gql`
    mutation endPassengerTrip($endTrip: EndTripInput!) {
        passengerAppFeeds_endTrip(endTrip: $endTrip) {
            id
        }
    }
`;

export const SEND_START_FLEET = gql`
    mutation startRoutePuvVehicleTrip($startFleet: StartTripInput!) {
        routePuvVehicleAppFeeds_startTrip(startTrip: $startFleet) {
            id
        }
    }
`;

export const SEND_STOP_FLEET = gql`
    mutation endRoutePuvVehicleTrip($endFleet: EndTripInput!) {
        routePuvVehicleAppFeeds_endTrip(endTrip: $endFleet) {
            id
        }
    }
`;