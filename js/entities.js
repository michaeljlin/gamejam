"use strict";

const createEntityTracker = (function(global){
    let tracker = null;

    const createTracker = function(worldSize, playerStartPos){
        if (tracker === null){
            tracker = new EntityTracker(playerStartPos);
        }
        return tracker;
    };

    class EntityTracker {
        constructor(playerStartPos){
            this._playerDirection = 0;
            this._player = {
                direction: 0,
                entity: new PlayerEntity(playerStartPos)
            }

            this.advanceTick = this.advanceTick.bind(this);
            this.advancePlayer = this.advancePlayer.bind(this);
            this.advanceEntities = this.advanceEntities.bind(this);
            this.checkCollisions = this.checkCollisions.bind(this);
            this.collectGarbage = this.collectGarbage.bind(this);
            this.checkNewSpawns = this.checkNewSpawns.bind(this);
        }

        advanceTick(timing){
            this.advancePlayer(timing);
            this.advanceEntities(timing);
            this.checkCollisions();
            this.collectGarbage();
            this.checkNewSpawns(timing);
        }

        setPlayerDirection(direction){
            if ([-1, 0, 1].includes(direction)){
                this._playerDirection = direction;
                return direction;
            }
            throw new TypeError(`${direction} is not a valid direction`);
        }

        advancePlayer(timing){

        }

        advanceEntities(timing){

        }

        checkCollisions(){

        }

        collectGarbage(){

        }

        checkNewSpawns(timing){

        }
    }

    class Entity {

    }

    class PlayerEntity extends Entity {
        
    }

    return createTracker;
})(window);

