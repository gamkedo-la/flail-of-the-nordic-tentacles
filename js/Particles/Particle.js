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