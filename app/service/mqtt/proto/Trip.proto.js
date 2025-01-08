/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.Alert = (function() {

    /**
     * Properties of an Alert.
     * @exports IAlert
     * @interface IAlert
     * @property {string|null} [deviceId] Alert deviceId
     * @property {string|null} [lat] Alert lat
     * @property {string|null} [lng] Alert lng
     * @property {string|null} [timestamp] Alert timestamp
     * @property {string|null} [userId] Alert userId
     * @property {string|null} [description] Alert description
     * @property {string|null} [vehicleId] Alert vehicleId
     * @property {string|null} [vehicleDetails] Alert vehicleDetails
     */

    /**
     * Constructs a new Alert.
     * @exports Alert
     * @classdesc Represents an Alert.
     * @implements IAlert
     * @constructor
     * @param {IAlert=} [properties] Properties to set
     */
    function Alert(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Alert deviceId.
     * @member {string} deviceId
     * @memberof Alert
     * @instance
     */
    Alert.prototype.deviceId = "";

    /**
     * Alert lat.
     * @member {string} lat
     * @memberof Alert
     * @instance
     */
    Alert.prototype.lat = "";

    /**
     * Alert lng.
     * @member {string} lng
     * @memberof Alert
     * @instance
     */
    Alert.prototype.lng = "";

    /**
     * Alert timestamp.
     * @member {string} timestamp
     * @memberof Alert
     * @instance
     */
    Alert.prototype.timestamp = "";

    /**
     * Alert userId.
     * @member {string} userId
     * @memberof Alert
     * @instance
     */
    Alert.prototype.userId = "";

    /**
     * Alert description.
     * @member {string} description
     * @memberof Alert
     * @instance
     */
    Alert.prototype.description = "";

    /**
     * Alert vehicleId.
     * @member {string} vehicleId
     * @memberof Alert
     * @instance
     */
    Alert.prototype.vehicleId = "";

    /**
     * Alert vehicleDetails.
     * @member {string} vehicleDetails
     * @memberof Alert
     * @instance
     */
    Alert.prototype.vehicleDetails = "";

    /**
     * Creates a new Alert instance using the specified properties.
     * @function create
     * @memberof Alert
     * @static
     * @param {IAlert=} [properties] Properties to set
     * @returns {Alert} Alert instance
     */
    Alert.create = function create(properties) {
        return new Alert(properties);
    };

    /**
     * Encodes the specified Alert message. Does not implicitly {@link Alert.verify|verify} messages.
     * @function encode
     * @memberof Alert
     * @static
     * @param {IAlert} message Alert message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Alert.encode = function encode(message, writer) {
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
        if (message.description != null && Object.hasOwnProperty.call(message, "description"))
            writer.uint32(/* id 6, wireType 2 =*/50).string(message.description);
        if (message.vehicleId != null && Object.hasOwnProperty.call(message, "vehicleId"))
            writer.uint32(/* id 7, wireType 2 =*/58).string(message.vehicleId);
        if (message.vehicleDetails != null && Object.hasOwnProperty.call(message, "vehicleDetails"))
            writer.uint32(/* id 8, wireType 2 =*/66).string(message.vehicleDetails);
        return writer;
    };

    /**
     * Encodes the specified Alert message, length delimited. Does not implicitly {@link Alert.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Alert
     * @static
     * @param {IAlert} message Alert message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Alert.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes an Alert message from the specified reader or buffer.
     * @function decode
     * @memberof Alert
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Alert} Alert
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Alert.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Alert();
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
                    message.description = reader.string();
                    break;
                }
            case 7: {
                    message.vehicleId = reader.string();
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
     * Decodes an Alert message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Alert
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Alert} Alert
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Alert.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies an Alert message.
     * @function verify
     * @memberof Alert
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Alert.verify = function verify(message) {
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
        if (message.description != null && message.hasOwnProperty("description"))
            if (!$util.isString(message.description))
                return "description: string expected";
        if (message.vehicleId != null && message.hasOwnProperty("vehicleId"))
            if (!$util.isString(message.vehicleId))
                return "vehicleId: string expected";
        if (message.vehicleDetails != null && message.hasOwnProperty("vehicleDetails"))
            if (!$util.isString(message.vehicleDetails))
                return "vehicleDetails: string expected";
        return null;
    };

    /**
     * Creates an Alert message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Alert
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Alert} Alert
     */
    Alert.fromObject = function fromObject(object) {
        if (object instanceof $root.Alert)
            return object;
        var message = new $root.Alert();
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
        if (object.description != null)
            message.description = String(object.description);
        if (object.vehicleId != null)
            message.vehicleId = String(object.vehicleId);
        if (object.vehicleDetails != null)
            message.vehicleDetails = String(object.vehicleDetails);
        return message;
    };

    /**
     * Creates a plain object from an Alert message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Alert
     * @static
     * @param {Alert} message Alert
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Alert.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.deviceId = "";
            object.lat = "";
            object.lng = "";
            object.timestamp = "";
            object.userId = "";
            object.description = "";
            object.vehicleId = "";
            object.vehicleDetails = "";
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
        if (message.description != null && message.hasOwnProperty("description"))
            object.description = message.description;
        if (message.vehicleId != null && message.hasOwnProperty("vehicleId"))
            object.vehicleId = message.vehicleId;
        if (message.vehicleDetails != null && message.hasOwnProperty("vehicleDetails"))
            object.vehicleDetails = message.vehicleDetails;
        return object;
    };

    /**
     * Converts this Alert to JSON.
     * @function toJSON
     * @memberof Alert
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Alert.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for Alert
     * @function getTypeUrl
     * @memberof Alert
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    Alert.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/Alert";
    };

    return Alert;
})();

$root.Rating = (function() {

    /**
     * Properties of a Rating.
     * @exports IRating
     * @interface IRating
     * @property {string|null} [deviceId] Rating deviceId
     * @property {string|null} [lat] Rating lat
     * @property {string|null} [lng] Rating lng
     * @property {string|null} [timestamp] Rating timestamp
     * @property {string|null} [userId] Rating userId
     * @property {string|null} [description] Rating description
     * @property {string|null} [vehicleId] Rating vehicleId
     * @property {string|null} [vehicleDetails] Rating vehicleDetails
     */

    /**
     * Constructs a new Rating.
     * @exports Rating
     * @classdesc Represents a Rating.
     * @implements IRating
     * @constructor
     * @param {IRating=} [properties] Properties to set
     */
    function Rating(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Rating deviceId.
     * @member {string} deviceId
     * @memberof Rating
     * @instance
     */
    Rating.prototype.deviceId = "";

    /**
     * Rating lat.
     * @member {string} lat
     * @memberof Rating
     * @instance
     */
    Rating.prototype.lat = "";

    /**
     * Rating lng.
     * @member {string} lng
     * @memberof Rating
     * @instance
     */
    Rating.prototype.lng = "";

    /**
     * Rating timestamp.
     * @member {string} timestamp
     * @memberof Rating
     * @instance
     */
    Rating.prototype.timestamp = "";

    /**
     * Rating userId.
     * @member {string} userId
     * @memberof Rating
     * @instance
     */
    Rating.prototype.userId = "";

    /**
     * Rating description.
     * @member {string} description
     * @memberof Rating
     * @instance
     */
    Rating.prototype.description = "";

    /**
     * Rating vehicleId.
     * @member {string} vehicleId
     * @memberof Rating
     * @instance
     */
    Rating.prototype.vehicleId = "";

    /**
     * Rating vehicleDetails.
     * @member {string} vehicleDetails
     * @memberof Rating
     * @instance
     */
    Rating.prototype.vehicleDetails = "";

    /**
     * Creates a new Rating instance using the specified properties.
     * @function create
     * @memberof Rating
     * @static
     * @param {IRating=} [properties] Properties to set
     * @returns {Rating} Rating instance
     */
    Rating.create = function create(properties) {
        return new Rating(properties);
    };

    /**
     * Encodes the specified Rating message. Does not implicitly {@link Rating.verify|verify} messages.
     * @function encode
     * @memberof Rating
     * @static
     * @param {IRating} message Rating message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Rating.encode = function encode(message, writer) {
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
        if (message.description != null && Object.hasOwnProperty.call(message, "description"))
            writer.uint32(/* id 6, wireType 2 =*/50).string(message.description);
        if (message.vehicleId != null && Object.hasOwnProperty.call(message, "vehicleId"))
            writer.uint32(/* id 7, wireType 2 =*/58).string(message.vehicleId);
        if (message.vehicleDetails != null && Object.hasOwnProperty.call(message, "vehicleDetails"))
            writer.uint32(/* id 8, wireType 2 =*/66).string(message.vehicleDetails);
        return writer;
    };

    /**
     * Encodes the specified Rating message, length delimited. Does not implicitly {@link Rating.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Rating
     * @static
     * @param {IRating} message Rating message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Rating.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Rating message from the specified reader or buffer.
     * @function decode
     * @memberof Rating
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Rating} Rating
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Rating.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Rating();
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
                    message.description = reader.string();
                    break;
                }
            case 7: {
                    message.vehicleId = reader.string();
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
     * Decodes a Rating message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Rating
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Rating} Rating
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Rating.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Rating message.
     * @function verify
     * @memberof Rating
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Rating.verify = function verify(message) {
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
        if (message.description != null && message.hasOwnProperty("description"))
            if (!$util.isString(message.description))
                return "description: string expected";
        if (message.vehicleId != null && message.hasOwnProperty("vehicleId"))
            if (!$util.isString(message.vehicleId))
                return "vehicleId: string expected";
        if (message.vehicleDetails != null && message.hasOwnProperty("vehicleDetails"))
            if (!$util.isString(message.vehicleDetails))
                return "vehicleDetails: string expected";
        return null;
    };

    /**
     * Creates a Rating message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Rating
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Rating} Rating
     */
    Rating.fromObject = function fromObject(object) {
        if (object instanceof $root.Rating)
            return object;
        var message = new $root.Rating();
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
        if (object.description != null)
            message.description = String(object.description);
        if (object.vehicleId != null)
            message.vehicleId = String(object.vehicleId);
        if (object.vehicleDetails != null)
            message.vehicleDetails = String(object.vehicleDetails);
        return message;
    };

    /**
     * Creates a plain object from a Rating message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Rating
     * @static
     * @param {Rating} message Rating
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Rating.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.deviceId = "";
            object.lat = "";
            object.lng = "";
            object.timestamp = "";
            object.userId = "";
            object.description = "";
            object.vehicleId = "";
            object.vehicleDetails = "";
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
        if (message.description != null && message.hasOwnProperty("description"))
            object.description = message.description;
        if (message.vehicleId != null && message.hasOwnProperty("vehicleId"))
            object.vehicleId = message.vehicleId;
        if (message.vehicleDetails != null && message.hasOwnProperty("vehicleDetails"))
            object.vehicleDetails = message.vehicleDetails;
        return object;
    };

    /**
     * Converts this Rating to JSON.
     * @function toJSON
     * @memberof Rating
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Rating.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for Rating
     * @function getTypeUrl
     * @memberof Rating
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    Rating.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/Rating";
    };

    return Rating;
})();

module.exports = $root;
