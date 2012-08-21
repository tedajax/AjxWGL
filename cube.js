Util.CreateInheritance(GameObject, Cube);

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
};

Cube.prototype.Update = function()
{

};

Cube.prototype.Render = function()
{
	gl.useProgram(this.shader);

	this.shader.wMatrix = this.transform.GetWorldMatrix();

	this.shader.DrawSetup();
};