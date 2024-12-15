#ifdef GL_ES
precision mediump float;
#endif

#iChannel0 "file://ex.png"
vec3 bayerMatrix[3] = vec3[3](
        vec3(5.0, 4.0, 8.0),
        vec3(1.0, 0.0, 3.0),
        vec3(6.0, 2.0, 7.0)
    );

void mainImage(out vec4 outCol, in vec2 fragCoord) {
    vec2 uv = fragCoord / iResolution.xy;
    // uv.x *= iResolution.x / iResolution.y;
    vec4 col = vec4(1.);

    col = texture(iChannel0, uv);

    float gray = dot(col.rgb, vec3(0.299, 0.587, 0.114));
    // col.rgb = vec3(gray);

    // Determine the pixel's position in the 3x3 Bayer grid
    ivec2 gridPos = ivec2(mod(fragCoord.xy, 3.0)); // Modulo 3 for 3x3 grid

    // Get the Bayer matrix value and normalize it to [0, 1]
    float threshold = (bayerMatrix[gridPos.x][gridPos.y] + .5) / 9.0;

    if (gray < threshold) {
        // pixel is black
        // col.rgb = vec3(.0);
        col.rgb = texture(iChannel0, uv).rgb * (threshold);
    }
    else {
        // pixel is light
        // col.rgb = vec3(1.);
        col.rgb = texture(iChannel0, uv).rgb;
    }

    outCol = col;
}
