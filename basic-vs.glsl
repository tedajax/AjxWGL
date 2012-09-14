uniform mat4 uWorld;
uniform mat4 uView;
uniform mat4 uProjection;

attribute vec3 aVertexPosition;
attribute vec4 aVertexColor;

varying vec4 vVertexColor;
varying vec4 vVertexPosition;

void main()
{
	vVertexColor = aVertexColor;
	vVertexPosition = vec4(aVertexPosition, 1.0);
	gl_Position = uProjection * uView * uWorld * vec4(aVertexPosition, 1.0);

	//vVertexColor.r = aVertexPosition.y;
	//vVertexColor.g = aVertexPosition.y;
	//vVertexColor.b = aVertexPosition.y;
}