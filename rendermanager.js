function RenderManager()
{
	this.renderables = [];
};	

RenderManager.GetInstance = function()
{
	if (!RenderManager._instance)
		RenderManager._instance = new RenderManager();
	return RenderManager._instance;
};

RenderManager.prototype.CreateBuffer = function(data, glBufferType, glDrawMode, itemSize)
{
	if (data === null || data === undefined || data.length === 0)
		return null;

	if (glBufferType !== gl().ARRAY_BUFFER && glBufferType !== gl().ELEMENT_ARRAY_BUFFER)
		return null;

	if (itemSize === null || itemSize === undefined)
	{
		if (glBufferType === gl().ARRAY_BUFFER) itemSize = 3;
		else if (glBufferType === gl().ELEMENT_ARRAY_BUFFER) itemSize = 1;
	}

	var newBuffer;

	newBuffer = gl().createBuffer();
	gl().bindBuffer(glBufferType, newBuffer);
	gl().bufferData(glBufferType, 
					(glBufferType === gl().ARRAY_BUFFER) ? new Float32Array(data) : new Uint16Array(data),
					glDrawMode);
	newBuffer.itemSize = itemSize;
	newBuffer.numItems = data.length / newBuffer.itemSize;

	return newBuffer;
};

RenderManager.prototype.Render = function()
{
	gl().viewport(0, 0, Game.canvas.width, Game.canvas.height);
	gl().clear(gl().COLOR_BUFFER_BIT | gl().DEPTH_BUFFER_BIT);
	
	Shaders().FrameDrawSetup();

	for (var i = 0, len = this.renderables.length; i < len; i++)
		this.renderables[i].Render();
};

RenderManager.prototype.Add = function(renderable)
{
	this.renderables.push(renderable);
};

RenderManager.prototype.Remove = function(renderable)
{
	this.renderables.removeElement(renderable);
};

function R() { return RenderManager.GetInstance(); };