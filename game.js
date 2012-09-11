function Game(canvas)
{
	Game.canvas = canvas;

	gl(Game.canvas);
	
	this.camera = new Camera();

	Game.camera = this.camera;

	this.camera.GetViewMatrix();

	this.basicfx = Shaders().PushShader(new BasicShader());

	this.gameObjects = [];
	this.gameObjects.push(new Cube());
	//this.gameObjects.push(new GLQuad());

	this.cameraSpeed = 5.0;

	this.camera.transform.position = $V([0.0, 2.0, 10.0]);
};

Game.prototype.Initialize = function()
{
	gl().enable(gl().DEPTH_TEST);
	gl().depthFunc(gl().LEQUAL);
	gl().clearColor(0.0, 0.0, 0.0, 1.0);
	gl().clearDepth(1.0);
};

Game.prototype.Update = function()
{
	if (Input.GetKey(Keys.D))
		this.camera.transform.position = this.camera.transform.position.add(Vector.RIGHT.x(this.cameraSpeed * Time.Delta()).to3D());
	if (Input.GetKey(Keys.A))
		this.camera.transform.position = this.camera.transform.position.add(Vector.LEFT.x(this.cameraSpeed * Time.Delta()).to3D());
	if (Input.GetKey(Keys.W))
		this.camera.transform.position = this.camera.transform.position.add(Vector.FORWARD.x(this.cameraSpeed * Time.Delta()).to3D());
	if (Input.GetKey(Keys.S))
		this.camera.transform.position = this.camera.transform.position.add(Vector.BACKWARD.x(this.cameraSpeed * Time.Delta()).to3D());
	if (Input.GetKey(Keys.UP))
		this.camera.transform.position = this.camera.transform.position.add(Vector.UP.x(this.cameraSpeed * Time.Delta()).to3D());
	if (Input.GetKey(Keys.DOWN))
		this.camera.transform.position = this.camera.transform.position.add(Vector.DOWN.x(this.cameraSpeed * Time.Delta()).to3D());
	if (Input.GetKey(Keys.LEFT))
		this.camera.transform.rotation = this.camera.transform.rotation.add(Vector.UP.x(45 * Time.Delta()).to3D());
	if (Input.GetKey(Keys.RIGHT))
		this.camera.transform.rotation = this.camera.transform.rotation.add(Vector.UP.x(-45 * Time.Delta()).to3D());

	for (var i = 0, len = this.gameObjects.length; i < len; i++)
		this.gameObjects[i].Update();
};

Game.prototype.Render = function()
{
	gl().viewport(0, 0, Game.canvas.width, Game.canvas.height);
	gl().clear(gl().COLOR_BUFFER_BIT | gl().DEPTH_BUFFER_BIT);

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

Game.prototype.InitShader = function()
{
	var fragString = Util.GetFileString("basic-fs.glsl");
	var vertString = Util.GetFileString("basic-vs.glsl");

	var fragShader = gl().createShader(gl().FRAGMENT_SHADER);
	gl().shaderSource(fragShader, fragString);
	gl().compileShader(fragShader);

	var vertShader = gl().createShader(gl().VERTEX_SHADER);
	gl().shaderSource(vertShader, vertString);
	gl().compileShader(vertShader);

	this.program = gl().createProgram();
	gl().attachShader(this.program, vertShader);
	gl().attachShader(this.program, fragShader);
	gl().linkProgram(this.program);

	gl().useProgram(this.program);

	this.program.vertexPositionAttribute = gl().getAttribLocation(this.program, "aVertexPosition");
	gl().enableVertexAttribArray(this.program.vertexPositionAttribute);

	this.program.projMatrixUniform = gl().getUniformLocation(this.program, "uProjection");
	this.program.viewMatrixUniform = gl().getUniformLocation(this.program, "uView");
	this.program.worldMatrixUniform = gl().getUniformLocation(this.program, "uWorld");
};

Game.prototype.SetupShaderFrame = function()
{
	gl().useProgram(this.program);

	this.pMatrix = Game.camera.GetProjectionMatrix();
	this.vMatrix = Game.camera.GetViewMatrix();

	gl().uniformMatrix4fv(this.program.projMatrixUniform, false, new Float32Array(this.pMatrix.flatten()));
	gl().uniformMatrix4fv(this.program.viewMatrixUniform, false, new Float32Array(this.vMatrix.flatten()));

	this.wMatrix = Matrix.I(4);
	gl().uniformMatrix4fv(this.program.worldMatrixUniform, false, new Float32Array(this.wMatrix.flatten()));
};

Game.prototype.InitQuad = function()
{
	this.vertices = [
		-1,  1,  0,
		-1, -1,  0,
		 1, -1,  0,
		 1,  1,  0
	];

	this.indices = [
		0, 2, 1,
		2, 0, 3
	];

	this.vertexBuffer = gl().createBuffer();
	gl().bindBuffer(gl().ARRAY_BUFFER, this.vertexBuffer);
	gl().bufferData(gl().ARRAY_BUFFER, new Float32Array(this.vertices), gl().STATIC_DRAW);
	this.vertexBuffer.itemSize = 3;
	this.vertexBuffer.numItems = this.vertices.length / this.vertexBuffer.itemSize;

	this.indexBuffer = gl().createBuffer();
	gl().bindBuffer(gl().ELEMENT_ARRAY_BUFFER, this.indexBuffer);
	gl().bufferData(gl().ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indices), gl().STATIC_DRAW);
	this.indexBuffer.itemSize = 1;
	this.indexBuffer.numItems = this.indices.length / this.indexBuffer.itemSize;
};

Game.prototype.DrawQuad = function()
{
	gl().bindBuffer(gl().ARRAY_BUFFER, this.vertexBuffer);
	gl().vertexAttribPointer(this.program.vertexPositionAttribute,
							 this.vertexBuffer.itemSize,
							 gl().FLOAT,
							 false,
							 0,
							 0);

	gl().bindBuffer(gl().ELEMENT_ARRAY_BUFFER, this.indexBuffer);
	gl().drawElements(gl().TRIANGLES, this.indexBuffer.numItems, gl().UNSIGNED_SHORT, 0);
};

Game.prototype.SetupShader = function()
{
	//gl.useProgram(this.program)
	
};