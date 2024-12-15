#iChannel0 "file://ex.png"
vec3 m[3] = vec3[3](
        vec3(5.0, 4.0, 8.0),
        vec3(1.0, 0.0, 3.0),
        vec3(6.0, 2.0, 7.0)
    );

void mainImage(out vec4 outCol, in vec2 fragCoord) {
    vec2 res = iResolution;
    vec2 uv = fragCoord / res.xy;
    uv.x *= res.x / res.y;
    vec4 col = texture(iChannel0, uv);

    // col.rgb = vec3(gray);

    // Determine the pixel's position in the 3x3 Bayer grid
    ivec2 gridPos = ivec2(mod(fragCoord.xy, 3.0)); // Modulo 3 for 3x3 grid

    // Get the Bayer matrix value and normalize it to [0, 1]
    float threshold = (m[gridPos.x][gridPos.y] + .5) / 9.0;
    outCol.rgb = (dot(col.rgb, vec3(1.)) < threshold) ? col * (threshold) : col;
}
