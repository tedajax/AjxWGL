Util.CreateInheritance(TerrainShader, Shader);

function TerrainShader()
{
	this.Shader();

	this.name = "terrain";

	this.pMatrix = Matrix.I(4);
	this.vMatrix = Matrix.I(4);
	this.wMatrix = Matrix.I(4);
	this.nMatrix = Matrix.I(4);

	this.ambientColor = [0.2, 0.2, 0.2];
	this.directionalColor = [1.0, 1.0, 1.0];
	this.specularColor = [1.0, 1.0, 0.867];
	this.lightingDirection = [1.0, 20.0, 1.0];

	this.lightTime = 0.0;

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
	this.AddUniform("normal", "uNormal");
	this.AddUniform("ambient_color", "uAmbientColor");
	this.AddUniform("directional_color", "uDirectionalColor");
	this.AddUniform("specular_color", "uSpecularColor");
	this.AddUniform("lighting_direction", "uLightingDirection");
	this.AddUniform("camera_position", "uCameraPos");
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
	//this.lightTime -= Math.PI / 2 * Time.Delta();

	this.lightingDirection[0] = Math.cos(this.lightTime);
	this.lightingDirection[2] = Math.sin(this.lightTime);

	gl().useProgram(this.program);
	gl().uniformMatrix4fv(this.uniforms["world"], false, new Float32Array(this.wMatrix.flatten()));

	this.nMatrix = this.vMatrix.x(this.wMatrix);
	this.nMatrix = this.nMatrix.inverse();
	this.nMatrix = this.nMatrix.transpose();

	gl().uniformMatrix4fv(this.uniforms["normal"], false, new Float32Array(this.nMatrix.flatten()));

	camArray = game.camera.transform.position.to3D().flatten();
	gl().uniform3fv(this.uniforms["camera_position"], camArray);

	var lightDir = $V([this.lightingDirection[0], this.lightingDirection[1], this.lightingDirection[2], 1.0]);
	lightDir = this.nMatrix.multiply(lightDir);
	var adjustedLD = lightDir.toUnitVector().x(-1).to3D().flatten();
	gl().uniform3fv(this.uniforms["lighting_direction"], adjustedLD);

	gl().uniform3fv(this.uniforms["ambient_color"], this.ambientColor);
	gl().uniform3fv(this.uniforms["directional_color"], this.directionalColor);
	gl().uniform3fv(this.uniforms["specular_color"], this.specularColor);
};