var emitters = [new Emitter(new Vector(1160,840),Vector.getNewVectorFromAngMag(0,2)),new Emitter(new Vector(1000,840),Vector.getNewVectorFromAngMag(0,-2)),];

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
	var ang = this.vel.getAng() + this.spread - (Math.random() * this.spread * 2);
	var magnitude = this.vel.getMagnitude();
	var pos = new Vector(this.pos.x,this.pos.y);
	var vel = Vector.getNewVectorFromAngMag(ang,magnitude);

	return new Particle(pos,vel);
}