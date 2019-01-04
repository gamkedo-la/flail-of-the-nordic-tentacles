function randBtweenTwoNums(min,max)
{
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getParticleBasedOnType(charType)
{
	let particle = null;

	switch(charType)
	{
		case 'Wormex':
			particle = usableParticles.organic[randBtweenTwoNums(0,usableParticles.organic.length - 1)];
			break;
		case 'Tank':
			particle = usableParticles.nonOrganic[randBtweenTwoNums(0,usableParticles.nonOrganic.length - 1)];
			break;
	}

	return particle;
}

function spawnEnemyBasedParticles(whichEnemy)
{
	let particle = getParticleBasedOnType(whichEnemy.charType);
	var x = (whichEnemy.centerX + player.centerX)/2;
    var y = (whichEnemy.centerY + player.centerY)/2;

	//angle/magnitude based whichEnemy, and spread based whichEnemy
	emitters.push(new Emitter(new Vector(x,y), Vector.getNewVectorFromAngMag(0,2),Math.PI));
     addParticles(randBtweenTwoNums(particle.minRate,particle.maxRate),particle.image,particle.life,particle.size);
}

function spawnFightParticles(enemy)
{
    let particle = usableParticles.fight[randBtweenTwoNums(0, usableParticles.fight.length - 1)];
    var x = (enemy.centerX + player.centerX)/2;
    var y = (enemy.centerY + player.centerY)/2;
    emitters.push(new Emitter(new Vector(x, y), Vector.getNewVectorFromAngMag(0, 2), Math.PI));
    addParticles(randBtweenTwoNums(particle.minRate,particle.maxRate), particle.image, particle.life, particle.size);
}

// dust puff for stopping/skidding, jumping/landing impacts etc
function spawnDustPuff(thing)
{
	//console.log("spawning dust particles");
	emitters.push(

		new Emitter(
			// pos
			new Vector(thing.centerX-16+randBtweenTwoNums(0,16), // pos
				randBtweenTwoNums(0,8)+thing.centerY+8), // nudged lower near feet
			// speed
			Vector.getNewVectorFromAngMag(1, 1),
			// angle range?
			Math.PI)
			);

    addParticles(
		randBtweenTwoNums(8,16), // rate
		dustParticlePic, // image
		{min:3,max:6}, // life
		{min:4,max:16}); // size
}

// player just died fx
function spawnDeathParticles(thing)
{
	console.log("spawning death particles");
	emitters.push(new Emitter(new Vector(thing.centerX,thing.centerY),Vector.getNewVectorFromAngMag(1, 1), Math.PI));
    addParticles(randBtweenTwoNums(8,16),deathParticlePic,{min:10,max:20},{min:8,max:32});
}

// enemy got hit but was not killed:
function spawnHitParticles(thing)
{
	//console.log("spawning enemy hit particles");
	emitters.push(new Emitter(new Vector(thing.centerX,thing.centerY),Vector.getNewVectorFromAngMag(1, 1), Math.PI));
    addParticles(randBtweenTwoNums(1,3),deathParticlePic,{min:5,max:10},{min:8,max:32});
}

// enemy got hit but was not killed:
function spawnLevelupParticles(thing)
{
	//console.log("spawning levelup particles");
	emitters.push(new Emitter(new Vector(thing.centerX-8,thing.centerY),Vector.getNewVectorFromAngMag(0.2, 1), Math.PI));
    addParticles(32,levelupParticlePic,{min:20,max:30},{min:8,max:32});
}