Util.CreateInheritance(TerrainController, Actor);

function TerrainController()
{
	this.Actor();

	this.model = new Terrain();
	this.model.BuildFromHeightmap("heightmap.png");
	R().Add(this.model);

	this.turnRate = -10;
};

TerrainController.prototype.Update = function()
{
	if (Input.GetKeyDown(Keys.Z))
		if (this.turnRate !== 0)
			this.turnRate = 0;
		else
			this.turnRate = -10;

	this.transform.rotation = this.transform.rotation.add(Vector.UP.to3D().x(this.turnRate * Time.Delta()));
	this.model.transform = this.transform;
};