function Game(canvas)
{
	Game.canvas = canvas;

	this.camera = new Camera();
	this.camera.GetViewMatrix();

	window.gl = new GL(canvas);
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

};

Game.prototype.Render = function()
{
	gl.viewport(0, 0, canvas.width, canvas.height);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	gl.projection = gluPerspective(70, Game.canvas.width / Game.canvas.height, 1, 1000);
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