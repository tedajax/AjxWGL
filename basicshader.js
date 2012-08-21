Util.CreateInheritance(BasicShader, Shader);

function BasicShader()
{
	this.Shader();

	this.name = "BasicShader";

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
	this.program.vertexPositionAttribute = gl.getAttribLocation(this.program, "aVertexPosition");
	this.program.enableVertexAttribArray(this.program.vertexPositionAttribute);

	this.program.projMatrixUniform = gl.getUniformLocation(this.program, "uProjection");
	this.program.viewMatrixUniform = gl.getUniformLocation(this.program, "uView");
	this.program.worldMatrixUniform = gl.getUniformLocation(this.program, "uWorld");
};

BasicShader.prototype.FrameDrawSetup = function()
{
	gl.uniformMatrix4fv(this.program.projMatrixUniform, false, new Float32Array(this.pMatrix.flatten()));
	gl.uniformMatrix4fv(this.program.viewMatrixUniform, false, new Float32Array(this.vMatrix.flatten()));
};

BasicShader.prototype.DrawSetup = function()
{
	gl.uniformMatrix4fv(this.program.worldMatrixUniform, false, new Float32Array(this.wMatrix.flatten()));
};