var particles = [];

function Particle(x,y,life,angle,speed,texture = null)
{
	this.pos = {x:x,y:y};
	this.life = life;
	let angInRads = angle * Math.PI / 180;
	this.vel = {x: speed * Math.cos(angInRads), y: speed * Math.sin(angInRads)};

	this.update = function()
	{
		this.life--;

		if(this.life > 0)
		{
			this.pos.x += this.vel.x;
			this.pos.y += this.vel.y;
		}
	}
}