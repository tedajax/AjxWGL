attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec4 aVertexColor;

uniform mat4 uWorld;
uniform mat4 uView;
uniform mat4 uProjection;

varying vec4 vVertexColor;

void main()
{
	vVertexColor = aVertexColor;
	vec3 testing = aVertexNormal;
	gl_Position = uProjection * uView * uWorld * vec4(aVertexPosition, 1.0);
}