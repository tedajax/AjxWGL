Util.CreateInheritance(Spinner, Actor);

function Spinner()
{
	this.Actor();

	this.model = new Cube();
	R().Add(this.model);
};

Spinner.prototype.Update = function()
{
	this.transform.rotation = this.transform.rotation.add(Vector.UP.to3D().x(0 * Time.Delta()));
	this.model.transform = this.transform;
	this.model.Hide();
};