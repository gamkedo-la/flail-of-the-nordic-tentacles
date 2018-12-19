// const ACCELERATION = 0.12;
// const DECELERATION = 0.70;
var player = new playerClass();

function playerClass() {
    this.centerX = 75;
    this.centerY = 75;
    this.velX = 12;
    this.velY = 12;
    // this.accelerate = 1.0005;
    // this.decelerate = 0.7;


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

    const FOOTSTEP_DISTANCE = 8;
    this.distSinceLastFootstep = 0;

    this.item;

    this.isImmune = false;
    this.immunityTimer = 0;

    this.setupInput = function (north, south, west, east) {
        this.ctrlNorth = north;
        this.ctrlSouth = south;
        this.ctrlWest = west;
        this.ctrlEast = east;
    }

    this.init = function (image, name, footstepImage) {
        this.bitmap = image;
        this.charName = name;
        this.footstepImage = footstepImage;
        this.collider = new colliderClass(this.centerX, this.centerY, 20, 20, 0, 15);
        this.exp.init('Ragnar');
        this.waitTimeForHpRegen = TIME_UNTIL_HP_STARTS_REGEN;
        this.stats.init(this.exp.currentLvl, 'Ragnar');
        this.reset();
    }

    this.reset = function () {
        //reset player stats to last saved stats
        resetPlayerHealth(this.stats);
        //reset player health, buffs, etc
        if (this.homeX == undefined || this.hasEnterAnotherLevel) {
            for (var i = 0; i < worldMap[0].length; i++) {
                placePlayerAtThisSpot(this, i);
            }
        }

        this.centerX = this.homeX;
        this.centerY = this.homeY;
    }

    // this.stop = function () {
    //     this.nextY += (this.velY *= this.decelerate);
    //     this.nextX += (this.velX *= this.decelerate);

    // }

    this.move = function () {
        if (dialogueNotShowing()) 
        {
            if (this.stats.isCharacterDead) 
            {
                console.log("The Player has died!");
                player.reset();
            }

            this.directionFaced = undefined;

            var nextX = this.centerX;
            var nextY = this.centerY;

            if (this.goingNorth) {
                nextY -= this.velY;
            }
            if (this.goingSouth) {
                nextY += this.velY;
            }
            if (this.goingWest) {
                nextX -= this.velX;
            }
            if (this.goingEast) {
                nextX += this.velX;
            }

            // if (this.goingNorth || this.goingSouth || this.goingWest || this.goingEast) 
            // {
            //     if (this.goingNorth) {
            //         nextY -= (this.velY *= this.accelerate);
            //     }
            //     if (this.goingSouth) {
            //         nextY += (this.velY *= this.accelerate);
            //     }
            //     if (this.goingWest) {
            //         nextX -= (this.velX *= this.accelerate);
            //     }
            //     if (this.goingEast) {
            //         nextX += (this.velX *= this.accelerate);
            //     }
            // } 
            // else 
            // {
            //     for (i = 0; i++; i = 8) 
            //     {
            //         this.stop();
            //         console.log("Deaccelerate!");
            //     }
            // }
			
			nextX = Math.floor(nextX);
			nextY = Math.floor(nextY);

            this.setDirectionFaced();

            if (nextX == this.centerX && nextY == this.centerY) 
            {
                this.isIdle == true;
            } 
            else 
            {
                this.isIdle = false;
                // draw footprints on the ground as we travel
                if (this.footstepImage) {
                    this.distSinceLastFootstep += Math.hypot(nextX - this.centerX, nextY - this.centerY);
                    if (this.distSinceLastFootstep >= FOOTSTEP_DISTANCE) 
                    {
                        addGroundDecal({
                            x: this.centerX,
                            y: this.centerY + 16
                        }, this.footstepImage)
                    }
                }

            }

            if(this.collider.collidingWithTerrain(nextX,nextY,true))
            {
                this.centerX = nextX;
                this.centerY = nextY;
            }

            this.collider.update(this.centerX, this.centerY);

            if (currentMap == 'forestTest' && seer.collider != undefined)
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
        if (this.immunityTimer <= 100) {
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

        this.collider.draw();

        canvasContext.drawImage(this.bitmap, this.animFrame * FRAME_DIMENSIONS, 0, FRAME_DIMENSIONS, FRAME_DIMENSIONS,
            this.centerX - this.bitmap.width / 8, this.centerY - this.bitmap.height / 2, FRAME_DIMENSIONS, FRAME_DIMENSIONS);
    }
}
