precision mediump float;

varying vec4 vVertexColor;
varying vec4 vVertexPosition;

void main()
{
	if (vVertexPosition.y < 0.25)
		gl_FragColor = vec4(0.0, 0.0, 1.0, 1.0) * vVertexColor;
	else if (vVertexPosition.y < 0.35)
		gl_FragColor = vec4(0.95, 0.5, 0.25, 1.0) * vVertexColor;
	else if (vVertexPosition.y < 0.8)
		gl_FragColor = vec4(0.0, 0.6, 0.0, 1.0) * vVertexColor;
	else
		gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0) * vVertexColor;

	//gl_FragColor = vVertexColor;
}