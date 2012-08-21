function ShaderManager()
{
	this.shaders = [];
};

ShaderManager.prototype.PushShader = function(shader)
{
	for (var i = 0, len = this.shaders.length; i < len; i++)
		if (this.shaders[i].name === shader.name)
			return false;

	this.shaders.push(shader);

	return true;
};

ShaderManager.prototype.GetShader = function(name)
{
	for (var i = 0, len = this.shaders.length; i < len; i++)
		if (this.shaders[i].name === name)
			return this.shaders[i];

	return null;
};

ShaderManager.prototype.CleanShaders = function()
{
	this.shaders.length = 0;
};

ShaderManager.prototype.FrameDrawSetup = function()
{
	for (var i = 0, len = this.shaders.length; i < len; i++)
	{
		this.shaders[i].FrameDrawSetup();
	}
};

function Shaders()
{
	if (ShaderManager._instance === null || ShaderManager._instance === undefined)
		ShaderManager._instance = new ShaderManager();

	return ShaderManager._instance;
}
