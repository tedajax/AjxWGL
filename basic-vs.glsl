uniform mat4 uWorld;
uniform mat4 uView;
uniform mat4 uProjection;

attribute vec3 aVertexPosition;

void main()
{
	gl_Position = projection * view * world * vec4(vertex, 1.0);
}