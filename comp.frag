#iChannel0 "file://ex.png"
vec3 m[3] = vec3[3](
        vec3(5., 4., 8.), vec3(1., .0, 3.), vec3(6., 2., 7.));
void mainImage(out vec4 c, in vec2 d) {
    vec3 e = iResolution;
    vec2 f = d / e.xy;
    f.x *= e.x / e.y;
    vec4 g = texture(iChannel0, f);
    ivec2 h = ivec2(mod(d.xy, 3.));
    float i = (m[h.x][h.y] + .5) / 9.;
    c.rgba = (dot(g.rgb, vec3(1.)) < i) ? g * (i) : g;
}
