function GL(canvas)
{
	this.context = canvas.getContext("experimental-webgl");
	
	this.context.viewportWidth = canvas.width;
	this.context.viewportHeight = canvas.height;
};

GL.getInstance = function(canvas) 
{
	if (!GL._instance) 
		GL._instance = new GL(canvas);
	return GL._instance;
};

gl = function(canvas) { return GL.getInstance(canvas).context; };