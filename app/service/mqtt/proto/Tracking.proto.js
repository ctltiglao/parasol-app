/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.Tracking = (function() {

    /**
     * Properties of a Tracking.
     * @exports ITracking
     * @interface ITracking
     * @property {string|null} [deviceId] Tracking deviceId
     * @property {string|null} [lat] Tracking lat
     * @property {string|null} [lng] Tracking lng
     * @property {string|null} [timestamp] Tracking timestamp
     * @property {string|null} [userId] Tracking userId
     * @property {string|null} [vehicleId] Tracking vehicleId
     * @property {string|null} [vehicleDetails] Tracking vehicleDetails
     * @property {string|null} [passengerId] Tracking passengerId
     * @property {string|null} [passengerDetails] Tracking passengerDetails
     * @property {string|null} [altitude] Tracking altitude
     * @property {string|null} [accuracy] Tracking accuracy
     */

    /**
     * Constructs a new Tracking.
     * @exports Tracking
     * @classdesc Represents a Tracking.
     * @implements ITracking
     * @constructor
     * @param {ITracking=} [properties] Properties to set
     */
    function Tracking(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Tracking deviceId.
     * @member {string} deviceId
     * @memberof Tracking
     * @instance
     */
    Tracking.prototype.deviceId = "";

    /**
     * Tracking lat.
     * @member {string} lat
     * @memberof Tracking
     * @instance
     */
    Tracking.prototype.lat = "";

    /**
     * Tracking lng.
     * @member {string} lng
     * @memberof Tracking
     * @instance
     */
    Tracking.prototype.lng = "";

    /**
     * Tracking timestamp.
     * @member {string} timestamp
     * @memberof Tracking
     * @instance
     */
    Tracking.prototype.timestamp = "";

    /**
     * Tracking userId.
     * @member {string} userId
     * @memberof Tracking
     * @instance
     */
    Tracking.prototype.userId = "";

    /**
     * Tracking vehicleId.
     * @member {string} vehicleId
     * @memberof Tracking
     * @instance
     */
    Tracking.prototype.vehicleId = "";

    /**
     * Tracking vehicleDetails.
     * @member {string} vehicleDetails
     * @memberof Tracking
     * @instance
     */
    Tracking.prototype.vehicleDetails = "";

    /**
     * Tracking passengerId.
     * @member {string} passengerId
     * @memberof Tracking
     * @instance
     */
    Tracking.prototype.passengerId = "";

    /**
     * Tracking passengerDetails.
     * @member {string} passengerDetails
     * @memberof Tracking
     * @instance
     */
    Tracking.prototype.passengerDetails = "";

    /**
     * Tracking altitude.
     * @member {string} altitude
     * @memberof Tracking
     * @instance
     */
    Tracking.prototype.altitude = "";

    /**
     * Tracking accuracy.
     * @member {string} accuracy
     * @memberof Tracking
     * @instance
     */
    Tracking.prototype.accuracy = "";

    /**
     * Creates a new Tracking instance using the specified properties.
     * @function create
     * @memberof Tracking
     * @static
     * @param {ITracking=} [properties] Properties to set
     * @returns {Tracking} Tracking instance
     */
    Tracking.create = function create(properties) {
        return new Tracking(properties);
    };

    /**
     * Encodes the specified Tracking message. Does not implicitly {@link Tracking.verify|verify} messages.
     * @function encode
     * @memberof Tracking
     * @static
     * @param {ITracking} message Tracking message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Tracking.encode = function encode(message, writer) {
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
        if (message.vehicleId != null && Object.hasOwnProperty.call(message, "vehicleId"))
            writer.uint32(/* id 6, wireType 2 =*/50).string(message.vehicleId);
        if (message.vehicleDetails != null && Object.hasOwnProperty.call(message, "vehicleDetails"))
            writer.uint32(/* id 7, wireType 2 =*/58).string(message.vehicleDetails);
        if (message.passengerId != null && Object.hasOwnProperty.call(message, "passengerId"))
            writer.uint32(/* id 8, wireType 2 =*/66).string(message.passengerId);
        if (message.passengerDetails != null && Object.hasOwnProperty.call(message, "passengerDetails"))
            writer.uint32(/* id 9, wireType 2 =*/74).string(message.passengerDetails);
        if (message.altitude != null && Object.hasOwnProperty.call(message, "altitude"))
            writer.uint32(/* id 10, wireType 2 =*/82).string(message.altitude);
        if (message.accuracy != null && Object.hasOwnProperty.call(message, "accuracy"))
            writer.uint32(/* id 11, wireType 2 =*/90).string(message.accuracy);
        return writer;
    };

    /**
     * Encodes the specified Tracking message, length delimited. Does not implicitly {@link Tracking.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Tracking
     * @static
     * @param {ITracking} message Tracking message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Tracking.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Tracking message from the specified reader or buffer.
     * @function decode
     * @memberof Tracking
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Tracking} Tracking
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Tracking.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Tracking();
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
                    message.vehicleId = reader.string();
                    break;
                }
            case 7: {
                    message.vehicleDetails = reader.string();
                    break;
                }
            case 8: {
                    message.passengerId = reader.string();
                    break;
                }
            case 9: {
                    message.passengerDetails = reader.string();
                    break;
                }
            case 10: {
                    message.altitude = reader.string();
                    break;
                }
            case 11: {
                    message.accuracy = reader.string();
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
     * Decodes a Tracking message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Tracking
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Tracking} Tracking
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Tracking.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Tracking message.
     * @function verify
     * @memberof Tracking
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Tracking.verify = function verify(message) {
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
        if (message.vehicleId != null && message.hasOwnProperty("vehicleId"))
            if (!$util.isString(message.vehicleId))
                return "vehicleId: string expected";
        if (message.vehicleDetails != null && message.hasOwnProperty("vehicleDetails"))
            if (!$util.isString(message.vehicleDetails))
                return "vehicleDetails: string expected";
        if (message.passengerId != null && message.hasOwnProperty("passengerId"))
            if (!$util.isString(message.passengerId))
                return "passengerId: string expected";
        if (message.passengerDetails != null && message.hasOwnProperty("passengerDetails"))
            if (!$util.isString(message.passengerDetails))
                return "passengerDetails: string expected";
        if (message.altitude != null && message.hasOwnProperty("altitude"))
            if (!$util.isString(message.altitude))
                return "altitude: string expected";
        if (message.accuracy != null && message.hasOwnProperty("accuracy"))
            if (!$util.isString(message.accuracy))
                return "accuracy: string expected";
        return null;
    };

    /**
     * Creates a Tracking message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Tracking
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Tracking} Tracking
     */
    Tracking.fromObject = function fromObject(object) {
        if (object instanceof $root.Tracking)
            return object;
        var message = new $root.Tracking();
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
        if (object.vehicleId != null)
            message.vehicleId = String(object.vehicleId);
        if (object.vehicleDetails != null)
            message.vehicleDetails = String(object.vehicleDetails);
        if (object.passengerId != null)
            message.passengerId = String(object.passengerId);
        if (object.passengerDetails != null)
            message.passengerDetails = String(object.passengerDetails);
        if (object.altitude != null)
            message.altitude = String(object.altitude);
        if (object.accuracy != null)
            message.accuracy = String(object.accuracy);
        return message;
    };

    /**
     * Creates a plain object from a Tracking message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Tracking
     * @static
     * @param {Tracking} message Tracking
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Tracking.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.deviceId = "";
            object.lat = "";
            object.lng = "";
            object.timestamp = "";
            object.userId = "";
            object.vehicleId = "";
            object.vehicleDetails = "";
            object.passengerId = "";
            object.passengerDetails = "";
            object.altitude = "";
            object.accuracy = "";
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
        if (message.vehicleId != null && message.hasOwnProperty("vehicleId"))
            object.vehicleId = message.vehicleId;
        if (message.vehicleDetails != null && message.hasOwnProperty("vehicleDetails"))
            object.vehicleDetails = message.vehicleDetails;
        if (message.passengerId != null && message.hasOwnProperty("passengerId"))
            object.passengerId = message.passengerId;
        if (message.passengerDetails != null && message.hasOwnProperty("passengerDetails"))
            object.passengerDetails = message.passengerDetails;
        if (message.altitude != null && message.hasOwnProperty("altitude"))
            object.altitude = message.altitude;
        if (message.accuracy != null && message.hasOwnProperty("accuracy"))
            object.accuracy = message.accuracy;
        return object;
    };

    /**
     * Converts this Tracking to JSON.
     * @function toJSON
     * @memberof Tracking
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Tracking.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for Tracking
     * @function getTypeUrl
     * @memberof Tracking
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    Tracking.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/Tracking";
    };

    return Tracking;
})();

module.exports = $root;
