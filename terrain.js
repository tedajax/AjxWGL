Util.CreateInheritance(Terrain, Renderable);

function Terrain()
{
	this.Renderable();
	this.SetShader("basic");

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

	this.CreateBuffers();

	this.loaded = true;

	this.transform.position = $V([-width / 2.0, 0.0, height / 2.0]);
	this.transform.scale = $V([1.0, 32.0, 1.0]);
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

