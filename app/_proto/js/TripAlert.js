/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.TripAlert = (function() {

    /**
     * Properties of a TripAlert.
     * @exports ITripAlert
     * @interface ITripAlert
     * @property {string|null} [deviceID] TripAlert deviceID
     * @property {number|null} [lat] TripAlert lat
     * @property {number|null} [lng] TripAlert lng
     * @property {string|null} [timestamp] TripAlert timestamp
     * @property {string|null} [userID] TripAlert userID
     * @property {string|null} [descriptionP] TripAlert descriptionP
     * @property {string|null} [vehicleID] TripAlert vehicleID
     * @property {string|null} [vehicleDetails] TripAlert vehicleDetails
     */

    /**
     * Constructs a new TripAlert.
     * @exports TripAlert
     * @classdesc Represents a TripAlert.
     * @implements ITripAlert
     * @constructor
     * @param {ITripAlert=} [properties] Properties to set
     */
    function TripAlert(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * TripAlert deviceID.
     * @member {string} deviceID
     * @memberof TripAlert
     * @instance
     */
    TripAlert.prototype.deviceID = "";

    /**
     * TripAlert lat.
     * @member {number} lat
     * @memberof TripAlert
     * @instance
     */
    TripAlert.prototype.lat = 0;

    /**
     * TripAlert lng.
     * @member {number} lng
     * @memberof TripAlert
     * @instance
     */
    TripAlert.prototype.lng = 0;

    /**
     * TripAlert timestamp.
     * @member {string} timestamp
     * @memberof TripAlert
     * @instance
     */
    TripAlert.prototype.timestamp = "";

    /**
     * TripAlert userID.
     * @member {string} userID
     * @memberof TripAlert
     * @instance
     */
    TripAlert.prototype.userID = "";

    /**
     * TripAlert descriptionP.
     * @member {string} descriptionP
     * @memberof TripAlert
     * @instance
     */
    TripAlert.prototype.descriptionP = "";

    /**
     * TripAlert vehicleID.
     * @member {string} vehicleID
     * @memberof TripAlert
     * @instance
     */
    TripAlert.prototype.vehicleID = "";

    /**
     * TripAlert vehicleDetails.
     * @member {string} vehicleDetails
     * @memberof TripAlert
     * @instance
     */
    TripAlert.prototype.vehicleDetails = "";

    /**
     * Creates a new TripAlert instance using the specified properties.
     * @function create
     * @memberof TripAlert
     * @static
     * @param {ITripAlert=} [properties] Properties to set
     * @returns {TripAlert} TripAlert instance
     */
    TripAlert.create = function create(properties) {
        return new TripAlert(properties);
    };

    /**
     * Encodes the specified TripAlert message. Does not implicitly {@link TripAlert.verify|verify} messages.
     * @function encode
     * @memberof TripAlert
     * @static
     * @param {ITripAlert} message TripAlert message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    TripAlert.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.deviceID != null && Object.hasOwnProperty.call(message, "deviceID"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.deviceID);
        if (message.lat != null && Object.hasOwnProperty.call(message, "lat"))
            writer.uint32(/* id 2, wireType 5 =*/21).float(message.lat);
        if (message.lng != null && Object.hasOwnProperty.call(message, "lng"))
            writer.uint32(/* id 3, wireType 5 =*/29).float(message.lng);
        if (message.timestamp != null && Object.hasOwnProperty.call(message, "timestamp"))
            writer.uint32(/* id 4, wireType 2 =*/34).string(message.timestamp);
        if (message.userID != null && Object.hasOwnProperty.call(message, "userID"))
            writer.uint32(/* id 5, wireType 2 =*/42).string(message.userID);
        if (message.descriptionP != null && Object.hasOwnProperty.call(message, "descriptionP"))
            writer.uint32(/* id 6, wireType 2 =*/50).string(message.descriptionP);
        if (message.vehicleID != null && Object.hasOwnProperty.call(message, "vehicleID"))
            writer.uint32(/* id 7, wireType 2 =*/58).string(message.vehicleID);
        if (message.vehicleDetails != null && Object.hasOwnProperty.call(message, "vehicleDetails"))
            writer.uint32(/* id 8, wireType 2 =*/66).string(message.vehicleDetails);
        return writer;
    };

    /**
     * Encodes the specified TripAlert message, length delimited. Does not implicitly {@link TripAlert.verify|verify} messages.
     * @function encodeDelimited
     * @memberof TripAlert
     * @static
     * @param {ITripAlert} message TripAlert message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    TripAlert.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a TripAlert message from the specified reader or buffer.
     * @function decode
     * @memberof TripAlert
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {TripAlert} TripAlert
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    TripAlert.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.TripAlert();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1: {
                    message.deviceID = reader.string();
                    break;
                }
            case 2: {
                    message.lat = reader.float();
                    break;
                }
            case 3: {
                    message.lng = reader.float();
                    break;
                }
            case 4: {
                    message.timestamp = reader.string();
                    break;
                }
            case 5: {
                    message.userID = reader.string();
                    break;
                }
            case 6: {
                    message.descriptionP = reader.string();
                    break;
                }
            case 7: {
                    message.vehicleID = reader.string();
                    break;
                }
            case 8: {
                    message.vehicleDetails = reader.string();
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
     * Decodes a TripAlert message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof TripAlert
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {TripAlert} TripAlert
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    TripAlert.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a TripAlert message.
     * @function verify
     * @memberof TripAlert
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    TripAlert.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.deviceID != null && message.hasOwnProperty("deviceID"))
            if (!$util.isString(message.deviceID))
                return "deviceID: string expected";
        if (message.lat != null && message.hasOwnProperty("lat"))
            if (typeof message.lat !== "number")
                return "lat: number expected";
        if (message.lng != null && message.hasOwnProperty("lng"))
            if (typeof message.lng !== "number")
                return "lng: number expected";
        if (message.timestamp != null && message.hasOwnProperty("timestamp"))
            if (!$util.isString(message.timestamp))
                return "timestamp: string expected";
        if (message.userID != null && message.hasOwnProperty("userID"))
            if (!$util.isString(message.userID))
                return "userID: string expected";
        if (message.descriptionP != null && message.hasOwnProperty("descriptionP"))
            if (!$util.isString(message.descriptionP))
                return "descriptionP: string expected";
        if (message.vehicleID != null && message.hasOwnProperty("vehicleID"))
            if (!$util.isString(message.vehicleID))
                return "vehicleID: string expected";
        if (message.vehicleDetails != null && message.hasOwnProperty("vehicleDetails"))
            if (!$util.isString(message.vehicleDetails))
                return "vehicleDetails: string expected";
        return null;
    };

    /**
     * Creates a TripAlert message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof TripAlert
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {TripAlert} TripAlert
     */
    TripAlert.fromObject = function fromObject(object) {
        if (object instanceof $root.TripAlert)
            return object;
        var message = new $root.TripAlert();
        if (object.deviceID != null)
            message.deviceID = String(object.deviceID);
        if (object.lat != null)
            message.lat = Number(object.lat);
        if (object.lng != null)
            message.lng = Number(object.lng);
        if (object.timestamp != null)
            message.timestamp = String(object.timestamp);
        if (object.userID != null)
            message.userID = String(object.userID);
        if (object.descriptionP != null)
            message.descriptionP = String(object.descriptionP);
        if (object.vehicleID != null)
            message.vehicleID = String(object.vehicleID);
        if (object.vehicleDetails != null)
            message.vehicleDetails = String(object.vehicleDetails);
        return message;
    };

    /**
     * Creates a plain object from a TripAlert message. Also converts values to other types if specified.
     * @function toObject
     * @memberof TripAlert
     * @static
     * @param {TripAlert} message TripAlert
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    TripAlert.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.deviceID = "";
            object.lat = 0;
            object.lng = 0;
            object.timestamp = "";
            object.userID = "";
            object.descriptionP = "";
            object.vehicleID = "";
            object.vehicleDetails = "";
        }
        if (message.deviceID != null && message.hasOwnProperty("deviceID"))
            object.deviceID = message.deviceID;
        if (message.lat != null && message.hasOwnProperty("lat"))
            object.lat = options.json && !isFinite(message.lat) ? String(message.lat) : message.lat;
        if (message.lng != null && message.hasOwnProperty("lng"))
            object.lng = options.json && !isFinite(message.lng) ? String(message.lng) : message.lng;
        if (message.timestamp != null && message.hasOwnProperty("timestamp"))
            object.timestamp = message.timestamp;
        if (message.userID != null && message.hasOwnProperty("userID"))
            object.userID = message.userID;
        if (message.descriptionP != null && message.hasOwnProperty("descriptionP"))
            object.descriptionP = message.descriptionP;
        if (message.vehicleID != null && message.hasOwnProperty("vehicleID"))
            object.vehicleID = message.vehicleID;
        if (message.vehicleDetails != null && message.hasOwnProperty("vehicleDetails"))
            object.vehicleDetails = message.vehicleDetails;
        return object;
    };

    /**
     * Converts this TripAlert to JSON.
     * @function toJSON
     * @memberof TripAlert
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    TripAlert.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for TripAlert
     * @function getTypeUrl
     * @memberof TripAlert
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    TripAlert.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/TripAlert";
    };

    return TripAlert;
})();

module.exports = $root;
