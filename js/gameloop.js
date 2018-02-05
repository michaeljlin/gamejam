"use strict";

const gameLoop = (function(global){
    /**
     * Main game event loop function
     */
    const main = function(tickEnd){
        if (timeout === null){
            return main.start();
        }
        const tickStep = tickEnd - tickStart;
        gameTime += tickStep;

        if (tickStep > 0){
            listeners.queue.forEach(listenerId => {
                listeners.map.get(listenerId)({
                    start: tickStart,
                    end: tickEnd,
                    step: tickStep,
                    gameTime: gameTime
                });
            });
        }

        tickStart = tickEnd;
        timeout = global.requestAnimationFrame(main);
    };

    let timeout = null;
    let tickStart = null;
    let gameTime = 0;
    const listeners = {
        queue: [],
        map: new Map()
    };
    const windowBlurHandler = () => {
        main.pause(true);
        global.removeEventListener('blur', windowBlurHandler);
        global.addEventListener('focus', windowFocusHandler);
    };

    const windowFocusHandler = () => {
        main.start();
        global.removeEventListener('focus', windowFocusHandler);
        global.addEventListener('blur', windowBlurHandler);
    };

    /**
     * Starts game loop
     */
    main.start = function(){
        if (timeout === null){
            tickStart = performance.now();
            timeout = global.requestAnimationFrame(main);

            global.addEventListener('blur', windowBlurHandler);

            return true;
        }
        return false;
    };

    /**
     * Pauses game loop
     */
    main.pause = function(automatic = false){
        if (!automatic){
            global.removeEventListener('blur', windowBlurHandler);
            global.removeEventListener('focus', windowFocusHandler);
        }
        if (timeout !== null){
            global.cancelAnimationFrame(timeout);
            tickStart = null;
            timeout = null;
            return true;
        }
        return false;
    };

    /**
     * Stops game loop, removing all listeners
     */
    main.stop = function(){
        const pause = main.pause();
        while(listeners.queue.length > 0){
            main.removeListener(listeners.queue[0]);
        }
        gameTime = 0;
        return pause;
    };

    /**
     * Add a listener
     * @callback {function} callback to execute on each game tick
     *  @param {Object} timing
     *      @property {int} start - tick start timestamp
     *      @property {int} end - tick end timestamp
     *      @property {int} step - tick size in ms
     * @returns {Symbol} id of callback
     */
    main.addListener = function(callback){
        const id = Symbol();
        listeners.map.set(id, callback);
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
})(window);

