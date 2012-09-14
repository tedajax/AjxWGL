Util.CreateInheritance(Cube, Renderable);

function Cube(size)
{
	this.Renderable();
	this.SetShader("basic");

	this.cubeSize = ((size) ? size : 1);

	var h = this.cubeSize / 2;

	this.vertices = [
		-h,  h,  h,  //0
		-h, -h,  h,  //1
		 h, -h,  h,  //2
		 h,  h,  h,  //3
		-h,  h, -h,  //4
		-h, -h, -h,  //5
		 h, -h, -h,  //6
		 h,  h, -h   //7
	];

	this.colors = [
		1.0, 0.0, 0.0, 1.0, //0
		0.0, 1.0, 0.0, 1.0, //1
		0.0, 0.0, 1.0, 1.0, //2
		1.0, 1.0, 0.0, 1.0, //3
		1.0, 0.0, 1.0, 1.0, //4
		0.0, 1.0, 1.0, 1.0, //5
		1.0, 1.0, 1.0, 1.0, //6
		0.0, 0.0, 0.0, 1.0  //7
	];

	this.indices = [
		0, 2, 1,
		0, 3, 2,
		3, 6, 2,
		3, 7, 6,
		4, 5, 6,
		7, 4, 6,
		4, 1, 5,
		4, 0, 1,
		4, 3, 0,
		4, 7, 3,
		1, 2, 5,
		2, 6, 5
	];	

	this.CreateBuffers();
};

Cube.prototype.CreateBuffers = function()
{
	this.vertexBuffer = R().CreateBuffer(this.vertices, gl().ARRAY_BUFFER, gl().STATIC_DRAW);
	this.colorBuffer = R().CreateBuffer(this.colors, gl().ARRAY_BUFFER, gl().STATIC_DRAW, 4);
	this.indexBuffer = R().CreateBuffer(this.indices, gl().ELEMENT_ARRAY_BUFFER, gl().STATIC_DRAW);
};

Cube.prototype.Render = function()
{
	gl().useProgram(this.shader.program);

	this.shader.wMatrix = this.transform.GetWorldMatrix();

	this.shader.DrawSetup();

	gl().bindBuffer(gl().ARRAY_BUFFER, this.vertexBuffer);
	gl().vertexAttribPointer(this.shader.attribs["position"],
						   	 this.vertexBuffer.itemSize,
						     gl().FLOAT,
						   	 false,
						   	 0,
						   	 0);

	gl().bindBuffer(gl().ARRAY_BUFFER, this.colorBuffer);
	gl().vertexAttribPointer(this.shader.attribs["color"],
							 this.colorBuffer.itemSize,
							 gl().FLOAT,
							 false,
							 0,
							 0);

	gl().bindBuffer(gl().ELEMENT_ARRAY_BUFFER, this.indexBuffer);
	gl().drawElements(gl().TRIANGLES, this.indexBuffer.numItems, gl().UNSIGNED_SHORT, 0);
};