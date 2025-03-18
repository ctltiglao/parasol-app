import * as AuthSession from 'expo-auth-session';

export const GOOGLE_MAPS_API_KEY= 'AIzaSyDcNwbKHXqF0YhYLhb7ZN2A3XupIk8v0_c';
export const GOOGLE_PLACES_API_KEY = 'AIzaSyBxbNXjmdo5qt2cME549ozeVdtAFO9hD34';

export const MQTT_HOST = 'ws://staging-mqtt.safetravel.ph:8000/mqtt';

export const KEYCLOAK_BASE_URL = 'https://staging-iam.safetravel.ph';
export const REALM = 'https://staging-iam.safetravel.ph/realms/safetravelph-cpa';
export const CLIENT_ID = 'safetravelph-cpa-test';
export const SECRET = 'E2bpLBo94YOBLWGaljCyMuQc0xU19AnP';
// export const REALM = 'https://staging-iam.safetravel.ph/realms/safetravelph';
// export const CLIENT_ID = 'stph-app'

export const APOLLO_URL = 'http://52.221.1.119:5000/graphql'

// for production
export const REDIRECT_URI = AuthSession.makeRedirectUri({
  scheme: 'parasol',
  path: 'com.safetravelph.parasol'
});

// for development
// export const REDIRECT_URI = AuthSession.makeRedirectUri();

export const DISCOVERY = {
    authorizationEndpoint: `${REALM}/protocol/openid-connect/auth`,
    tokenEndpoint: `${REALM}/protocol/openid-connect/token`,
    revocationEndpoint: `${REALM}/protocol/openid-connect/logout`,
    userInfoEndpoint: `${REALM}/protocol/openid-connect/userinfo`
}

const String = {
    notice_contact: 'Visit www.safetravel.ph. For comments and suggestions, send email at admin@safetravel.ph',
    notice_policy: 'Read our Terms of Use and Data Privacy Policy at ',
    notice_policy_link : 'https://www.safetravelph.org/privacy',
    notice_copyright: '©2025 SafeTravelPH Mobility Innovations Organization. All rights reserved.',
    report_placeholder: 'Please provide a detailed description and include recommendations for the concerned national/local government agency.',
};

export const modeOptions = [
    { id: 1, label: 'Car', value: '1' },
    { id: 2, label: 'Truck', value: '2' },
    { id: 3, label: 'Boat', value: '3' },
    { id: 4, label: 'PUB', value: '4' },
    { id: 5, label: 'Modern PUJ', value: '5' },
    { id: 6, label: 'Traditional PUJ', value: '6' },
    { id: 7, label: 'UV Express', value: '7' },
    { id: 8, label: 'Ride Hailed Car Taxi', value: '8' },
    { id: 9, label: 'Ordinary Taxi', value: '9' },
    { id: 10, label: 'Tricycle', value: '10' },
    { id: 11, label: 'Ride Hailed Motor Taxi', value: '11' },
    { id: 12, label: 'P2P', value: '12' },
    { id: 13, label: 'Tourist Transport Service', value: '13' },
    { id: 14, label: 'Filcab', value: '14' },
    { id: 15, label: 'Minibus', value: '15' },
    { id: 16, label: 'Walk', value: '16' },
    { id: 17, label: 'Bike', value: '17' },
    { id: 18, label: 'Company Service', value: '18' },
    { id: 19, label: 'Others', value: '19' }
]

export const pauseOptions = [
    { id: 1, label: 'Super Traffic', value: '1' },
    { id: 2, label: 'Road Incident/Vehicle Issues', value: '2' },
    { id: 3, label: 'Passenger Issues', value: '3' },
    { id: 4, label: 'Others', value: '4' }
]

export const purposeOptions = [
    { id: 1, label: 'Government work', value: '1' },
    { id: 2, label: 'Private sector job', value: '2' },
    { id: 3, label: 'Return to province', value: '3' },
    { id: 4, label: 'Seek medical services', value: '4' },
    { id: 5, label: 'Buy food and essential supplies', value: '5' },
    { id: 6, label: 'Personal errand', value: '6' },
    { id: 7, label: 'NGO/Religious activity', value: '7' },
    { id: 8, label: 'School-related activity', value: '8' },
    { id: 9, label: 'Others', value: '9' },
]

