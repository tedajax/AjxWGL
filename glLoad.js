function GLInit(canvas)
{
	var context = canvas.getContext("experimental-webgl");

	context.viewportWidth = canvas.width;
	context.viewportHeight = canvas.height;
	
	return context
};
