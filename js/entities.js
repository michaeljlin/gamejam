"use strict";

const createEntityTracker = (function(global){
    let tracker = null;

    const createTracker = function(worldSize, playerSize, playerStartPos, tickCallback){
        if (tracker === null){
            tracker = new EntityTracker(worldSize, playerSize, playerStartPos, tickCallback);
        }
        return tracker;
    };

    class EntityTracker {
        constructor(worldSize, playerSize, playerStartPos, tickCallback){
            this._worldSize = worldSize;
            this._tickCallback = tickCallback;
            this._entities = {
                player: new PlayerEntity(playerSize, playerStartPos),
                npcs: []
            }
            this._npcTypes = new Map();
            this._spawnPeriod = timestamp => 2000;
            this._timeSinceLastSpawn = 0;

            this.advanceTick = this.advanceTick.bind(this);
            this.advancePlayer = this.advancePlayer.bind(this);
            this.advanceNpcs = this.advanceNpcs.bind(this);
            this.checkCollisions = this.checkCollisions.bind(this);
            this.collectGarbage = this.collectGarbage.bind(this);
            this.checkNewSpawns = this.checkNewSpawns.bind(this);
        }

        advanceTick(timing){
            this.advancePlayer(timing);
            if (this._entities.npcs.length > 0){
                this.advanceNpcs(timing);
                this.checkCollisions();
                this.collectGarbage();
            }
            this.checkNewSpawns(timing);

            this._tickCallback(this.getPositions());
        }

        setPlayerDirection(direction){
            return this._entities.player.setDirection(direction);
        }

        defineNpcType(name, size, spawnWeight = timestamp => 1){
            this._npcTypes.set(name, {size, spawnWeight});
            return this;
        }

        advancePlayer(timing){
            const player = this._entities.player;
            player.setState('normal');
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
            this._entities.npcs.forEach(npc => {
                const startPosition = npc.getPosition();
                const startVelocity = npc.getVelocity();
                const endPositionY = startPosition.y + startVelocity.y;
                npc.setPosition(startPosition.x, endPositionY);
            });
        }

        checkCollisions(){
            const player = this._entities.player;
            this._entities.npcs.forEach(npc => {
                const horizontalOverlap = 
                    (npc._position.left < player._position.right)
                    && (player._position.left < npc._position.right);
                const verticalOverlap = 
                    (npc._position.top < player._position.bottom)
                    && (player._position.top < npc._position.bottom);
                if (horizontalOverlap && verticalOverlap){
                    npc.setState('eaten');
                    player.setState('eating');
                    console.log(`Collision with ${npc.getType()}!`);
                }
            });
        }

        collectGarbage(){

        }

        checkNewSpawns(timing){
            if(this._npcTypes.keys().length === 0){
                return;
            }
            if (this.readyForSpawn(timing)){
                const spawnType = this.determineSpawnType(timing);
                this.spawnNpc(spawnType);
            }
        }

        readyForSpawn(timing){
            this._timeSinceLastSpawn += timing.step;
            const spawnPeriod = this._spawnPeriod(timing.gameTime);
            if (this._timeSinceLastSpawn > spawnPeriod){
                this._timeSinceLastSpawn -= spawnPeriod;
                return true;
            }
            return false;
        }

        determineSpawnType(timing){
            const types = this._npcTypes.keys();
            const weights = [];
            this._npcTypes.forEach(type => {
                weights.push(type.spawnWeight(timing.gameTime));
            })
            const totalWeight = weights.reduce((acc, curr) => (acc + curr), 0);
            const percentages = weights.map(weight => weight / totalWeight);
            let remainingChance = Math.random();
            for (let i = 0; i < percentages.length; i++){
                remainingChance -= percentages[i];
                const value = types.next().value;
                if (remainingChance < 0){
                    return value;
                }
            }
        }

        spawnNpc(type){
            const size = this._npcTypes.get(type).size;
            const startX = Math.random() * (this._worldSize.x - size.width);

            const npc = new NonPlayerEntity(
                type,
                size,
                {x: startX, y: 0},
                {x: 0, y: 2}
            );
            this._entities.npcs.push(npc);
        }

        getPositions(){
            const positions = {
                player: this._entities.player.getPosition(),
                npcs: this._entities.npcs.map(npc => {
                    const position = npc.getPosition();
                    position.type = npc.getType();
                    position.state = npc.getState();
                    return position;
                })
            };

            positions.player.state = this._entities.player.getState();

            return positions;
        }
    }

    class Entity {
        constructor(size, position, velocity){
            this._state = "normal";
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

        getState(){
            return this._state;
        }

        setState(newState){
            this._state = newState;
            return this;
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
        constructor(type, size, startPosition, startVelocity){
            super(size, startPosition, startVelocity);

            this._type = type;
        }

        getType(){
            return this._type;
        }
    }

    return createTracker;
})(window);

