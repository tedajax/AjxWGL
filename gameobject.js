function GameObject()
{   
    this.name = "default";

    this.transform = new Transform();

    this.shader;
};

GameObject.prototype.SetShader = function(name)
{
	var shader = Shaders().GetShader(name);

	if (shader !== null && shader !== undefined)
	{
		this.shader = shader;
		return true;
	}

	return false;
};

GameObject.prototype.Initialize = function()
{
    
};

GameObject.prototype.Update = function()
{

};

GameObject.prototype.Render = function()
{
	
};
