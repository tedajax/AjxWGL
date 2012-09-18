#ifdef GL_ES
	precision highp float;
#endif

varying vec3 vLightWeighting;
varying vec4 vVertexColor;

void main()
{
	gl_FragColor = vec4(vLightWeighting, 1.0);
}