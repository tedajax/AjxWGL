function Game(canvas)
{
	Game.canvas = canvas;
	window.gl = new GLInit(canvas);

	this.camera = new Camera();

	Game.camera = this.camera;

	this.camera.GetViewMatrix();

	this.basicfx = Shaders().PushShader(new BasicShader());

	this.gameObjects = [];
	this.gameObjects.push(new Cube());

	this.camera.transform.position = $V([0.0, 0.0, 10.0]);
};

Game.prototype.Initialize = function()
{
	gl.enable(gl.DEPTH_TEST);
	gl.depthFunc(gl.LEQUAL);
	gl.clearColor(0.0, 0.0, 0.0, 1.0);
	gl.clearDepth(1.0);
};

Game.prototype.Update = function()
{
	for (var i = 0, len = this.gameObjects.length; i < len; i++)
		this.gameObjects[i].Update();
};

Game.prototype.Render = function()
{
	gl.viewport(0, 0, canvas.width, canvas.height);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	Shaders().FrameDrawSetup();

	for (var i = 0, len = this.gameObjects.length; i < len; i++)
		this.gameObjects[i].Render();
};

Game.prototype.Unload = function()
{

};

// function Game()
// {
// 	Game.canvas = null;
// 	Game.context = null;

// 	Game.camera = null;
// };

// Game.Init = function()
// {
// 	Game.canvas = document.getElementById("canvas");
// 	Game.context = Game.canvas.getContext("2d");

// 	Game.camera = new Camera();
// 	Game.camera.Move(new Vec2(-Game.canvas.width / 2, -Game.canvas.height / 2));
// };

// Game();