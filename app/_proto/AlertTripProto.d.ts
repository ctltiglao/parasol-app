import * as $protobuf from "protobufjs";
import Long = require("long");
/** Properties of a TripAlert. */
export interface ITripAlert {

    /** TripAlert deviceID */
    deviceID?: (string|null);

    /** TripAlert lat */
    lat?: (number|null);

    /** TripAlert lng */
    lng?: (number|null);

    /** TripAlert timestamp */
    timestamp?: (string|null);

    /** TripAlert userID */
    userID?: (string|null);

    /** TripAlert descriptionP */
    descriptionP?: (string|null);

    /** TripAlert vehicleID */
    vehicleID?: (string|null);

    /** TripAlert vehicleDetails */
    vehicleDetails?: (string|null);
}

/** Represents a TripAlert. */
export class TripAlert implements ITripAlert {

    /**
     * Constructs a new TripAlert.
     * @param [properties] Properties to set
     */
    constructor(properties?: ITripAlert);

    /** TripAlert deviceID. */
    public deviceID: string;

    /** TripAlert lat. */
    public lat: number;

    /** TripAlert lng. */
    public lng: number;

    /** TripAlert timestamp. */
    public timestamp: string;

    /** TripAlert userID. */
    public userID: string;

    /** TripAlert descriptionP. */
    public descriptionP: string;

    /** TripAlert vehicleID. */
    public vehicleID: string;

    /** TripAlert vehicleDetails. */
    public vehicleDetails: string;

    /**
     * Creates a new TripAlert instance using the specified properties.
     * @param [properties] Properties to set
     * @returns TripAlert instance
     */
    public static create(properties?: ITripAlert): TripAlert;

    /**
     * Encodes the specified TripAlert message. Does not implicitly {@link TripAlert.verify|verify} messages.
     * @param message TripAlert message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: ITripAlert, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified TripAlert message, length delimited. Does not implicitly {@link TripAlert.verify|verify} messages.
     * @param message TripAlert message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: ITripAlert, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a TripAlert message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns TripAlert
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): TripAlert;

    /**
     * Decodes a TripAlert message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns TripAlert
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): TripAlert;

    /**
     * Verifies a TripAlert message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a TripAlert message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns TripAlert
     */
    public static fromObject(object: { [k: string]: any }): TripAlert;

    /**
     * Creates a plain object from a TripAlert message. Also converts values to other types if specified.
     * @param message TripAlert
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: TripAlert, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this TripAlert to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for TripAlert
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}
