function GL(canvas)
{
	var context = canvas.getContext("experimental-webgl");

	context.viewportWidth = canvas.width;
	context.viewportHeight = canvas.height;
	context.view = Matrix.I(4);
	context.projection = Matrix.I(4);

	return context
};
