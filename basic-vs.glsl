uniform mat4 uWorld;
uniform mat4 uView;
uniform mat4 uProjection;

attribute vec3 aVertexPosition;

void main()
{
	gl_Position = uProjection * uView * uWorld * vec4(aVertexPosition, 1.0);
	//gl_Position = vec4(aVertexPosition, 1.0) * uWorld * uView * uProjection;
}