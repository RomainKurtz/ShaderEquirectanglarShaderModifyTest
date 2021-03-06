//https://github.com/spite/THREE.CubemapToEquirectangular

THREE.EquirectanglarShader = {

	uniforms: {
		"map": { type: "t", value: null },
		"tDiffuse": { type: "t", value: null }
	},

	vertexShader: [
				"varying vec2 vUv;",
				"void main()  {",
					"vUv = vec2( 1.- uv.x, uv.y );",
					"gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
				"}"
	].join("\n"),

	fragmentShader: [

				"uniform samplerCube map;",
				"uniform sampler2D tDiffuse;",
				"varying vec2 vUv;",
				"#define M_PI 3.1415926535897932384626433832795",
				"void main()  {",
					"vec2 uv = vUv;",
					"float longitude = uv.x * 2. * M_PI - M_PI + M_PI / 2.;",
					"float latitude = uv.y * M_PI;",
					"vec3 dir = vec3(",
						" 1,",
						"1,",
						"- cos( longitude ) * sin( latitude )",
					");",
					"normalize( dir );",
					"vec4 color = textureCube( map, dir );",
					"vec4 cc = texture2D( tDiffuse, vUv );",
					"gl_FragColor = vec4( textureCube( map, dir ).rgb, color.a );",
				"}"

	].join("\n")

};
