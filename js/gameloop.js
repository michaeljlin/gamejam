"use strict";

const gameLoop = (function(){
    /**
     * Main game event loop function
     */
    const main = function(){

    };

    let timeoutId = null;
    const listeners = {
        queue: [],
        map: new Map()
    };

    /**
     * Starts game loop
     */
    main.start = function(){

    };

    /**
     * Pauses game loop
     */
    main.pause = function(){

    };

    /**
     * Stops game loop, removing all listeners
     */
    main.stop = function(){

    };

    /**
     * Add a listener
     * @callback {function} callback
     *  @param {Object} timing
     *      @property {int} start - tick start timestamp
     *      @property {int} end - tick end timestamp
     *      @property {int} step - tick size in ms
     * @returns {Symbol} id of callback
     */
    main.addListener = function(callback){
        const id = new Symbol();
        listeners.map.add(id, callback);
        listeners.queue.push(id);
        return id;
    };

    /**
     * Removes a listener
     * @param {function} id - id of callback
     * @returns {boolean} true if callback was removed, false otherwise
     */
    main.removeListener = function(id){
        if (listeners.map.has(id)){
            listeners.queue = listeners.queue.filter(elem => elem !== id);
            listeners.map.delete(id);
            return true;
        }
        return false;
    };

    return main;
})();

