uniform mat4 uWorld;
uniform mat4 uView;
uniform mat4 uProjection;

attribute vec3 aVertexPosition;

void main()
{
	gl_Position = uProjection * uWorld * uView * vec4(aVertexPosition, 1.0);
}