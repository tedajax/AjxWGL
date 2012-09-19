#ifdef GL_ES
	precision highp float;
#endif

uniform vec3 uLightingDirection;

varying vec3 vVertexPosition;
varying vec4 vVertexNormal;
varying vec4 vVertexColor;


varying vec3 vAmbientColor;
varying vec3 vDirectionalColor;

void main()
{
	vec4 color = vec4(0.0, 0.0, 0.0, 0.0);

	if (vVertexPosition.y < 0.25)
		color = vec4(0.0, 0.0, 1.0, 1.0) * vVertexColor;
	else if (vVertexPosition.y < 0.35)
		color = vec4(0.95, 0.5, 0.25, 1.0) * vVertexColor;
	else if (vVertexPosition.y < 0.8)
		color = vec4(0.0, 0.6, 0.0, 1.0) * vVertexColor;
	else
		color = vec4(1.0, 1.0, 1.0, 1.0) * vVertexColor;

	float directionalLightWeighting = max(dot(vVertexNormal.xyz, uLightingDirection), 0.0) * 100.0;	

	vec3 lightWeighting = vAmbientColor + vDirectionalColor * directionalLightWeighting;

	gl_FragColor = color * vec4(lightWeighting, 1.0);
}