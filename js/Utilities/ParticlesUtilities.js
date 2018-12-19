function getParticleImageBasedOnType(charType)
{
	//if more than one particle image exist, then pick a random one from array containing images according to whether it's mechanical or not mechanical
	if(charType == 'Wormex')
		return greenSplat;
	else if(charType == 'Tank')
		return null;
}

function getParticleLifeBasedOnImage(image)
{
	let life = {min: 1,max: 5};

	if(image != null || image != undefined)
	{
		let imageName = image.src.split("effects/")[1];

		switch(imageName)
		{
			case "green_splatter.png":
				life.min = 10;
				life.max = 20;
				break;
			default:
				life.min = 5;
				life.max = 10;
				break;
		}	

		// console.log(imageName);
		// console.log(life.min,life.max);
	}	

	return life;
}

function getParticleSizeBasedOnImage(image)
{
	let size = {min: 1,max: 5};

	if(image != null || image != undefined)
	{
		let imageName = image.src.split("effects/")[1];

		switch(imageName)
		{
			case "green_splatter.png":
				size.min = 20;
				size.max = 50;
				break;
			default:
				size.min = 5;
				size.max = 10;
				break;
		}	

		// console.log(imageName);
		// console.log(size.min,size.max);
	}

	return size;
}

function spawnEnemyBasedParticles(whichEnemy)
{
	let image = getParticleImageBasedOnType(whichEnemy.charType);
	let life = getParticleLifeBasedOnImage(image);
	let size = getParticleSizeBasedOnImage(image);

	//need a way to pass in whichEnemy's pos equation according to their specific bitmap size, 
	//angle/magnitude based whichEnemy, and spread based whichEnemy
	emitters.push(new Emitter(new Vector(whichEnemy.centerX - whichEnemy.bitmap.width/8, whichEnemy.centerY - whichEnemy.bitmap.height/2),
                                        Vector.getNewVectorFromAngMag(0,2),Math.PI));
     addParticles(Vector.randBtweenTwoNums(5,50),image,life,size);
}