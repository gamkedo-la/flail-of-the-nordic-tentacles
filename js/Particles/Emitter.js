function Emitter(point,velocity,spread)
{
	this.pos = point; //Vector
	this.vel = velocity; //Vector
	this.spread = spread || Math.PI / 32; //possible angles = velocity +/- spread

	this.color = "#999";
	this.texture = "";
}

Emitter.prototype.emitParticle = function()
{
	let ang = this.vel.getAng() + this.spread - (Math.random() * this.spread * 2);
	let magnitude = this.vel.getMagnitude();
	let pos = new Vector(this.pos.x,this.pos.y);
	let vel = Vector.getNewVectorFromAngMag(ang,magnitude);

	return new Particle(pos,vel);
}