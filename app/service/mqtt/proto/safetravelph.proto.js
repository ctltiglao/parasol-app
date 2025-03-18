/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

/**
 * GpsAccuracy enum.
 * @exports GpsAccuracy
 * @enum {number}
 * @property {number} UNKNOWN=0 UNKNOWN value
 * @property {number} LOW=1 LOW value
 * @property {number} MEDIUM=2 MEDIUM value
 * @property {number} HIGH=3 HIGH value
 */
$root.GpsAccuracy = (function() {
    var valuesById = {}, values = Object.create(valuesById);
    values[valuesById[0] = "UNKNOWN"] = 0;
    values[valuesById[1] = "LOW"] = 1;
    values[valuesById[2] = "MEDIUM"] = 2;
    values[valuesById[3] = "HIGH"] = 3;
    return values;
})();

$root.RoutePuvVehicleAppFeed = (function() {

    /**
     * Properties of a RoutePuvVehicleAppFeed.
     * @exports IRoutePuvVehicleAppFeed
     * @interface IRoutePuvVehicleAppFeed
     * @property {number|null} [latitude] RoutePuvVehicleAppFeed latitude
     * @property {number|null} [longitude] RoutePuvVehicleAppFeed longitude
     * @property {string|null} [timestamp] RoutePuvVehicleAppFeed timestamp
     * @property {number|null} [currentNumberOfPassengers] RoutePuvVehicleAppFeed currentNumberOfPassengers
     * @property {number|null} [altitudeInMeters] RoutePuvVehicleAppFeed altitudeInMeters
     * @property {GpsAccuracy|null} [gpsAccuracy] RoutePuvVehicleAppFeed gpsAccuracy
     * @property {string|null} [deviceCode] RoutePuvVehicleAppFeed deviceCode
     * @property {string|null} [driverCode] RoutePuvVehicleAppFeed driverCode
     * @property {string|null} [vehicleCode] RoutePuvVehicleAppFeed vehicleCode
     * @property {boolean|null} [isBoarding] RoutePuvVehicleAppFeed isBoarding
     * @property {boolean|null} [isAlighting] RoutePuvVehicleAppFeed isAlighting
     * @property {string|null} [tripCode] RoutePuvVehicleAppFeed tripCode
     */

    /**
     * Constructs a new RoutePuvVehicleAppFeed.
     * @exports RoutePuvVehicleAppFeed
     * @classdesc Represents a RoutePuvVehicleAppFeed.
     * @implements IRoutePuvVehicleAppFeed
     * @constructor
     * @param {IRoutePuvVehicleAppFeed=} [properties] Properties to set
     */
    function RoutePuvVehicleAppFeed(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * RoutePuvVehicleAppFeed latitude.
     * @member {number} latitude
     * @memberof RoutePuvVehicleAppFeed
     * @instance
     */
    RoutePuvVehicleAppFeed.prototype.latitude = 0;

    /**
     * RoutePuvVehicleAppFeed longitude.
     * @member {number} longitude
     * @memberof RoutePuvVehicleAppFeed
     * @instance
     */
    RoutePuvVehicleAppFeed.prototype.longitude = 0;

    /**
     * RoutePuvVehicleAppFeed timestamp.
     * @member {string} timestamp
     * @memberof RoutePuvVehicleAppFeed
     * @instance
     */
    RoutePuvVehicleAppFeed.prototype.timestamp = "";

    /**
     * RoutePuvVehicleAppFeed currentNumberOfPassengers.
     * @member {number} currentNumberOfPassengers
     * @memberof RoutePuvVehicleAppFeed
     * @instance
     */
    RoutePuvVehicleAppFeed.prototype.currentNumberOfPassengers = 0;

    /**
     * RoutePuvVehicleAppFeed altitudeInMeters.
     * @member {number} altitudeInMeters
     * @memberof RoutePuvVehicleAppFeed
     * @instance
     */
    RoutePuvVehicleAppFeed.prototype.altitudeInMeters = 0;

    /**
     * RoutePuvVehicleAppFeed gpsAccuracy.
     * @member {GpsAccuracy} gpsAccuracy
     * @memberof RoutePuvVehicleAppFeed
     * @instance
     */
    RoutePuvVehicleAppFeed.prototype.gpsAccuracy = 0;

    /**
     * RoutePuvVehicleAppFeed deviceCode.
     * @member {string} deviceCode
     * @memberof RoutePuvVehicleAppFeed
     * @instance
     */
    RoutePuvVehicleAppFeed.prototype.deviceCode = "";

    /**
     * RoutePuvVehicleAppFeed driverCode.
     * @member {string} driverCode
     * @memberof RoutePuvVehicleAppFeed
     * @instance
     */
    RoutePuvVehicleAppFeed.prototype.driverCode = "";

    /**
     * RoutePuvVehicleAppFeed vehicleCode.
     * @member {string} vehicleCode
     * @memberof RoutePuvVehicleAppFeed
     * @instance
     */
    RoutePuvVehicleAppFeed.prototype.vehicleCode = "";

    /**
     * RoutePuvVehicleAppFeed isBoarding.
     * @member {boolean} isBoarding
     * @memberof RoutePuvVehicleAppFeed
     * @instance
     */
    RoutePuvVehicleAppFeed.prototype.isBoarding = false;

    /**
     * RoutePuvVehicleAppFeed isAlighting.
     * @member {boolean} isAlighting
     * @memberof RoutePuvVehicleAppFeed
     * @instance
     */
    RoutePuvVehicleAppFeed.prototype.isAlighting = false;

    /**
     * RoutePuvVehicleAppFeed tripCode.
     * @member {string} tripCode
     * @memberof RoutePuvVehicleAppFeed
     * @instance
     */
    RoutePuvVehicleAppFeed.prototype.tripCode = "";

    /**
     * Creates a new RoutePuvVehicleAppFeed instance using the specified properties.
     * @function create
     * @memberof RoutePuvVehicleAppFeed
     * @static
     * @param {IRoutePuvVehicleAppFeed=} [properties] Properties to set
     * @returns {RoutePuvVehicleAppFeed} RoutePuvVehicleAppFeed instance
     */
    RoutePuvVehicleAppFeed.create = function create(properties) {
        return new RoutePuvVehicleAppFeed(properties);
    };

    /**
     * Encodes the specified RoutePuvVehicleAppFeed message. Does not implicitly {@link RoutePuvVehicleAppFeed.verify|verify} messages.
     * @function encode
     * @memberof RoutePuvVehicleAppFeed
     * @static
     * @param {IRoutePuvVehicleAppFeed} message RoutePuvVehicleAppFeed message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    RoutePuvVehicleAppFeed.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.latitude != null && Object.hasOwnProperty.call(message, "latitude"))
            writer.uint32(/* id 1, wireType 5 =*/13).float(message.latitude);
        if (message.longitude != null && Object.hasOwnProperty.call(message, "longitude"))
            writer.uint32(/* id 2, wireType 5 =*/21).float(message.longitude);
        if (message.timestamp != null && Object.hasOwnProperty.call(message, "timestamp"))
            writer.uint32(/* id 3, wireType 2 =*/26).string(message.timestamp);
        if (message.currentNumberOfPassengers != null && Object.hasOwnProperty.call(message, "currentNumberOfPassengers"))
            writer.uint32(/* id 4, wireType 0 =*/32).int32(message.currentNumberOfPassengers);
        if (message.altitudeInMeters != null && Object.hasOwnProperty.call(message, "altitudeInMeters"))
            writer.uint32(/* id 5, wireType 5 =*/45).float(message.altitudeInMeters);
        if (message.gpsAccuracy != null && Object.hasOwnProperty.call(message, "gpsAccuracy"))
            writer.uint32(/* id 6, wireType 0 =*/48).int32(message.gpsAccuracy);
        if (message.deviceCode != null && Object.hasOwnProperty.call(message, "deviceCode"))
            writer.uint32(/* id 8, wireType 2 =*/66).string(message.deviceCode);
        if (message.driverCode != null && Object.hasOwnProperty.call(message, "driverCode"))
            writer.uint32(/* id 9, wireType 2 =*/74).string(message.driverCode);
        if (message.vehicleCode != null && Object.hasOwnProperty.call(message, "vehicleCode"))
            writer.uint32(/* id 10, wireType 2 =*/82).string(message.vehicleCode);
        if (message.isBoarding != null && Object.hasOwnProperty.call(message, "isBoarding"))
            writer.uint32(/* id 11, wireType 0 =*/88).bool(message.isBoarding);
        if (message.isAlighting != null && Object.hasOwnProperty.call(message, "isAlighting"))
            writer.uint32(/* id 12, wireType 0 =*/96).bool(message.isAlighting);
        if (message.tripCode != null && Object.hasOwnProperty.call(message, "tripCode"))
            writer.uint32(/* id 13, wireType 2 =*/106).string(message.tripCode);
        return writer;
    };

    /**
     * Encodes the specified RoutePuvVehicleAppFeed message, length delimited. Does not implicitly {@link RoutePuvVehicleAppFeed.verify|verify} messages.
     * @function encodeDelimited
     * @memberof RoutePuvVehicleAppFeed
     * @static
     * @param {IRoutePuvVehicleAppFeed} message RoutePuvVehicleAppFeed message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    RoutePuvVehicleAppFeed.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a RoutePuvVehicleAppFeed message from the specified reader or buffer.
     * @function decode
     * @memberof RoutePuvVehicleAppFeed
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {RoutePuvVehicleAppFeed} RoutePuvVehicleAppFeed
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    RoutePuvVehicleAppFeed.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.RoutePuvVehicleAppFeed();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1: {
                    message.latitude = reader.float();
                    break;
                }
            case 2: {
                    message.longitude = reader.float();
                    break;
                }
            case 3: {
                    message.timestamp = reader.string();
                    break;
                }
            case 4: {
                    message.currentNumberOfPassengers = reader.int32();
                    break;
                }
            case 5: {
                    message.altitudeInMeters = reader.float();
                    break;
                }
            case 6: {
                    message.gpsAccuracy = reader.int32();
                    break;
                }
            case 8: {
                    message.deviceCode = reader.string();
                    break;
                }
            case 9: {
                    message.driverCode = reader.string();
                    break;
                }
            case 10: {
                    message.vehicleCode = reader.string();
                    break;
                }
            case 11: {
                    message.isBoarding = reader.bool();
                    break;
                }
            case 12: {
                    message.isAlighting = reader.bool();
                    break;
                }
            case 13: {
                    message.tripCode = reader.string();
                    break;
                }
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a RoutePuvVehicleAppFeed message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof RoutePuvVehicleAppFeed
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {RoutePuvVehicleAppFeed} RoutePuvVehicleAppFeed
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    RoutePuvVehicleAppFeed.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a RoutePuvVehicleAppFeed message.
     * @function verify
     * @memberof RoutePuvVehicleAppFeed
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    RoutePuvVehicleAppFeed.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.latitude != null && message.hasOwnProperty("latitude"))
            if (typeof message.latitude !== "number")
                return "latitude: number expected";
        if (message.longitude != null && message.hasOwnProperty("longitude"))
            if (typeof message.longitude !== "number")
                return "longitude: number expected";
        if (message.timestamp != null && message.hasOwnProperty("timestamp"))
            if (!$util.isString(message.timestamp))
                return "timestamp: string expected";
        if (message.currentNumberOfPassengers != null && message.hasOwnProperty("currentNumberOfPassengers"))
            if (!$util.isInteger(message.currentNumberOfPassengers))
                return "currentNumberOfPassengers: integer expected";
        if (message.altitudeInMeters != null && message.hasOwnProperty("altitudeInMeters"))
            if (typeof message.altitudeInMeters !== "number")
                return "altitudeInMeters: number expected";
        if (message.gpsAccuracy != null && message.hasOwnProperty("gpsAccuracy"))
            switch (message.gpsAccuracy) {
            default:
                return "gpsAccuracy: enum value expected";
            case 0:
            case 1:
            case 2:
            case 3:
                break;
            }
        if (message.deviceCode != null && message.hasOwnProperty("deviceCode"))
            if (!$util.isString(message.deviceCode))
                return "deviceCode: string expected";
        if (message.driverCode != null && message.hasOwnProperty("driverCode"))
            if (!$util.isString(message.driverCode))
                return "driverCode: string expected";
        if (message.vehicleCode != null && message.hasOwnProperty("vehicleCode"))
            if (!$util.isString(message.vehicleCode))
                return "vehicleCode: string expected";
        if (message.isBoarding != null && message.hasOwnProperty("isBoarding"))
            if (typeof message.isBoarding !== "boolean")
                return "isBoarding: boolean expected";
        if (message.isAlighting != null && message.hasOwnProperty("isAlighting"))
            if (typeof message.isAlighting !== "boolean")
                return "isAlighting: boolean expected";
        if (message.tripCode != null && message.hasOwnProperty("tripCode"))
            if (!$util.isString(message.tripCode))
                return "tripCode: string expected";
        return null;
    };

    /**
     * Creates a RoutePuvVehicleAppFeed message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof RoutePuvVehicleAppFeed
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {RoutePuvVehicleAppFeed} RoutePuvVehicleAppFeed
     */
    RoutePuvVehicleAppFeed.fromObject = function fromObject(object) {
        if (object instanceof $root.RoutePuvVehicleAppFeed)
            return object;
        var message = new $root.RoutePuvVehicleAppFeed();
        if (object.latitude != null)
            message.latitude = Number(object.latitude);
        if (object.longitude != null)
            message.longitude = Number(object.longitude);
        if (object.timestamp != null)
            message.timestamp = String(object.timestamp);
        if (object.currentNumberOfPassengers != null)
            message.currentNumberOfPassengers = object.currentNumberOfPassengers | 0;
        if (object.altitudeInMeters != null)
            message.altitudeInMeters = Number(object.altitudeInMeters);
        switch (object.gpsAccuracy) {
        default:
            if (typeof object.gpsAccuracy === "number") {
                message.gpsAccuracy = object.gpsAccuracy;
                break;
            }
            break;
        case "UNKNOWN":
        case 0:
            message.gpsAccuracy = 0;
            break;
        case "LOW":
        case 1:
            message.gpsAccuracy = 1;
            break;
        case "MEDIUM":
        case 2:
            message.gpsAccuracy = 2;
            break;
        case "HIGH":
        case 3:
            message.gpsAccuracy = 3;
            break;
        }
        if (object.deviceCode != null)
            message.deviceCode = String(object.deviceCode);
        if (object.driverCode != null)
            message.driverCode = String(object.driverCode);
        if (object.vehicleCode != null)
            message.vehicleCode = String(object.vehicleCode);
        if (object.isBoarding != null)
            message.isBoarding = Boolean(object.isBoarding);
        if (object.isAlighting != null)
            message.isAlighting = Boolean(object.isAlighting);
        if (object.tripCode != null)
            message.tripCode = String(object.tripCode);
        return message;
    };

    /**
     * Creates a plain object from a RoutePuvVehicleAppFeed message. Also converts values to other types if specified.
     * @function toObject
     * @memberof RoutePuvVehicleAppFeed
     * @static
     * @param {RoutePuvVehicleAppFeed} message RoutePuvVehicleAppFeed
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    RoutePuvVehicleAppFeed.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.latitude = 0;
            object.longitude = 0;
            object.timestamp = "";
            object.currentNumberOfPassengers = 0;
            object.altitudeInMeters = 0;
            object.gpsAccuracy = options.enums === String ? "UNKNOWN" : 0;
            object.deviceCode = "";
            object.driverCode = "";
            object.vehicleCode = "";
            object.isBoarding = false;
            object.isAlighting = false;
            object.tripCode = "";
        }
        if (message.latitude != null && message.hasOwnProperty("latitude"))
            object.latitude = options.json && !isFinite(message.latitude) ? String(message.latitude) : message.latitude;
        if (message.longitude != null && message.hasOwnProperty("longitude"))
            object.longitude = options.json && !isFinite(message.longitude) ? String(message.longitude) : message.longitude;
        if (message.timestamp != null && message.hasOwnProperty("timestamp"))
            object.timestamp = message.timestamp;
        if (message.currentNumberOfPassengers != null && message.hasOwnProperty("currentNumberOfPassengers"))
            object.currentNumberOfPassengers = message.currentNumberOfPassengers;
        if (message.altitudeInMeters != null && message.hasOwnProperty("altitudeInMeters"))
            object.altitudeInMeters = options.json && !isFinite(message.altitudeInMeters) ? String(message.altitudeInMeters) : message.altitudeInMeters;
        if (message.gpsAccuracy != null && message.hasOwnProperty("gpsAccuracy"))
            object.gpsAccuracy = options.enums === String ? $root.GpsAccuracy[message.gpsAccuracy] === undefined ? message.gpsAccuracy : $root.GpsAccuracy[message.gpsAccuracy] : message.gpsAccuracy;
        if (message.deviceCode != null && message.hasOwnProperty("deviceCode"))
            object.deviceCode = message.deviceCode;
        if (message.driverCode != null && message.hasOwnProperty("driverCode"))
            object.driverCode = message.driverCode;
        if (message.vehicleCode != null && message.hasOwnProperty("vehicleCode"))
            object.vehicleCode = message.vehicleCode;
        if (message.isBoarding != null && message.hasOwnProperty("isBoarding"))
            object.isBoarding = message.isBoarding;
        if (message.isAlighting != null && message.hasOwnProperty("isAlighting"))
            object.isAlighting = message.isAlighting;
        if (message.tripCode != null && message.hasOwnProperty("tripCode"))
            object.tripCode = message.tripCode;
        return object;
    };

    /**
     * Converts this RoutePuvVehicleAppFeed to JSON.
     * @function toJSON
     * @memberof RoutePuvVehicleAppFeed
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    RoutePuvVehicleAppFeed.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for RoutePuvVehicleAppFeed
     * @function getTypeUrl
     * @memberof RoutePuvVehicleAppFeed
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    RoutePuvVehicleAppFeed.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/RoutePuvVehicleAppFeed";
    };

    return RoutePuvVehicleAppFeed;
})();

$root.Passenger = (function() {

    /**
     * Properties of a Passenger.
     * @exports IPassenger
     * @interface IPassenger
     * @property {string|null} [deviceId] Passenger deviceId
     * @property {string|null} [lat] Passenger lat
     * @property {string|null} [lng] Passenger lng
     * @property {string|null} [timestamp] Passenger timestamp
     * @property {string|null} [userId] Passenger userId
     * @property {string|null} [orig] Passenger orig
     * @property {string|null} [dest] Passenger dest
     * @property {string|null} [purpose] Passenger purpose
     * @property {string|null} [mode] Passenger mode
     * @property {string|null} [vehicleId] Passenger vehicleId
     * @property {string|null} [vehicleDetails] Passenger vehicleDetails
     * @property {string|null} [tripId] Passenger tripId
     */

    /**
     * Constructs a new Passenger.
     * @exports Passenger
     * @classdesc Represents a Passenger.
     * @implements IPassenger
     * @constructor
     * @param {IPassenger=} [properties] Properties to set
     */
    function Passenger(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Passenger deviceId.
     * @member {string} deviceId
     * @memberof Passenger
     * @instance
     */
    Passenger.prototype.deviceId = "";

    /**
     * Passenger lat.
     * @member {string} lat
     * @memberof Passenger
     * @instance
     */
    Passenger.prototype.lat = "";

    /**
     * Passenger lng.
     * @member {string} lng
     * @memberof Passenger
     * @instance
     */
    Passenger.prototype.lng = "";

    /**
     * Passenger timestamp.
     * @member {string} timestamp
     * @memberof Passenger
     * @instance
     */
    Passenger.prototype.timestamp = "";

    /**
     * Passenger userId.
     * @member {string} userId
     * @memberof Passenger
     * @instance
     */
    Passenger.prototype.userId = "";

    /**
     * Passenger orig.
     * @member {string} orig
     * @memberof Passenger
     * @instance
     */
    Passenger.prototype.orig = "";

    /**
     * Passenger dest.
     * @member {string} dest
     * @memberof Passenger
     * @instance
     */
    Passenger.prototype.dest = "";

    /**
     * Passenger purpose.
     * @member {string} purpose
     * @memberof Passenger
     * @instance
     */
    Passenger.prototype.purpose = "";

    /**
     * Passenger mode.
     * @member {string} mode
     * @memberof Passenger
     * @instance
     */
    Passenger.prototype.mode = "";

    /**
     * Passenger vehicleId.
     * @member {string} vehicleId
     * @memberof Passenger
     * @instance
     */
    Passenger.prototype.vehicleId = "";

    /**
     * Passenger vehicleDetails.
     * @member {string} vehicleDetails
     * @memberof Passenger
     * @instance
     */
    Passenger.prototype.vehicleDetails = "";

    /**
     * Passenger tripId.
     * @member {string} tripId
     * @memberof Passenger
     * @instance
     */
    Passenger.prototype.tripId = "";

    /**
     * Creates a new Passenger instance using the specified properties.
     * @function create
     * @memberof Passenger
     * @static
     * @param {IPassenger=} [properties] Properties to set
     * @returns {Passenger} Passenger instance
     */
    Passenger.create = function create(properties) {
        return new Passenger(properties);
    };

    /**
     * Encodes the specified Passenger message. Does not implicitly {@link Passenger.verify|verify} messages.
     * @function encode
     * @memberof Passenger
     * @static
     * @param {IPassenger} message Passenger message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Passenger.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.deviceId != null && Object.hasOwnProperty.call(message, "deviceId"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.deviceId);
        if (message.lat != null && Object.hasOwnProperty.call(message, "lat"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.lat);
        if (message.lng != null && Object.hasOwnProperty.call(message, "lng"))
            writer.uint32(/* id 3, wireType 2 =*/26).string(message.lng);
        if (message.timestamp != null && Object.hasOwnProperty.call(message, "timestamp"))
            writer.uint32(/* id 4, wireType 2 =*/34).string(message.timestamp);
        if (message.userId != null && Object.hasOwnProperty.call(message, "userId"))
            writer.uint32(/* id 5, wireType 2 =*/42).string(message.userId);
        if (message.orig != null && Object.hasOwnProperty.call(message, "orig"))
            writer.uint32(/* id 6, wireType 2 =*/50).string(message.orig);
        if (message.dest != null && Object.hasOwnProperty.call(message, "dest"))
            writer.uint32(/* id 7, wireType 2 =*/58).string(message.dest);
        if (message.purpose != null && Object.hasOwnProperty.call(message, "purpose"))
            writer.uint32(/* id 8, wireType 2 =*/66).string(message.purpose);
        if (message.mode != null && Object.hasOwnProperty.call(message, "mode"))
            writer.uint32(/* id 9, wireType 2 =*/74).string(message.mode);
        if (message.vehicleId != null && Object.hasOwnProperty.call(message, "vehicleId"))
            writer.uint32(/* id 10, wireType 2 =*/82).string(message.vehicleId);
        if (message.vehicleDetails != null && Object.hasOwnProperty.call(message, "vehicleDetails"))
            writer.uint32(/* id 11, wireType 2 =*/90).string(message.vehicleDetails);
        if (message.tripId != null && Object.hasOwnProperty.call(message, "tripId"))
            writer.uint32(/* id 12, wireType 2 =*/98).string(message.tripId);
        return writer;
    };

    /**
     * Encodes the specified Passenger message, length delimited. Does not implicitly {@link Passenger.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Passenger
     * @static
     * @param {IPassenger} message Passenger message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Passenger.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Passenger message from the specified reader or buffer.
     * @function decode
     * @memberof Passenger
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Passenger} Passenger
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Passenger.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Passenger();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1: {
                    message.deviceId = reader.string();
                    break;
                }
            case 2: {
                    message.lat = reader.string();
                    break;
                }
            case 3: {
                    message.lng = reader.string();
                    break;
                }
            case 4: {
                    message.timestamp = reader.string();
                    break;
                }
            case 5: {
                    message.userId = reader.string();
                    break;
                }
            case 6: {
                    message.orig = reader.string();
                    break;
                }
            case 7: {
                    message.dest = reader.string();
                    break;
                }
            case 8: {
                    message.purpose = reader.string();
                    break;
                }
            case 9: {
                    message.mode = reader.string();
                    break;
                }
            case 10: {
                    message.vehicleId = reader.string();
                    break;
                }
            case 11: {
                    message.vehicleDetails = reader.string();
                    break;
                }
            case 12: {
                    message.tripId = reader.string();
                    break;
                }
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a Passenger message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Passenger
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Passenger} Passenger
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Passenger.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Passenger message.
     * @function verify
     * @memberof Passenger
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Passenger.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.deviceId != null && message.hasOwnProperty("deviceId"))
            if (!$util.isString(message.deviceId))
                return "deviceId: string expected";
        if (message.lat != null && message.hasOwnProperty("lat"))
            if (!$util.isString(message.lat))
                return "lat: string expected";
        if (message.lng != null && message.hasOwnProperty("lng"))
            if (!$util.isString(message.lng))
                return "lng: string expected";
        if (message.timestamp != null && message.hasOwnProperty("timestamp"))
            if (!$util.isString(message.timestamp))
                return "timestamp: string expected";
        if (message.userId != null && message.hasOwnProperty("userId"))
            if (!$util.isString(message.userId))
                return "userId: string expected";
        if (message.orig != null && message.hasOwnProperty("orig"))
            if (!$util.isString(message.orig))
                return "orig: string expected";
        if (message.dest != null && message.hasOwnProperty("dest"))
            if (!$util.isString(message.dest))
                return "dest: string expected";
        if (message.purpose != null && message.hasOwnProperty("purpose"))
            if (!$util.isString(message.purpose))
                return "purpose: string expected";
        if (message.mode != null && message.hasOwnProperty("mode"))
            if (!$util.isString(message.mode))
                return "mode: string expected";
        if (message.vehicleId != null && message.hasOwnProperty("vehicleId"))
            if (!$util.isString(message.vehicleId))
                return "vehicleId: string expected";
        if (message.vehicleDetails != null && message.hasOwnProperty("vehicleDetails"))
            if (!$util.isString(message.vehicleDetails))
                return "vehicleDetails: string expected";
        if (message.tripId != null && message.hasOwnProperty("tripId"))
            if (!$util.isString(message.tripId))
                return "tripId: string expected";
        return null;
    };

    /**
     * Creates a Passenger message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Passenger
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Passenger} Passenger
     */
    Passenger.fromObject = function fromObject(object) {
        if (object instanceof $root.Passenger)
            return object;
        var message = new $root.Passenger();
        if (object.deviceId != null)
            message.deviceId = String(object.deviceId);
        if (object.lat != null)
            message.lat = String(object.lat);
        if (object.lng != null)
            message.lng = String(object.lng);
        if (object.timestamp != null)
            message.timestamp = String(object.timestamp);
        if (object.userId != null)
            message.userId = String(object.userId);
        if (object.orig != null)
            message.orig = String(object.orig);
        if (object.dest != null)
            message.dest = String(object.dest);
        if (object.purpose != null)
            message.purpose = String(object.purpose);
        if (object.mode != null)
            message.mode = String(object.mode);
        if (object.vehicleId != null)
            message.vehicleId = String(object.vehicleId);
        if (object.vehicleDetails != null)
            message.vehicleDetails = String(object.vehicleDetails);
        if (object.tripId != null)
            message.tripId = String(object.tripId);
        return message;
    };

    /**
     * Creates a plain object from a Passenger message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Passenger
     * @static
     * @param {Passenger} message Passenger
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Passenger.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.deviceId = "";
            object.lat = "";
            object.lng = "";
            object.timestamp = "";
            object.userId = "";
            object.orig = "";
            object.dest = "";
            object.purpose = "";
            object.mode = "";
            object.vehicleId = "";
            object.vehicleDetails = "";
            object.tripId = "";
        }
        if (message.deviceId != null && message.hasOwnProperty("deviceId"))
            object.deviceId = message.deviceId;
        if (message.lat != null && message.hasOwnProperty("lat"))
            object.lat = message.lat;
        if (message.lng != null && message.hasOwnProperty("lng"))
            object.lng = message.lng;
        if (message.timestamp != null && message.hasOwnProperty("timestamp"))
            object.timestamp = message.timestamp;
        if (message.userId != null && message.hasOwnProperty("userId"))
            object.userId = message.userId;
        if (message.orig != null && message.hasOwnProperty("orig"))
            object.orig = message.orig;
        if (message.dest != null && message.hasOwnProperty("dest"))
            object.dest = message.dest;
        if (message.purpose != null && message.hasOwnProperty("purpose"))
            object.purpose = message.purpose;
        if (message.mode != null && message.hasOwnProperty("mode"))
            object.mode = message.mode;
        if (message.vehicleId != null && message.hasOwnProperty("vehicleId"))
            object.vehicleId = message.vehicleId;
        if (message.vehicleDetails != null && message.hasOwnProperty("vehicleDetails"))
            object.vehicleDetails = message.vehicleDetails;
        if (message.tripId != null && message.hasOwnProperty("tripId"))
            object.tripId = message.tripId;
        return object;
    };

    /**
     * Converts this Passenger to JSON.
     * @function toJSON
     * @memberof Passenger
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Passenger.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for Passenger
     * @function getTypeUrl
     * @memberof Passenger
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    Passenger.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/Passenger";
    };

    return Passenger;
})();

$root.Commuter = (function() {

    /**
     * Properties of a Commuter.
     * @exports ICommuter
     * @interface ICommuter
     * @property {string|null} [deviceId] Commuter deviceId
     * @property {string|null} [lat] Commuter lat
     * @property {string|null} [lng] Commuter lng
     * @property {string|null} [timestamp] Commuter timestamp
     * @property {string|null} [userId] Commuter userId
     * @property {Array.<string>|null} [preferredVehicles] Commuter preferredVehicles
     */

    /**
     * Constructs a new Commuter.
     * @exports Commuter
     * @classdesc Represents a Commuter.
     * @implements ICommuter
     * @constructor
     * @param {ICommuter=} [properties] Properties to set
     */
    function Commuter(properties) {
        this.preferredVehicles = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Commuter deviceId.
     * @member {string} deviceId
     * @memberof Commuter
     * @instance
     */
    Commuter.prototype.deviceId = "";

    /**
     * Commuter lat.
     * @member {string} lat
     * @memberof Commuter
     * @instance
     */
    Commuter.prototype.lat = "";

    /**
     * Commuter lng.
     * @member {string} lng
     * @memberof Commuter
     * @instance
     */
    Commuter.prototype.lng = "";

    /**
     * Commuter timestamp.
     * @member {string} timestamp
     * @memberof Commuter
     * @instance
     */
    Commuter.prototype.timestamp = "";

    /**
     * Commuter userId.
     * @member {string} userId
     * @memberof Commuter
     * @instance
     */
    Commuter.prototype.userId = "";

    /**
     * Commuter preferredVehicles.
     * @member {Array.<string>} preferredVehicles
     * @memberof Commuter
     * @instance
     */
    Commuter.prototype.preferredVehicles = $util.emptyArray;

    /**
     * Creates a new Commuter instance using the specified properties.
     * @function create
     * @memberof Commuter
     * @static
     * @param {ICommuter=} [properties] Properties to set
     * @returns {Commuter} Commuter instance
     */
    Commuter.create = function create(properties) {
        return new Commuter(properties);
    };

    /**
     * Encodes the specified Commuter message. Does not implicitly {@link Commuter.verify|verify} messages.
     * @function encode
     * @memberof Commuter
     * @static
     * @param {ICommuter} message Commuter message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Commuter.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.deviceId != null && Object.hasOwnProperty.call(message, "deviceId"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.deviceId);
        if (message.lat != null && Object.hasOwnProperty.call(message, "lat"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.lat);
        if (message.lng != null && Object.hasOwnProperty.call(message, "lng"))
            writer.uint32(/* id 3, wireType 2 =*/26).string(message.lng);
        if (message.timestamp != null && Object.hasOwnProperty.call(message, "timestamp"))
            writer.uint32(/* id 4, wireType 2 =*/34).string(message.timestamp);
        if (message.userId != null && Object.hasOwnProperty.call(message, "userId"))
            writer.uint32(/* id 5, wireType 2 =*/42).string(message.userId);
        if (message.preferredVehicles != null && message.preferredVehicles.length)
            for (var i = 0; i < message.preferredVehicles.length; ++i)
                writer.uint32(/* id 6, wireType 2 =*/50).string(message.preferredVehicles[i]);
        return writer;
    };

    /**
     * Encodes the specified Commuter message, length delimited. Does not implicitly {@link Commuter.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Commuter
     * @static
     * @param {ICommuter} message Commuter message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Commuter.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Commuter message from the specified reader or buffer.
     * @function decode
     * @memberof Commuter
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Commuter} Commuter
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Commuter.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Commuter();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1: {
                    message.deviceId = reader.string();
                    break;
                }
            case 2: {
                    message.lat = reader.string();
                    break;
                }
            case 3: {
                    message.lng = reader.string();
                    break;
                }
            case 4: {
                    message.timestamp = reader.string();
                    break;
                }
            case 5: {
                    message.userId = reader.string();
                    break;
                }
            case 6: {
                    if (!(message.preferredVehicles && message.preferredVehicles.length))
                        message.preferredVehicles = [];
                    message.preferredVehicles.push(reader.string());
                    break;
                }
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a Commuter message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Commuter
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Commuter} Commuter
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Commuter.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Commuter message.
     * @function verify
     * @memberof Commuter
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Commuter.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.deviceId != null && message.hasOwnProperty("deviceId"))
            if (!$util.isString(message.deviceId))
                return "deviceId: string expected";
        if (message.lat != null && message.hasOwnProperty("lat"))
            if (!$util.isString(message.lat))
                return "lat: string expected";
        if (message.lng != null && message.hasOwnProperty("lng"))
            if (!$util.isString(message.lng))
                return "lng: string expected";
        if (message.timestamp != null && message.hasOwnProperty("timestamp"))
            if (!$util.isString(message.timestamp))
                return "timestamp: string expected";
        if (message.userId != null && message.hasOwnProperty("userId"))
            if (!$util.isString(message.userId))
                return "userId: string expected";
        if (message.preferredVehicles != null && message.hasOwnProperty("preferredVehicles")) {
            if (!Array.isArray(message.preferredVehicles))
                return "preferredVehicles: array expected";
            for (var i = 0; i < message.preferredVehicles.length; ++i)
                if (!$util.isString(message.preferredVehicles[i]))
                    return "preferredVehicles: string[] expected";
        }
        return null;
    };

    /**
     * Creates a Commuter message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Commuter
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Commuter} Commuter
     */
    Commuter.fromObject = function fromObject(object) {
        if (object instanceof $root.Commuter)
            return object;
        var message = new $root.Commuter();
        if (object.deviceId != null)
            message.deviceId = String(object.deviceId);
        if (object.lat != null)
            message.lat = String(object.lat);
        if (object.lng != null)
            message.lng = String(object.lng);
        if (object.timestamp != null)
            message.timestamp = String(object.timestamp);
        if (object.userId != null)
            message.userId = String(object.userId);
        if (object.preferredVehicles) {
            if (!Array.isArray(object.preferredVehicles))
                throw TypeError(".Commuter.preferredVehicles: array expected");
            message.preferredVehicles = [];
            for (var i = 0; i < object.preferredVehicles.length; ++i)
                message.preferredVehicles[i] = String(object.preferredVehicles[i]);
        }
        return message;
    };

    /**
     * Creates a plain object from a Commuter message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Commuter
     * @static
     * @param {Commuter} message Commuter
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Commuter.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults)
            object.preferredVehicles = [];
        if (options.defaults) {
            object.deviceId = "";
            object.lat = "";
            object.lng = "";
            object.timestamp = "";
            object.userId = "";
        }
        if (message.deviceId != null && message.hasOwnProperty("deviceId"))
            object.deviceId = message.deviceId;
        if (message.lat != null && message.hasOwnProperty("lat"))
            object.lat = message.lat;
        if (message.lng != null && message.hasOwnProperty("lng"))
            object.lng = message.lng;
        if (message.timestamp != null && message.hasOwnProperty("timestamp"))
            object.timestamp = message.timestamp;
        if (message.userId != null && message.hasOwnProperty("userId"))
            object.userId = message.userId;
        if (message.preferredVehicles && message.preferredVehicles.length) {
            object.preferredVehicles = [];
            for (var j = 0; j < message.preferredVehicles.length; ++j)
                object.preferredVehicles[j] = message.preferredVehicles[j];
        }
        return object;
    };

    /**
     * Converts this Commuter to JSON.
     * @function toJSON
     * @memberof Commuter
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Commuter.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for Commuter
     * @function getTypeUrl
     * @memberof Commuter
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    Commuter.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/Commuter";
    };

    return Commuter;
})();

module.exports = $root;
