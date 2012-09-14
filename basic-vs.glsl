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

	vVertexColor.r = aVertexPosition.y;
	vVertexColor.g = 0.5;
	vVertexColor.b = aVertexPosition.y;
}