Util.CreateInheritance(GLQuad, GameObject);

function GLQuad()
{
	this.GameObject();
	this.SetShader("basic");

	this.vertices = [
		-1,  1,  0,
		-1, -1,  0,
		 1, -1,  0,
		 1,  1,  0
	];

	this.indices = [
		0, 2, 1,
		2, 0, 3
	];

	this.vertexBuffer = gl().createBuffer();
	gl().bindBuffer(gl().ARRAY_BUFFER, this.vertexBuffer);
	gl().bufferData(gl().ARRAY_BUFFER, new Float32Array(this.vertices), gl().STATIC_DRAW);
	this.vertexBuffer.itemSize = 3;
	this.vertexBuffer.numItems = this.vertices.length / this.vertexBuffer.itemSize;

	this.indexBuffer = gl().createBuffer();
	gl().bindBuffer(gl().ELEMENT_ARRAY_BUFFER, this.indexBuffer);
	gl().bufferData(gl().ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indices), gl().STATIC_DRAW);
	this.indexBuffer.itemSize = 1;
	this.indexBuffer.numItems = this.indices.length / this.indexBuffer.itemSize;
};

GLQuad.prototype.Update = function()
{

};

GLQuad.prototype.Render = function()
{
	gl().useProgram(this.shader.program);

	this.shader.wMatrix = this.transform.GetWorldMatrix();

	this.shader.DrawSetup();

	gl().bindBuffer(gl().ARRAY_BUFFER, this.vertexBuffer);
	gl().vertexAttribPointer(this.shader.program.vertexPositionAttribute,
							 this.vertexBuffer.itemSize,
							 gl().FLOAT,
							 false,
							 0,
							 0);

	gl().bindBuffer(gl().ELEMENT_ARRAY_BUFFER, this.indexBuffer);
	gl().drawElements(gl().TRIANGLES, this.indexBuffer.numItems, gl().UNSIGNED_SHORT, 0);
};