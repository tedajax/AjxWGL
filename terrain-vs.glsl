attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec4 aVertexColor;

uniform mat4 uWorld;
uniform mat4 uView;
uniform mat4 uProjection;
uniform mat4 uNormal;

uniform vec3 uAmbientColor;
uniform vec3 uDirectionalColor;
uniform vec3 uSpecularColor;
uniform vec3 uLightingDirection;

uniform vec3 uCameraPos;

varying vec3 vLightWeighting;
varying vec4 vVertexColor;

void main()
{
	mat4 uModelView = uView * uWorld;

	gl_Position = uProjection * uModelView * vec4(aVertexPosition, 1.0);

	vVertexColor = aVertexColor;
	
	vec4 transformedNormal = uNormal * normalize(vec4(aVertexNormal, 1.0));
	float directionalLightWeighting = max(dot(transformedNormal.xyz, normalize(uLightingDirection)), 0.0);
	
	vec4 point = uModelView * vec4(aVertexPosition, 1.0);
	vec3 cameraVec = (uModelView * vec4(uCameraPos, 1.0) - point).xyz;
	vec3 h = uLightingDirection + cameraVec;
	h = normalize(h);
	float specularLightWeighting = max(pow(dot(transformedNormal.xyz, h), 8.0), 0.0);

	vLightWeighting = (uAmbientColor + uDirectionalColor * directionalLightWeighting + uSpecularColor * specularLightWeighting);
}