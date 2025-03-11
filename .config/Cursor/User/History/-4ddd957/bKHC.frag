#version 330 core

uniform float alpha;
uniform sampler2D tex;

in vec2 v_texcoord;
out vec4 fragColor;

void main() {
    fragColor = texture(tex, v_texcoord);
    fragColor.a *= alpha;  // Aplicar transparencia
} 