Util.CreateInheritance(TerrainShader, Shader);

function TerrainShader()
{
	this.Shader();

	this.name = "terrain";

	this.pMatrix = Matrix.I(4);
	this.vMatrix = Matrix.I(4);
	this.wMatrix = Matrix.I(4);

	this.InitLocales();
};

TerrainShader.prototype.FragFileString = function()
{
	return Util.GetFileString(Shader.SHADER_DIR + "terrain-fs.glsl");
};

TerrainShader.prototype.VertFileString = function()
{
	return Util.GetFileString(Shader.SHADER_DIR + "terrain-vs.glsl");
};

TerrainShader.prototype.InitLocales = function()
{
	gl().useProgram(this.program);

	this.AddAttribute("position", "aVertexPosition");
	this.AddAttribute("normal", "aVertexNormal");
	this.AddAttribute("color", "aVertexColor");	

	this.AddUniform("projection", "uProjection");
	this.AddUniform("view", "uView");
	this.AddUniform("world", "uWorld");
};

TerrainShader.prototype.FrameDrawSetup = function()
{
	gl().useProgram(this.program);

	this.pMatrix = Game.camera.GetProjectionMatrix();
	this.vMatrix = Game.camera.GetViewMatrix();

	gl().uniformMatrix4fv(this.uniforms["projection"], false, new Float32Array(this.pMatrix.flatten()));
	gl().uniformMatrix4fv(this.uniforms["view"], false, new Float32Array(this.vMatrix.flatten()));
};

TerrainShader.prototype.DrawSetup = function()
{
	gl().useProgram(this.program);
	gl().uniformMatrix4fv(this.uniforms["world"], false, new Float32Array(this.wMatrix.flatten()));
};