export const weatherOptions = [
    { id: 1, label: 'Day', value: '1' },
    { id: 2, label: 'Clear Night', value: '2' },
    { id: 3, label: 'Cloudy', value: '3' },
    { id: 4, label: 'Fog', value: '4' },
    { id: 5, label: 'Hail', value: '5' },
    { id: 6, label: 'Partially Cloudy Day', value: '6' },
    { id: 7, label: 'Partially Cloudy Night', value: '7' },
    { id: 8, label: 'Rain', value: '8' },
    { id: 9, label: 'Thunderstorm', value: '9' },
    { id: 10, label: 'Wind', value: '10' },
]

export const lightOptions = [
    { id: 1, label: 'Dawn', value: '1' },
    { id: 2, label: 'Day', value: '2' },
    { id: 3, label: 'Dusk', value: '3' },
    { id: 4, label: 'Night', value: '4' },
]

export const causeOptions = [
    { id: 1, label: 'Human Error', value: '1' },
    { id: 2, label: 'Vehicle Defect', value: '2' },
    { id: 3, label: 'Road Defect', value: '3' },
    { id: 4, label: 'Other', value: '4' },
]

export const collisionOptions = [
    { id: 1, label: 'Head On', value: '1' },
    { id: 2, label: 'Rear End', value: '2' },
    { id: 3, label: 'Right Angle', value: '3' },
    { id: 4, label: 'Other Angle', value: '4' },
    { id: 5, label: 'Side Swipe', value: '5' },
    { id: 6, label: 'Overturned Vehicle', value: '6' },
    { id: 7, label: 'Hit Object On Road', value: '7' },
    { id: 8, label: 'Hit Object Off Road', value: '8' },
    { id: 9, label: 'Hit Parked Vehicle', value: '9' },
    { id: 10, label: 'Hit Pedestrian', value: '10' },
    { id: 11, label: 'Hit Animal', value: '11' },
    { id: 12, label: 'Other', value: '12' }
]

export const agencyOptions = [
    { id: 1, label: 'PNP', value: '1' },
    { id: 2, label: 'Local Traffic Unit', value: '2' },
    { id: 3, label: 'BGCEA', value: '3' },
    { id: 4, label: 'CCTO', value: '4' },
    { id: 5, label: 'MMDA Metrobase', value: '5' },
    { id: 6, label: 'Other', value: '6' }
]

export const crashOptions = [
    { id: 1, label: 'Pedestrian On Foot', value: '1' },
    { id: 2, label: 'Vehicle From Adjacent Direction Intersection Only', value: '2' },
    { id: 3, label: 'Vehicle From Adjacent Direction', value: '3' },
    { id: 4, label: 'Vehicle Fram Opposing Direction', value: '4' },
    { id: 5, label: 'Vehicle From Same Direction', value: '5' },
    { id: 6, label: 'Maneuvering', value: '6' },
    { id: 7, label: 'Overtaking', value: '7' },
    { id: 8, label: 'On Path', value: '8' },
    { id: 9, label: 'Off Path Straight', value: '9' },
    { id: 10, label: 'Off Path Curve', value: '10' },
    { id: 11, label: 'Passenger And Miscellaneous', value: '11' }
]

export const classificationOptions = [
    { id: 1, label: 'Private', value: '1' },
    { id: 2, label: 'Government', value: '2' },
    { id: 3, label: 'Public Or For Hire', value: '3' },
    { id: 4, label: 'Diplomat', value: '4' }
]

