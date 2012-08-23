Util.CreateInheritance(Cube, GameObject);

function Cube(size)
{
	this.GameObject();

	this.SetShader("basic");

	this.cubeSize = ((size) ? size : 1);

	var h = this.cubeSize / 2;

	this.vertices = [
		[-h,  h,  h],  //0
		[-h, -h,  h],  //1
		[ h, -h,  h],  //2
		[ h,  h,  h],  //3
		[-h,  h, -h],  //4
		[-h, -h, -h],  //5
		[ h, -h, -h],  //6
		[ h,  h, -h]   //7
	];

	this.indices = [
		[0, 2, 1],
		[0, 3, 2],
		[3, 6, 2],
		[3, 7, 6],
		[7, 5, 6],
		[7, 4, 6],
		[4, 1, 5],
		[4, 0, 1],
		[4, 3, 0],
		[4, 7, 3],
		[1, 2, 5],
		[2, 6, 5]
	];	

	this.vertexBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);
	this.vertexBuffer.itemSize = 3;
	this.vertexBuffer.numItems = this.vertices.length / 3;

	this.numIndices = this.indices.length;
	this.indexBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indices), gl.STREAM_DRAW);
	this.indexBuffer.itemSize = 1;
	this.indexBuffer.numItems = this.numIndices;
};

Cube.prototype.Update = function()
{
	this.transform.position.add(Vector.FORWARD.x(0.1 * Time.Delta()));
};

Cube.prototype.Render = function()
{
	gl.useProgram(this.shader.program);

	this.shader.wMatrix = this.transform.GetWorldMatrix();

	this.shader.DrawSetup();

	gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
	gl.vertexAttribPointer(this.shader.program.vertexPositionAttribute,
						   this.vertexBuffer.itemSize,
						   gl.FLOAT,
						   false,
						   0,
						   0);

	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
	gl.drawElements(gl.TRIANGLE_STRIP, this.indexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
};