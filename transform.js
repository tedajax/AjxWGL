//TODO: parent/children heirarchy

function Transform()
{
	this.position = $V([0.0, 0.0, 0.0]);
	this.rotation = $V([0.0, 0.0, 0.0]); //TODO: replace with quaternion
	this.scale = $V([1.0, 1.0, 1.0]);

	this.world = Matrix.I(4);
};

