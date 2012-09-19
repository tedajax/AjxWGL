//TODO: parent/children heirarchy

function Transform()
{
	this.position = $V([0.0, 0.0, 0.0]);
	this.rotation = $V([0.0, 0.0, 0.0]); //TODO: replace with quaternion
	this.scale = $V([1.0, 1.0, 1.0]);

	this.world = Matrix.I(4);
};

Transform.prototype.GetWorldMatrix = function()
{
	var tMat = Matrix.Translation(this.position);
	var rMat = Matrix.YawPitchRoll(this.rotation);
	var sMat = Matrix.Scale(this.scale);

	this.world = sMat.x(rMat).x(tMat);

	return this.world;
};

Transform.prototype.GetWorldMatrixNoRotation = function()
{
	var tMat = Matrix.Translation(this.position);
	var sMat = Matrix.Scale(this.scale);

	return sMat.x(tMat);
};

Transform.prototype.TransformUnitVector = function(unitv)
{
	return Matrix.YawPitchRoll(this.rotation).x(unitv);
};

Transform.prototype.Right = function()
{
	return this.TransformUnitVector(Vector.RIGHT);
};

Transform.prototype.Left = function()
{
	return this.TransformUnitVector(Vector.LEFT);
};

Transform.prototype.Forward = function()
{
	return this.TransformUnitVector(Vector.FORWARD);
};

Transform.prototype.Backward = function()
{
	return this.TransformUnitVector(Vector.BACKWARD);
};

Transform.prototype.Up = function()
{
	return this.TransformUnitVector(Vector.UP);
};

Transform.prototype.Down = function()
{
	return this.TransformUnitVector(Vector.DOWN);
};