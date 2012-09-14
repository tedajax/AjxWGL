function Renderable()
{
	this.vertices = [];
	this.indices = [];
	this.colors = [];
	this.texcoords = [];
	this.normals = [];

	this.vertexBuffer;
	this.indexBuffer;
	this.colorBuffer;
	this.texCoordBuffer;
	this.normalBuffer;

	this.hidden = false;

	this.shader;
	this.transform = new Transform();
};

Renderable.prototype.SetShader = function(name)
{
	var shader = Shaders().GetShader(name);
	if (shader !== null && shader !== undefined)
		this.shader = shader;
	else
		return false;

	return true;
}

Renderable.prototype.CreateBuffers = function()
{
	this.vertexBuffer = R().CreateBuffer(this.vertices, gl().ARRAY_BUFFER, gl().STATIC_DRAW);
	this.colorBuffer = R().CreateBuffer(this.colors, gl().ARRAY_BUFFER, gl().STATIC_DRAW, 4);
	this.indexBuffer = R().CreateBuffer(this.indices, gl().ELEMENT_ARRAY_BUFFER, gl().STATIC_DRAW);
};

Renderable.prototype.Hide = function() { this.hidden = true; };
Renderable.prototype.Show = function() { this.hidden = false; };

Renderable.prototype.Render = function()
{
	if (this.hidden) return;
};