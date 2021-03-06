function Camera()
{
	this.transform = new Transform();

	Camera.ORTHOGRAPHIC = 0;
	Camera.PERSPECTIVE = 1;

	this.cameraType = Camera.PERSPECTIVE;

	this.fov = 80;
	this.aspect = gl().viewportWidth / gl().viewportHeight;
	this.near = 0.1;
	this.far = 1000;
};

Camera.prototype.LookAt = function(lookat)
{
	yawdiff = Math.atan2(lookat.e(3) - this.transform.position.e(3), lookat.e(1) - this.transform.position.e(1)) + Math.PI;
	xzdist = Math.sqrt(Math.pow(lookat.e(1) - this.transform.position.e(1), 2) + Math.pow(lookat.e(3) - this.transform.position.e(3), 2));
	pitchdiff = Math.atan2(lookat.e(2) - this.transform.position.e(2), xzdist);

	this.transform.rotation = $V([pitchdiff, yawdiff, this.transform.rotation.e(3)]);
};

Camera.prototype.GetViewMatrix = function()
{
	var ex = this.transform.position.e(1);
	var ey = this.transform.position.e(2);
	var ez = this.transform.position.e(3);

	var rotMatrix = Matrix.I(4);

	rx = Matrix.RotationX(this.transform.rotation.e(1));
	ry = Matrix.RotationY(this.transform.rotation.e(2));
	rz = Matrix.RotationZ(this.transform.rotation.e(3));
	rotMatrix = rotMatrix.x(ry);
	rotMatrix = rotMatrix.x(rx);
	rotMatrix = rotMatrix.x(rz);

	var direction = rotMatrix.multiply(Vector.FORWARD).normalize();
	var lookAt = direction.add(this.transform.position.to4D());

	var lx = lookAt.e(1);
	var ly = lookAt.e(2);
	var lz = lookAt.e(3);

	var up = rotMatrix.multiply(Vector.UP).normalize();

	var ux = up.e(1);
	var uy = up.e(2);
	var uz = up.e(3);

	 return gluLookAt(ex, ey, ez,
	 				 lx, ly, lz,
	 		  		 ux, uy, uz);
	//return gluLookAt(0, 0, -10, 0, 0, 0, 0, 1, 0);
};

Camera.prototype.GetProjectionMatrix = function()
{
	//TODO: this stuff
	if (this.cameraType === Camera.PERSPECTIVE)
	{
		return gluPerspective(this.fov, this.aspect, this.near, this.far);
	}
	else
	{
		return glOrtho(-1, 1, -1, 1, this.near, this.far);
	}
};