function Camera()
{
	this.transform = new Transform();

	Camera.ORTHOGRAPHIC = 0;
	Camera.PERSPECTIVE = 1;

	this.cameraType = Camera.PERSPECTIVE;

	this.fov = 70;
	this.aspect = canvas.width / canvas.height;
	this.near = 1;
	this.far = 1000;
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
	var lookAt = direction.add(this.transform.position);

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
};

Camera.prototype.GetProjectionMatrix = function()
{
	return gluPerspective(this.fov, this.aspect, this.near, this.far);

	//TODO: this stuff
	// if (this.cameraType === Camera.PERSPECTIVE)
	// {

	// }
	// else
	// {

	// }
};