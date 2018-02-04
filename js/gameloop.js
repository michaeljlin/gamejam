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
     * @param {function} callback
     * @returns {Symbol} id of callback
     */
    main.addListener = function(callback){


        const id = new Symbol();

        return id;
    };

    /**
     * Removes a listener
     * @param {function} id - id of callback
     * @returns {boolean} true if callback was removed, false otherwise
     */
    main.removeListener = function(id){
        return true;
    };

    return main;
})();

