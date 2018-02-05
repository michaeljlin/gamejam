"use strict";

const createEntityTracker = (function(global){
    let tracker = null;

    const createTracker = function(worldSize, playerStartPos, tickCallback){
        if (tracker === null){
            tracker = new EntityTracker(playerStartPos, tickCallback);
        }
        return tracker;
    };

    class EntityTracker {
        constructor(playerStartPos, tickCallback){
            this._entities = {
                player: {
                    direction: 0,
                    entity: new PlayerEntity(playerStartPos)
                },
                npcs: []
            }

            this.advanceTick = this.advanceTick.bind(this);
            this.advancePlayer = this.advancePlayer.bind(this);
            this.advanceNpcs = this.advanceNpcs.bind(this);
            this.checkCollisions = this.checkCollisions.bind(this);
            this.collectGarbage = this.collectGarbage.bind(this);
            this.checkNewSpawns = this.checkNewSpawns.bind(this);
        }

        advanceTick(timing){
            this.advancePlayer(timing);
            this.advanceNpcs(timing);
            this.checkCollisions();
            this.collectGarbage();
            this.checkNewSpawns(timing);

            tickCallback(this.getPositions());
        }

        setPlayerDirection(direction){
            this._entities.player.setDirection(direction);
        }

        advancePlayer(timing){
            const player = this._entities.player;
            const startVelocity = player.getVelocity().x;
            const startPosition = player.getPosition().x;
            const acceleration = player.accelerationRate * player.direction;
            const maxSpeed = player.maxSpeed;

            let endPosition = startPosition;
            player.setPosition(endPosition);
            let endVelocity = startVelocity + acceleration;
            if (Math.abs(endVelocity) > maxSpeed){
                endVelocity = maxSpeed * Math.sign(endVelocity);
            }
        }

        advanceNpcs(timing){

        }

        checkCollisions(){

        }

        collectGarbage(){

        }

        checkNewSpawns(timing){

        }

        getPositions(){
            const positions = {
                player: this._entities.player.getPosition(),
                npcs: []
            };

            positions.player.state = "normal";

            return positions;
        }
    }

    class Entity {
        constructor(position, velocity){
            this._position = {
                x: position.x,
                y: position.y
            };
            this._velocity = {
                x: velocity.x,
                y: velocity.y
            };
        }

        getPosition(){
            return {
                x: this._position.x,
                y: this._position.y
            };
        }

        setPosition(x, y){
            this._position.x = x;
            this._position.y = y;
            return this;
        }

        getVelocity(){
            return {
                x: this._velocity.x,
                y: this._velocity.y
            };
        }

        setVelocity(x, y){
            this._velocity.x = x;
            this._velocity.y = y;
            return this;
        }
    }

    class PlayerEntity extends Entity {
        constructor(startPosition){
            super(startPosition, {x: 0, y: 0});

            this.direction = 0;
            this.maxSpeed = 10;
            this.accelerationRate = 0.001;
        }

        setDirection(direction){
            if ([-1, 0, 1].includes(direction)){
                this.direction = direction;
                return direction;
            }
            throw new TypeError(`${direction} is not a valid direction`);
        }

        setVelocity(x){
            this._velocity.x = x;
            return this;
        }
    }

    class NonPlayerEntity extends Entity {
        constructor(startPosition, startVelocity){
            super(startPosition, startVelocity);
        }
    }

    return createTracker;
})(window);

