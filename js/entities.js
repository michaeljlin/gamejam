"use strict";

const createEntityTracker = (function(global){
    let tracker = null;

    const createTracker = function(worldSize, playerSize, playerStartPos, tickCallback){
        if (tracker === null){
            tracker = new EntityTracker(playerSize, playerStartPos, tickCallback);
        }
        return tracker;
    };

    class EntityTracker {
        constructor(playerSize, playerStartPos, tickCallback){
            this._tickCallback = tickCallback;
            this._entities = {
                player: new PlayerEntity(playerSize, playerStartPos),
                npcs: []
            }
            this._npcTypes = new Map();
            this._spawnPeriod = timestamp => 2000;

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

            this._tickCallback(this.getPositions());
        }

        setPlayerDirection(direction){
            return this._entities.player.setDirection(direction);
        }

        defineNpcType(name, size, spawnWeight = timestamp => 1){
            map.set(name, {size, spawnWeight});
            return this;
        }

        advancePlayer(timing){
            const player = this._entities.player;
            const startVelocityX = player.getVelocity().x;
            const startPosition = player.getPosition();
            if (player.direction){
                var acceleration = player.accelerationRate * player.direction;
            } else {
                acceleration = player.frictionRate * -1 * Math.sign(startVelocityX);
                if (Math.abs(acceleration) > Math.abs(startVelocityX)){
                    acceleration = - startVelocityX;
                }
            }
            const maxSpeed = player.maxSpeed;

            let endPositionX = startPosition.x + startVelocityX * timing.step;
            player.setPosition(endPositionX, startPosition.y);
            let endVelocity = startVelocityX + acceleration;
            if (Math.abs(endVelocity) > maxSpeed){
                endVelocity = maxSpeed * Math.sign(endVelocity);
            }
            player.setVelocity(endVelocity);
        }

        advanceNpcs(timing){

        }

        checkCollisions(){

        }

        collectGarbage(){

        }

        checkNewSpawns(timing){
            if (this.readyForSpawn(timing)){
                const spawnType = this.determineSpawnType(timing);
                this.spawnNpc(spawnType);
            }
        }

        readyForSpawn(timing){

        }

        determineSpawnType(timing){
            const types = this._npcTypes.keys();
            const weights = types.map(type => (
                this._npcTypes.get(type).spawnWeight(timing.end)
            ));
            const totalWeight = weights.reduce((acc, curr) => (acc + curr), 0);
            const percentages = weights.map(weight => weight / totalWeight);
            let remainingChance = Math.random();
            for (let i = 0; i < percentages.length; i++){
                remainingChance -= percentages[i];
                if (remainingChance < 0){
                    return types[i];
                }
            }
        }

        spawnNpc(type){

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
        constructor(size, position, velocity){
            this._size = {
                width: size.width,
                height: size.height
            }
            this._position = {
                x: position.x,
                y: position.y
            };
            this._velocity = {
                x: velocity.x,
                y: velocity.y
            };
            Object.defineProperties(this._position, {
                top: {
                    enumerable: true,
                    get: () => (this._position.y),
                    set: newTop => {
                        this._position.y = newTop;
                        return this;
                    }
                },
                left: {
                    enumerable: true,
                    get: () => (this._position.x),
                    set: newLeft => {
                        this._position.x = newLeft;
                        return this;
                    }
                },
                right: {
                    enumerable: true,
                    get: () => (this._position.x + this._size.width),
                    set: newRight => {
                        this._position.x = newRight - this._size.width;
                        return this;
                    }
                },
                bottom: {
                    enumerable: true,
                    get: () => (this._position.y + this._size.height),
                    set: newBottom => {
                        this._position.y = newBottom - this._size.height;
                        return this;
                    }
                },
            });
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
        constructor(size, startPosition){
            super(size, startPosition, {x: 0, y: 0});

            this.direction = 0;

            this.maxSpeed = 0.4;
            this.accelerationRate = 0.03;
            this.frictionRate = 0.03;
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

