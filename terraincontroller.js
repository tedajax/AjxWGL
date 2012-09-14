Util.CreateInheritance(TerrainController, Actor);

function TerrainController()
{
	this.Actor();

	this.model = new Terrain();
	this.model.BuildFromHeightmap("heightmap.png");
	R().Add(this.model);
};

TerrainController.prototype.Update = function()
{
	this.transform.rotation = this.transform.rotation.add(Vector.UP.to3D().x(20 * Time.Delta()));
	this.model.transform = this.transform;
};