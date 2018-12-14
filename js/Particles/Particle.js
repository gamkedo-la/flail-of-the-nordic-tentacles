var particles = [];

function Particle(point,velocity,acceleration)
{
	this.pos = point || new Vector(0,0);
	this.vel = velocity || new Vector(0,0);
	this.acceleration = acceleration || new Vector(0,0,);
}

Particle.prototype.move = function()
{
	this.vel.add(this.acceleration);

	this.pos.add(this.vel);
}

function addParticles(maxParticles,emissionRate)
{
	if(particles.length > maxParticles) return;

	for(var i = 0; i < emitters.length; i++)
	{
		for(var j = 0; j < emissionRate; j++)
		{
			particles.push(emitters[i].emitParticle());
		}
	}
}

function plotParticles(boundsX,boundsY)
{
	var currentParticles = [];

	for(var j = 0; j < emitters.length; j++)
	{
		for(var i = 0; i < particles.length; i++)
		{
			var particle = particles[i];
			var pos = particle.pos;

			if(pos.x < (emitters[j].pos.x - boundsX) || pos.x > (emitters[j].pos.x + boundsX) || 
				pos.y < (emitters[j].pos.y - boundsX) || pos.y > (emitters[j].pos.y + boundsY))
				continue;

			particle.move();
			currentParticles.push(particle);
		}
	}

	particles = currentParticles;
}

function drawParticles()
{
	for(var i = 0; i < particles.length; i++)
	{
		var pos = particles[i].pos;

		drawCircle(pos.x,pos.y, 1, 'blue');
	}
}