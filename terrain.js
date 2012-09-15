Util.CreateInheritance(Terrain, Renderable);

function Terrain()
{
	this.Renderable();
	this.SetShader("terrain");

	this.loaded = false;

	this.heightData;
};

Terrain.prototype.BuildFromHeightmap = function(imgstring)
{
	heightImage = new Image();
	heightImage.terrain = this;

	heightImage.onload = function()
	{
		this.terrain.BuildFromImage(heightImage);
	};

	heightImage.src = imgstring;
};	

Terrain.prototype.BuildFromImage = function(img)
{
	imgCanvas = document.createElement("canvas");
	imgContext = imgCanvas.getContext("2d");
	imgCanvas.width = img.width;
	imgCanvas.height = img.height;
	imgContext.width = img.width;
	imgContext.height = img.height;
	imgContext.drawImage(img, 0, 0);

	var heightData = imgContext.getImageData(0, 0, imgContext.width, imgContext.height);

	var width = heightData.width, height = heightData.height;
	
	this.heightData = heightData.data;
	var current = 0;
	var index = 1;

	for (var x = 0; x < width; x++)
	{
		for (var y = 0; y < height; y++)
		{
			var hd = this.heightData[index];
			index += 4;
			var h = hd / 255.0;

			this.vertices[current++] = y;
			this.vertices[current++] = h;
			this.vertices[current++] = -x;
		}
	}

	current = 0;
	for (var x = 0; x < width; x++)
	{
		for (var y = 0; y < height; y++)
		{
			this.colors[current++] = 1.0;
			this.colors[current++] = 1.0;
			this.colors[current++] = 1.0;
			this.colors[current++] = 1.0;
		}
	}

	current = 0;
	for (var x = 0; x < width - 1; x++)
	{
		for (var y = 0; y < height - 1; y++)
		{
			var ll = x + y * width;
			var lr = (x + 1) + y * width;
			var tl = x + (y + 1) * width;
			var tr = (x + 1) + (y + 1) * width;

			this.indices[current++] = tl;
			this.indices[current++] = lr;
			this.indices[current++] = ll;

			this.indices[current++] = tl;
			this.indices[current++] = tr;
			this.indices[current++] = lr;
		}
	}

	current = 0;
	for (var i = 0, len = this.indices.length / 3; i < len; i++)
	{
		i1 = this.indices[i * 3];
		i2 = this.indices[i * 3 + 1];
		i3 = this.indices[i * 3 + 2];

		vertex1 = new Vec3(this.vertices[i1 + 0], this.vertices[i1 + 1], this.vertices[i1 + 2]);
		vertex2 = new Vec3(this.vertices[i2 + 0], this.vertices[i2 + 1], this.vertices[i2 + 2]);
		vertex3 = new Vec3(this.vertices[i3 + 0], this.vertices[i3 + 1], this.vertices[i3 + 2]);

		side1 = Vec3.Sub(vertex1, vertex3);
		side2 = Vec3.Sub(vertex1, vertex2);

		normal = Vec3.Cross(side1, side2);

		this.normals[current++] = normal.x;
		this.normals[current++] = normal.y;
		this.normals[current++] = normal.z;
	}

	console.log(this.vertices.length, this.normals.length);

	this.CreateBuffers();

	this.loaded = true;

	this.transform.position = $V([-width / 2.0, 0.0, height / 2.0]);
	this.transform.scale = $V([1.0, 64.0, 1.0]);
};

Renderable.prototype.CreateBuffers = function()
{
	this.vertexBuffer = R().CreateBuffer(this.vertices, gl().ARRAY_BUFFER, gl().STATIC_DRAW);
	this.normalBuffer = R().CreateBuffer(this.normals, gl().ARRAY_BUFFER, gl().STATIC_DRAW);
	this.colorBuffer = R().CreateBuffer(this.colors, gl().ARRAY_BUFFER, gl().STATIC_DRAW, 4);
	this.indexBuffer = R().CreateBuffer(this.indices, gl().ELEMENT_ARRAY_BUFFER, gl().STATIC_DRAW);
};

Terrain.prototype.Render = function()
{
	if (!this.loaded) return;

	gl().useProgram(this.shader.program);

	this.shader.wMatrix = this.transform.GetWorldMatrix();
	this.shader.DrawSetup();

	gl().bindBuffer(gl().ARRAY_BUFFER, this.vertexBuffer);
	gl().vertexAttribPointer(this.shader.attribs["position"],
						   	 this.vertexBuffer.itemSize,
						     gl().FLOAT,
						   	 false,
						   	 0,
						   	 0);

	gl().bindBuffer(gl().ARRAY_BUFFER, this.normalBuffer);
	gl().vertexAttribPointer(this.shader.attribs["normal"],
							 gl().FLOAT,
							 false,
							 0,
							 0);

	gl().bindBuffer(gl().ARRAY_BUFFER, this.colorBuffer);
	gl().vertexAttribPointer(this.shader.attribs["color"],
							 this.colorBuffer.itemSize,
							 gl().FLOAT,
							 false,
							 0,
							 0);

	gl().bindBuffer(gl().ELEMENT_ARRAY_BUFFER, this.indexBuffer);
	gl().drawElements(gl().TRIANGLES, this.indexBuffer.numItems, gl().UNSIGNED_SHORT, 0);
};