export const vehicleOptions = [
    { id: 1, label: 'Car', value: '1' },
    { id: 2, label: 'Van', value: '2' },
    { id: 3, label: 'SUV', value: '3' },
    { id: 4, label: 'Bus', value: '4' },
    { id: 5, label: 'Jeepney', value: '5' },
    { id: 6, label: 'Taxi Metered', value: '6' },
    { id: 7, label: 'Truck Pick Up', value: '7' },
    { id: 8, label: 'Truck Rigid', value: '8' },
    { id: 9, label: 'Truck Articulated', value: '9' },
    { id: 10, label: 'Truck Fire', value: '10' },
    { id: 11, label: 'Truck', value: '11' },
    { id: 12, label: 'Ambulance', value: '12' },
    { id: 13, label: 'Armored Car', value: '13' },
    { id: 14, label: 'Heavy Equipment', value: '14' },
    { id: 15, label: 'Motorcycle', value: '15' },
    { id: 16, label: 'Tricycle', value: '16' },
    { id: 17, label: 'Bicycle', value: '17' },
    { id: 18, label: 'Pedicab', value: '18' },
    { id: 19, label: 'Pedestrian', value: '19' },
    { id: 20, label: 'Push Cart', value: '20' },
    { id: 21, label: 'Tartanilla', value: '21' },
    { id: 22, label: 'Animal', value: '22' },
    { id: 23, label: 'Water Vessel', value: '23' },
    { id: 24, label: 'Electric Bike', value: '24' },
    { id: 25, label: 'Habal Habal', value: '25' },
    { id: 26, label: 'Others', value: '26' }
]

export const maneuverOptions = [
    { id: 1, label: 'Left Turn', value: '1' },
    { id: 2, label: 'Right Turn', value: '2' },
    { id: 3, label: 'U Turn', value: '3' },
    { id: 4, label: 'Cross Traffic', value: '4' },
    { id: 5, label: 'Merging', value: '5' },
    { id: 6, label: 'Diverging', value: '6' },
    { id: 7, label: 'Overtaking', value: '7' },
    { id: 8, label: 'Going Ahead', value: '8' },
    { id: 9, label: 'Reversing', value: '9' },
    { id: 10, label: 'Sudden Start', value: '10' },
    { id: 11, label: 'Sudden Stop', value: '11' },
    { id: 12, label: 'Parked Off Road', value: '12' },
    { id: 13, label: 'Parked On Road', value: '13' }
]

export const loadingOptions = [
    { id: 1, label: 'Legal', value: '1' },
    { id: 2, label: 'Overloaded', value: '2' },
    { id: 3, label: 'Unsafe Load', value: '3' }
]

export const involvementOptions = [
    { id: 1, label: 'Pedestrian', value: '1' },
    { id: 2, label: 'Witness', value: '2' },
    { id: 3, label: 'Passenger', value: '3' },
    { id: 4, label: 'Driver', value: '4' }
]

export const genderOptions = [
    { id: 1, label: 'Male', value: '1' },
    { id: 2, label: 'Female', value: '2' },
    { id: 3, label: 'Other', value: '3' }
]

export const driverErrOptions = [
    { id: 1, label: 'Fatigued or Asleep', value: '1' },
    { id: 2, label: 'Inattentive', value: '2' },
    { id: 3, label: 'Too Fast', value: '3' },
    { id: 4, label: 'Too Close', value: '4' },
    { id: 5, label: 'No Signal', value: '5' },
    { id: 6, label: 'Bad Overtaking', value: '6' },
    { id: 7, label: 'Bad Turning', value: '7' },
    { id: 8, label: 'Using Cellphone', value: '8' }
]

export const injuryOptions = [
    { id: 1, label: 'Fatal', value: '1' },
    { id: 2, label: 'Serious', value: '2' },
    { id: 3, label: 'Minor', value: '3' },
    { id: 4, label: 'Not Injured', value: '4' }
]

export const seatbeltOptions = [
    { id: 1, label: 'Worn Correctly', value: '1' },
    { id: 2, label: 'Not Worn', value: '2' },
    { id: 3, label: 'Not Worn Correctly', value: '3' }
]

export const gradeOptions = [
    { id: 1, label: 'Preschool', value: '1' },
    { id: 2, label: 'Elementary', value: '2' },
    { id: 3, label: 'High School', value: '3' }
]

export default String;