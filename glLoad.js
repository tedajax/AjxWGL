function throwOnGLError(err, funcName, args) 
{
 	throw WebGLDebugUtils.glEnumToString(err) + " was caused by call to: " + funcName;
};

function logGLCall(functionName, args) 
{   
	console.log("gl." + functionName + "(" + WebGLDebugUtils.glFunctionArgsToString(functionName, args) + ")");   
};

function GL(canvas)
{
	this.context = canvas.getContext("experimental-webgl");
	
	this.context.viewportWidth = canvas.width;
	this.context.viewportHeight = canvas.height;

	this.context = WebGLDebugUtils.makeDebugContext(this.context, logGLCall, undefined);
};

GL.getInstance = function(canvas) 
{
	if (!GL._instance) 
		GL._instance = new GL(canvas);
	return GL._instance;
};

gl = function(canvas) { return GL.getInstance(canvas).context; };