uniform mat4 uWorld;
uniform mat4 uView;
uniform mat4 uProjection;

attribute vec3 aVertexPosition;
attribute vec4 aVertexColor;

varying vec4 vVertexColor;

void main()
{
	vVertexColor = aVertexColor;
	gl_Position = uProjection * uView * uWorld * vec4(aVertexPosition, 1.0);

	if (aVertexPosition.y < 0.25)
		vVertexColor = vec4(0.0, 0.0, 1.0, 1.0);
	else if (aVertexPosition.y < 0.35)
		vVertexColor = vec4(0.95, 0.5, 0.25, 1.0);
	else if (aVertexPosition.y < 0.8)
		vVertexColor = vec4(0.0, 0.6, 0.0, 1.0);
	else
		vVertexColor = vec4(1.0, 1.0, 1.0, 1.0);

	//vVertexColor.r = aVertexPosition.y;
	//vVertexColor.g = aVertexPosition.y;
	//vVertexColor.b = aVertexPosition.y;
}