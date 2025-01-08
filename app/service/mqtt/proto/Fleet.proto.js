/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.Boarding = (function() {

    /**
     * Properties of a Boarding.
     * @exports IBoarding
     * @interface IBoarding
     * @property {string|null} [deviceId] Boarding deviceId
     * @property {string|null} [lat] Boarding lat
     * @property {string|null} [lng] Boarding lng
     * @property {string|null} [timestamp] Boarding timestamp
     * @property {string|null} [userId] Boarding userId
     * @property {string|null} [vehicleId] Boarding vehicleId
     * @property {string|null} [vehicleDetails] Boarding vehicleDetails
     * @property {string|null} [passengerId] Boarding passengerId
     * @property {string|null} [passengerDetails] Boarding passengerDetails
     * @property {string|null} [altitude] Boarding altitude
     * @property {string|null} [accuracy] Boarding accuracy
     */

    /**
     * Constructs a new Boarding.
     * @exports Boarding
     * @classdesc Represents a Boarding.
     * @implements IBoarding
     * @constructor
     * @param {IBoarding=} [properties] Properties to set
     */
    function Boarding(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Boarding deviceId.
     * @member {string} deviceId
     * @memberof Boarding
     * @instance
     */
    Boarding.prototype.deviceId = "";

    /**
     * Boarding lat.
     * @member {string} lat
     * @memberof Boarding
     * @instance
     */
    Boarding.prototype.lat = "";

    /**
     * Boarding lng.
     * @member {string} lng
     * @memberof Boarding
     * @instance
     */
    Boarding.prototype.lng = "";

    /**
     * Boarding timestamp.
     * @member {string} timestamp
     * @memberof Boarding
     * @instance
     */
    Boarding.prototype.timestamp = "";

    /**
     * Boarding userId.
     * @member {string} userId
     * @memberof Boarding
     * @instance
     */
    Boarding.prototype.userId = "";

    /**
     * Boarding vehicleId.
     * @member {string} vehicleId
     * @memberof Boarding
     * @instance
     */
    Boarding.prototype.vehicleId = "";

    /**
     * Boarding vehicleDetails.
     * @member {string} vehicleDetails
     * @memberof Boarding
     * @instance
     */
    Boarding.prototype.vehicleDetails = "";

    /**
     * Boarding passengerId.
     * @member {string} passengerId
     * @memberof Boarding
     * @instance
     */
    Boarding.prototype.passengerId = "";

    /**
     * Boarding passengerDetails.
     * @member {string} passengerDetails
     * @memberof Boarding
     * @instance
     */
    Boarding.prototype.passengerDetails = "";

    /**
     * Boarding altitude.
     * @member {string} altitude
     * @memberof Boarding
     * @instance
     */
    Boarding.prototype.altitude = "";

    /**
     * Boarding accuracy.
     * @member {string} accuracy
     * @memberof Boarding
     * @instance
     */
    Boarding.prototype.accuracy = "";

    /**
     * Creates a new Boarding instance using the specified properties.
     * @function create
     * @memberof Boarding
     * @static
     * @param {IBoarding=} [properties] Properties to set
     * @returns {Boarding} Boarding instance
     */
    Boarding.create = function create(properties) {
        return new Boarding(properties);
    };

    /**
     * Encodes the specified Boarding message. Does not implicitly {@link Boarding.verify|verify} messages.
     * @function encode
     * @memberof Boarding
     * @static
     * @param {IBoarding} message Boarding message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Boarding.encode = function encode(message, writer) {
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
     * Encodes the specified Boarding message, length delimited. Does not implicitly {@link Boarding.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Boarding
     * @static
     * @param {IBoarding} message Boarding message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Boarding.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Boarding message from the specified reader or buffer.
     * @function decode
     * @memberof Boarding
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Boarding} Boarding
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Boarding.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Boarding();
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
     * Decodes a Boarding message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Boarding
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Boarding} Boarding
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Boarding.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Boarding message.
     * @function verify
     * @memberof Boarding
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Boarding.verify = function verify(message) {
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
     * Creates a Boarding message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Boarding
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Boarding} Boarding
     */
    Boarding.fromObject = function fromObject(object) {
        if (object instanceof $root.Boarding)
            return object;
        var message = new $root.Boarding();
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
     * Creates a plain object from a Boarding message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Boarding
     * @static
     * @param {Boarding} message Boarding
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Boarding.toObject = function toObject(message, options) {
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
     * Converts this Boarding to JSON.
     * @function toJSON
     * @memberof Boarding
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Boarding.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for Boarding
     * @function getTypeUrl
     * @memberof Boarding
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    Boarding.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/Boarding";
    };

    return Boarding;
})();

$root.Alighting = (function() {

    /**
     * Properties of an Alighting.
     * @exports IAlighting
     * @interface IAlighting
     * @property {string|null} [deviceId] Alighting deviceId
     * @property {string|null} [lat] Alighting lat
     * @property {string|null} [lng] Alighting lng
     * @property {string|null} [timestamp] Alighting timestamp
     * @property {string|null} [userId] Alighting userId
     * @property {string|null} [vehicleId] Alighting vehicleId
     * @property {string|null} [vehicleDetails] Alighting vehicleDetails
     * @property {string|null} [passengerId] Alighting passengerId
     * @property {string|null} [passengerDetails] Alighting passengerDetails
     * @property {string|null} [altitude] Alighting altitude
     * @property {string|null} [accuracy] Alighting accuracy
     */

    /**
     * Constructs a new Alighting.
     * @exports Alighting
     * @classdesc Represents an Alighting.
     * @implements IAlighting
     * @constructor
     * @param {IAlighting=} [properties] Properties to set
     */
    function Alighting(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Alighting deviceId.
     * @member {string} deviceId
     * @memberof Alighting
     * @instance
     */
    Alighting.prototype.deviceId = "";

    /**
     * Alighting lat.
     * @member {string} lat
     * @memberof Alighting
     * @instance
     */
    Alighting.prototype.lat = "";

    /**
     * Alighting lng.
     * @member {string} lng
     * @memberof Alighting
     * @instance
     */
    Alighting.prototype.lng = "";

    /**
     * Alighting timestamp.
     * @member {string} timestamp
     * @memberof Alighting
     * @instance
     */
    Alighting.prototype.timestamp = "";

    /**
     * Alighting userId.
     * @member {string} userId
     * @memberof Alighting
     * @instance
     */
    Alighting.prototype.userId = "";

    /**
     * Alighting vehicleId.
     * @member {string} vehicleId
     * @memberof Alighting
     * @instance
     */
    Alighting.prototype.vehicleId = "";

    /**
     * Alighting vehicleDetails.
     * @member {string} vehicleDetails
     * @memberof Alighting
     * @instance
     */
    Alighting.prototype.vehicleDetails = "";

    /**
     * Alighting passengerId.
     * @member {string} passengerId
     * @memberof Alighting
     * @instance
     */
    Alighting.prototype.passengerId = "";

    /**
     * Alighting passengerDetails.
     * @member {string} passengerDetails
     * @memberof Alighting
     * @instance
     */
    Alighting.prototype.passengerDetails = "";

    /**
     * Alighting altitude.
     * @member {string} altitude
     * @memberof Alighting
     * @instance
     */
    Alighting.prototype.altitude = "";

    /**
     * Alighting accuracy.
     * @member {string} accuracy
     * @memberof Alighting
     * @instance
     */
    Alighting.prototype.accuracy = "";

    /**
     * Creates a new Alighting instance using the specified properties.
     * @function create
     * @memberof Alighting
     * @static
     * @param {IAlighting=} [properties] Properties to set
     * @returns {Alighting} Alighting instance
     */
    Alighting.create = function create(properties) {
        return new Alighting(properties);
    };

    /**
     * Encodes the specified Alighting message. Does not implicitly {@link Alighting.verify|verify} messages.
     * @function encode
     * @memberof Alighting
     * @static
     * @param {IAlighting} message Alighting message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Alighting.encode = function encode(message, writer) {
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
     * Encodes the specified Alighting message, length delimited. Does not implicitly {@link Alighting.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Alighting
     * @static
     * @param {IAlighting} message Alighting message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Alighting.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes an Alighting message from the specified reader or buffer.
     * @function decode
     * @memberof Alighting
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Alighting} Alighting
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Alighting.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Alighting();
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
     * Decodes an Alighting message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Alighting
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Alighting} Alighting
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Alighting.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies an Alighting message.
     * @function verify
     * @memberof Alighting
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Alighting.verify = function verify(message) {
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
     * Creates an Alighting message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Alighting
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Alighting} Alighting
     */
    Alighting.fromObject = function fromObject(object) {
        if (object instanceof $root.Alighting)
            return object;
        var message = new $root.Alighting();
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
     * Creates a plain object from an Alighting message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Alighting
     * @static
     * @param {Alighting} message Alighting
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Alighting.toObject = function toObject(message, options) {
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
     * Converts this Alighting to JSON.
     * @function toJSON
     * @memberof Alighting
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Alighting.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for Alighting
     * @function getTypeUrl
     * @memberof Alighting
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    Alighting.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/Alighting";
    };

    return Alighting;
})();

module.exports = $root;
