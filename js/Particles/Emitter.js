var emitters = [];

function Emitter(point,velocity,spread)
{
	this.pos = point; //Vector
	this.vel = velocity; //Vector
	this.spread = spread || Math.PI / 32; //possible angles = velocity +/- spread
	this.life;

	this.color = "#999";
	this.texture = "";

	this.draw = function()
	{
		drawCircle(this.pos.x,this.pos.y, 5, 'red');
	}
}

Emitter.prototype.emitParticle = function()
{
	var ang = this.vel.getAng() + this.spread - (Math.random() * this.spread * 2);
	var magnitude = this.vel.getMagnitude();
	var pos = new Vector(this.pos.x,this.pos.y);
	var vel = Vector.getNewVectorFromAngMag(ang,magnitude);

	return new Particle(pos,vel);
}