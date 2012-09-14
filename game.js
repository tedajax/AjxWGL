function Game(canvas)
{
	Game.canvas = canvas;

	gl(Game.canvas);
	
	this.camera = new Camera();

	Game.camera = this.camera;

	this.camera.GetViewMatrix();

	this.basicfx = Shaders().PushShader(new BasicShader());

	this.gameObjects = [];
	this.gameObjects.push(new Spinner());
	//this.gameObjects.push(new Cube());
	//this.gameObjects.push(new GLQuad());

	this.gameObjects.push(new TerrainController());

	this.cameraSpeed = 25.0;

	this.camera.transform.position = $V([0.0, 2.0, 10.0]);
};

Game.prototype.Initialize = function()
{
	gl().enable(gl().DEPTH_TEST);
	gl().depthFunc(gl().LESS);
	gl().enable(gl().BLEND);	
	gl().blendFunc(gl().SRC_ALPHA, gl().ONE_MINUS_SRC_ALPHA);

	gl().clearColor(0.0, 0.0, 0.0, 1.0);
	gl().clearDepth(1.0);
};

Game.prototype.Update = function()
{
	if (Input.GetKey(Keys.D))
		this.camera.transform.position = this.camera.transform.position.add(this.camera.transform.Right().x(this.cameraSpeed * Time.Delta()).to3D());
	if (Input.GetKey(Keys.A))
		this.camera.transform.position = this.camera.transform.position.add(this.camera.transform.Left().x(this.cameraSpeed * Time.Delta()).to3D());
	if (Input.GetKey(Keys.W))
		this.camera.transform.position = this.camera.transform.position.add(this.camera.transform.Forward().x(this.cameraSpeed * Time.Delta()).to3D());
	if (Input.GetKey(Keys.S))
		this.camera.transform.position = this.camera.transform.position.add(this.camera.transform.Backward().x(this.cameraSpeed * Time.Delta()).to3D());
	if (Input.GetKey(Keys.UP))
		this.camera.transform.position = this.camera.transform.position.add(this.camera.transform.Up().x(this.cameraSpeed * Time.Delta()).to3D());
	if (Input.GetKey(Keys.DOWN))
		this.camera.transform.position = this.camera.transform.position.add(this.camera.transform.Down().x(this.cameraSpeed * Time.Delta()).to3D());
	if (Input.GetKey(Keys.LEFT))
		this.camera.transform.rotation = this.camera.transform.rotation.add(Vector.UP.x(180 * Time.Delta()).to3D());
	if (Input.GetKey(Keys.RIGHT))
		this.camera.transform.rotation = this.camera.transform.rotation.add(Vector.UP.x(-180 * Time.Delta()).to3D());

	for (var i = 0, len = this.gameObjects.length; i < len; i++)
		this.gameObjects[i].Update();
};

Game.prototype.Render = function()
{
	gl().viewport(0, 0, Game.canvas.width, Game.canvas.height);
	gl().clear(gl().COLOR_BUFFER_BIT | gl().DEPTH_BUFFER_BIT);

	Shaders().FrameDrawSetup();
	
	R().Render();
};

Game.prototype.Unload = function()
{

};

