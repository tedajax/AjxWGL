Util.CreateInheritance(BasicShader, Shader);

function BasicShader()
{
	this.Shader();

	this.name = "basic";

	this.pMatrix = Matrix.I(4);
	this.vMatrix = Matrix.I(4);
	this.wMatrix = Matrix.I(4);

	this.InitLocales();
};

BasicShader.prototype.FragFileString = function()
{
	return Util.GetFileString(Shader.SHADER_DIR + "basic-fs.glsl");
};

BasicShader.prototype.VertFileString = function()
{
	return Util.GetFileString(Shader.SHADER_DIR + "basic-vs.glsl");
};

BasicShader.prototype.InitLocales = function()
{
	gl().useProgram(this.program);

	this.AddAttribute("position", "aVertexPosition");
	this.AddAttribute("color", "aVertexColor");
	
	this.AddUniform("projection", "uProjection");
	this.AddUniform("view", "uView");
	this.AddUniform("world", "uWorld");
};

BasicShader.prototype.FrameDrawSetup = function()
{
	gl().useProgram(this.program);

	this.pMatrix = Game.camera.GetProjectionMatrix();
	this.vMatrix = Game.camera.GetViewMatrix();

	gl().uniformMatrix4fv(this.uniforms["projection"], false, new Float32Array(this.pMatrix.flatten()));
	gl().uniformMatrix4fv(this.uniforms["view"], false, new Float32Array(this.vMatrix.flatten()));
};

BasicShader.prototype.DrawSetup = function()
{
	gl().useProgram(this.program);
	gl().uniformMatrix4fv(this.uniforms["world"], false, new Float32Array(this.wMatrix.flatten()));
};