import { EntityPose } from './reality';
import { Entity, JulianDate, Quaternion, Cartesian3, ReferenceFrame } from './cesium/cesium-imports';
/**
 * A callback for removing the event listener.
 */
export declare type RemoveCallback = () => void;
/**
 * Provides the ability raise and subscribe to an event.
 */
export declare class Event<T> {
    private _event;
    /**
     * Get the number of listeners currently subscribed to the event.
     * @return Number of listeners currently subscribed to the event.
     */
    readonly numberOfListeners: number;
    /**
      * Add an event listener.
      * @param The function to be executed when the event is raised.
      * @return A convenience function which removes this event listener when called
      */
    addEventListener(listener: (data: T) => void): RemoveCallback;
    /**
     * Remove an event listener.
     * @param The function to be unregistered.
     * @return True if the listener was removed;
     * false if the listener and scope are not registered with the event.
     */
    removeEventListener(listener: (data: T) => void): boolean;
    /**
     * Raises the event by calling each registered listener with all supplied arguments.
     * @param This method takes any number of parameters and passes them through to the listener functions.
     */
    raiseEvent(data: T): void;
}
/**
 * Create an EntityPose of the Cesium Entity based on Cesium Julian Date.
 * @param entity The entity to get position.
 * @param time The time for which to retrieve the value.
 * @return An EntityPose object with orientation, position and referenceFrame.
 */
export declare function calculatePose(entity: Entity, time: JulianDate): EntityPose;
/**
* TODO.
*/
export declare class CommandQueue {
    private _queue;
    private _currentUserData;
    private _currentCommandPending;
    /**
     * An error event.
     */
    errorEvent: Event<Error>;
    /**
     * If errorEvent has 1 listener, outputs the error message to the web console.
     */
    constructor();
    /**
     * Push the command and the data needed to run the command to the command queue.
     * @param command Any command ready to be pushed into the command queue.
     * @param userData Any data needed to run the command.
     */
    push(command: () => any | Thenable<any>, userData?: any): void;
    /**
     * Clear commandQueue.
     */
    clear(): void;
    /**
     * Get current user data.
     * @return Current userData.
     */
    readonly currentUserData: any;
    private _executeNextCommand();
}
/**
 * Get array of ancestor reference frames of a Cesium Entity.
 * @param frame A Cesium Entity to get ancestor reference frames.
 * @param frames An array of reference frames of the Cesium Entity.
 */
export declare function getAncestorReferenceFrames(frame: Entity): (Entity | ReferenceFrame)[];
/**
 * Get root reference frame of the Cesium Entity.
 * @param frames An array of reference frames of the Cesium Entity.
 * @return the first frame from ancestor reference frames array.
 */
export declare function getRootReferenceFrame(frame: Entity): Entity | ReferenceFrame;
/**
 * Gets the value of the Position property at the provided time and in the provided reference frame.
 * @param entity The entity to get position.
 * @param time The time for which to retrieve the value.
 * @param referenceFrame The desired referenceFrame of the result.
 * @param result The object to store the value into.
 * @return The modified result parameter.
 */
export declare function getEntityPositionInReferenceFrame(entity: Entity, time: JulianDate, referenceFrame: ReferenceFrame | Entity, result: Cartesian3): Cartesian3;
/**
 * Get the value of the Orientation property at the provided time and in the provided reference frame.
 * @param entity The entity to get position.
 * @param time The time for which to retrieve the value.
 * @param referenceFrame The desired referenceFrame of the result.
 * @param result The object to store the value into.
 * @return The modified result parameter.
 */
export declare function getEntityOrientationInReferenceFrame(entity: Entity, time: JulianDate, referenceFrame: ReferenceFrame | Entity, result: Quaternion): Quaternion;
/**
 * If urlParser does not have a value, throw error message "resolveURL requires DOM api".
 * If inURL is undefined, throw error message "expected inURL".
 * Otherwise, assign value of inURL to urlParser.href.
 * @param inURL A URL needed to be resolved.
 * @returns A URL ready to be parsed.
 */
export declare function resolveURL(inURL: string): string;
/**
 * Parse URL to an object describing details of the URL with href, protocol,
 * hostname, port, pathname, search, hash, host.
 * @param inURL A URL needed to be parsed.
 * @return An object showing parsed URL with href, protocol,
 * hostname, port, pathname, search, hash, host.
 */
export declare function parseURL(inURL: string): {
    href: string;
    protocol: string;
    hostname: string;
    port: string;
    pathname: string;
    search: string;
    hash: string;
    host: string;
};
/**
 * A minimal MessageEvent interface.
 */
export declare class MessageEventLike {
    constructor(data: any);
    data: any;
}
/**
 * A minimal MessagePort interface.
 */
export interface MessagePortLike {
    /**
      * A callback for handling incoming messages.
      */
    onmessage: (ev: MessageEventLike) => any;
    /**
     * Send a message through this message port.
     * @param message The message needed to be posted.
     */
    postMessage(message?: any): void;
    /**
     * Close this message port.
     */
    close?: () => void;
}
/**
 * A MessageChannel pollyfill.
 */
export declare class MessageChannelLike {
    /**
     * The first port.
     */
    port1: MessagePortLike;
    /**
     * The second port.
     */
    port2: MessagePortLike;
    /**
     * Create a MessageChannelLike instance.
     */
    constructor();
}
/**
 * A factory which creates MessageChannel or MessageChannelLike instances, depending on
 * wheter or not MessageChannel is avaialble in the execution context.
 */
export declare class MessageChannelFactory {
    /**
     * Create a MessageChannel (or MessageChannelLike) instance.
     */
    create(): MessageChannelLike;
}