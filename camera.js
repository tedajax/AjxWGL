function Camera()
{
	this.transform = new Transform();
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

	console.log(direction);
};