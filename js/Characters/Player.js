const PLAYER_ACCELERATION = 4;
const PLAYER_DECELERATION = 0.70;
const FOOTSTEP_DISTANCE = 8;
const PLAYER_BUMP_SPEED = 20;
const PLAYER_FRAME_DIM = 80;

var player = new playerClass();
var playerInventory = Inventory();

function playerClass() {
    this.centerX = 75;
    this.centerY = 75;
    this.velX = 0;
    this.velY = 0;

    this.collider;

    this.exp = new xpClass();
    this.stats = new statsClass();

    this.goingNorth = false;
    this.goingSouth = false;
    this.goingWest = false;
    this.goingEast = false;

    this.directionFaced;
    this.animFrame = 0;
    this.animDelay = FRAME_DELAY;

    this.isInCombat = false;
    this.hasEnterAnotherLevel = false;
    this.isIdle = false;
    this.waitTimeForHpRegen = 0;

    this.distSinceLastFootstep = 0;
    this.footStepCount = 0;

    this.item;

    this.isImmune = false;
    this.immunityTimer = 0;

    this.setupInput = function (north, south, west, east, north2, south2, west2, east2) {
        this.ctrlNorth = north;
        this.ctrlSouth = south;
        this.ctrlWest = west;
        this.ctrlEast = east;

        this.ctrlNorth2 = north2;
        this.ctrlSouth2 = south2;
        this.ctrlWest2 = west2;
        this.ctrlEast2 = east2;
    }

    this.init = function (image, name, footstepImage) {
        this.bitmap = image;
        this.charName = name;
        this.footstepImage = footstepImage;
        this.collider = new colliderClass(this.centerX, this.centerY, 20, 20, 0, 15);
        this.waitTimeForHpRegen = TIME_UNTIL_HP_STARTS_REGEN;

        if((this.exp != null && this.stats != null) || (this.exp != undefined && this.stats != undefined))
        {
            this.exp.init('Ragnar');
            this.stats.init(this.exp.currentLvl, 'Ragnar');
        }

        this.reset();
    }

    this.reset = function () 
    {
        if (this.homeX == undefined || this.hasEnterAnotherLevel) {
            for (var i = 0; i < worldMap[0].length; i++) {
                placePlayerAtThisSpot(this, i);
            }
        }

        this.centerX = this.homeX;
        this.centerY = this.homeY;
    }

    this.bumpAwayFrom = function (fromX, fromY) {
        if (this.centerX < fromX) {
            this.velX = -PLAYER_BUMP_SPEED;
        } else {
            this.velX = PLAYER_BUMP_SPEED;
        }

        if (this.centerY < fromY) {
            this.velY = -PLAYER_BUMP_SPEED;
        } else {
            this.velY = PLAYER_BUMP_SPEED;
        }

    }

    this.move = function () {
        if (dialogueNotShowing())
        {
            if (this.stats.isCharacterDead)
            {
                console.log("The Player has died!");
                player.reset();
                resetPlayerHealth(this.stats);
            }

            this.directionFaced = undefined;

            var nextX = this.centerX;
            var nextY = this.centerY;

            if(this.goingWest)
            {
                this.velX -= PLAYER_ACCELERATION;
            }
            else if(this.goingEast)
            {
                this.velX += PLAYER_ACCELERATION;
            }
            if(this.goingNorth)
            {
                this.velY -= PLAYER_ACCELERATION;
            }
            else if(this.goingSouth)
            {
                this.velY += PLAYER_ACCELERATION;
            }

            nextX += this.velX;
            nextY += this.velY;

            var nextTileIndex = getTileIndexAtRowCol(nextX, nextY, currentMapCols, currentMapRows);
            var nextTileType = TILE_SNOW;

            if(nextTileIndex != undefined)
            {
                nextTileType = worldMap[0][nextTileIndex];
                if(nextTileType >= TILE_ICE_1 && nextTileType <= TILE_ICE_13)
                {
                    this.velX *= 0.90;
                    this.velY *= 0.90;
                }
                else
                {
                    this.velX *= PLAYER_DECELERATION;
                    this.velY *= PLAYER_DECELERATION;
                }
            }

            if (this.velX > -0.9 && this.velX < 0.06) {
            	this.velX = 0;
            }

            if (this.velY > -0.9 && this.velY < 0.06) {
            	this.velY = 0;
            }

			nextX = Math.floor(nextX);
			nextY = Math.floor(nextY);

            this.setDirectionFaced();

            if (nextX == this.centerX && nextY == this.centerY)
            {
                // did we JUST stop moving?
                if (!this.wasIdleLastFrame) {
                    //console.log("Just stopped moving - spawning a dust puff skid effect");
                    spawnDustPuff(this);
                }

                this.isIdle = true;

            }
            else
            {
                this.isIdle = false;

                // draw footprints on the ground as we travel
                if (this.footstepImage) {
                    this.distSinceLastFootstep += Math.hypot(nextX - this.centerX, nextY - this.centerY);
                    if (this.distSinceLastFootstep >= FOOTSTEP_DISTANCE)
                    {
                        this.footStepCount++;

                        // FIXME: grass gravel ice snow twigs
                        if (this.footStepCount % 8 == 0)
                            playerSfx.iceStep[randBtweenTwoNums(0,playerSfx.iceStep.length-1)].play();
                        
                        addGroundDecal({
                            x: this.centerX,
                            y: this.centerY + 16
                        }, this.footstepImage)
                    }
                }

            }

            this.wasIdleLastFrame = this.isIdle; // so we can tell when we just stopped

			if (nextX >= TILE_W * currentMapRows)
			{
				nextX = TILE_W * currentMapRows - 1;
			}
			if (nextX < 0)
			{
				nextX = 0;
			}
			if (nextY >= TILE_H * currentMapCols - 20)
			{
				nextY = TILE_H * currentMapCols - 21;
			}
			if (nextY < 0)
			{
				nextY = 0;
			}

			//play footstep sound based on tile type

            if(!this.collider.collidingWithTerrain(nextX,nextY,true,0) && !this.collider.collidingWithTerrain(nextX,nextY,true,1))
            {
                this.centerX = nextX;
                this.centerY = nextY;
            }
            else
            {
                this.velX = 0;
                this.velY = 0;
            }

            this.collider.update(this.centerX, this.centerY);

            if (currentMap == 'snowTest' && seer.collider != undefined)
                handleNpcCollisions(this.collider);
        }
    }

    this.tileTypePickable = function(tileType,tileIndex)
    {
        if(tileType == TILE_HORN ||
            tileType == TILE_BEACON ||
            tileType == TILE_TENCTACLE ||
            tileType == TILE_EYEPATCH ||
            tileType == TILE_DICTIONARY ||
            tileType == TILE_WORMHOLE)
        {
            worldMap[0][tileIndex] = TILE_SNOW;
            console.log('I picked up a ' + tileType + '.');
            itemPickedUp();
            this.item = getNameOfTile(tileType);
            playerInventory.addItem(this.item,1);

            Item.List[this.item].event();

            if (this.item == undefined){
                this.item = "nothing";
            }
        }
    }

    this.setDirectionFaced = function () {
        //checking for W,E,S,N
        if (this.goingWest) {
            this.directionFaced = "West";
        }
        if (this.goingEast) {
            this.directionFaced = "East";
        }
        if (this.goingNorth) {
            this.directionFaced = "North";
        }
        if (this.goingSouth) {
            this.directionFaced = "South";
        }
        //checking for NW,NE,SW,SE
        if (this.goingNorth && this.goingWest) {
            this.directionFaced = "Northwest";
        }
        if (this.goingNorth && this.goingEast) {
            this.directionFaced = "Northeast";
        }
        if (this.goingSouth && this.goingWest) {
            this.directionFaced = "Southwest";
        }
        if (this.goingSouth && this.goingEast) {
            this.directionFaced = "Southeast";
        }
    }

    this.toggleImmunityCheat = function () {
        if (this.isImmune) {
            this.isImmune = false;
        } else {
            this.isImmune = true;
        }
    }

    this.immunity = function () {
        console.log(this.isImmune);
        this.immunityTimer++;
        if (this.immunityTimer <= 100)
		{
			this.isImmune = true;
        } else if (this.immunityTimer > 100) {
            this.isImmune = false;
            immunitytimer = 0;
        }
    }

    this.draw = function () {
        this.animDelay--;

        if (this.animDelay < 0) {
            this.animDelay = FRAME_DELAY;

            switch (this.directionFaced) {
                case "South":
                    this.animFrame = 0;
                    break;
                case "East":
                    this.animFrame = 1;
                    break;
                case "West":
                    this.animFrame = 2;
                    break;
                case "North":
                    this.animFrame = 3;
                    break;
            }
        }

        if(debugState)
            this.collider.draw();

        canvasContext.drawImage(this.bitmap, // Sprite Sheet reference
								this.animFrame * PLAYER_FRAME_DIM, // Source X, Frame Index
								0, // Source Y
								PLAYER_FRAME_DIM, // Frame width
								PLAYER_FRAME_DIM, // Frame height
								this.centerX - this.bitmap.width / 8, // Destination X
								this.centerY - this.bitmap.height / 2, // Destination Y
								PLAYER_FRAME_DIM, // Frame Width
								PLAYER_FRAME_DIM); // Frame Height
    }
}
