#include "ReShade.fxh"

uniform float2 RESOLUTION = float2(1920., 1080);

uniform float3 bayerMatrix[3] = {
        float3(5.0, 4.0, 8.0),
        float3(1.0, 0.0, 3.0),
        float3(6.0, 2.0, 7.0)
    };

float3 main(float4 position : SV_Position, float2 texcoord : TexCoord) : SV_Target
{
    float2 uv = texcoord.xy;
    float3 texCol = tex2D(ReShade::BackBuffer, uv).rgb;

    float gray = dot(texCol.rgb, float3(0.299, 0.587, 0.114));
    // col.rgb = vec3(gray);

    // Determine the pixel's position in the 3x3 Bayer grid
	int2 gridPos = int2((texcoord.xy * RESOLUTION.xy) % 3); // Modulo 3 for 3x3 grid

    // Get the Bayer matrix value and normalize it to [0, 1]
	float threshold = (bayerMatrix[gridPos.x][gridPos.y] + .5) / 9.0;

    if (gray < threshold) {
        // pixel is black
        texCol.rgb = texCol.rgb * threshold;
    }
    else {
        // pixel is light
        texCol.rgb = texCol.rgb * (1. + threshold);
    }

    return float3(texCol.rgb);
}

technique Ditter
{
	pass
	{
		VertexShader = PostProcessVS;
		PixelShader = main;
	}
}
