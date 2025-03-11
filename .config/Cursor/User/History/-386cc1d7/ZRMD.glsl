#version 450

layout(location = 0) in vec2 fragCoord;
layout(location = 0) out vec4 fragColor;
layout(set = 0, binding = 0) uniform sampler2D tex;

// Adjust these values for your target color and tolerance
const vec3 targetColor = vec3(0.0, 1.0, 0.0); // Green color (RGB)
const float colorTolerance = 0.1; // Adjust this value to control how strict the color matching is

void main() {
    vec4 color = texture(tex, fragCoord);
    vec3 diff = abs(color.rgb - targetColor);
    float dist = length(diff);
    
    if (dist < colorTolerance) {
        fragColor = vec4(color.rgb, 0.0); // Make it transparent
    } else {
        fragColor = color;
    }
} 