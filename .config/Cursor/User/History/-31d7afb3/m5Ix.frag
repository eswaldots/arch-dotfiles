precision mediump float;

uniform sampler2D tex;
varying vec2 v_texcoord;

void main() {
    vec4 color = texture2D(tex, v_texcoord);
    
    // Define the chroma key color (bright green)
    vec3 keyColor = vec3(0.0, 1.0, 0.0);
    
    // Adjust this threshold to control sensitivity (increase for more aggressive removal)
    float threshold = 0.4;
    
    // Calculate difference with more weight on green channel
    float diff = length(vec3(2.0 * (color.r - keyColor.r), 
                            4.0 * (color.g - keyColor.g), 
                            2.0 * (color.b - keyColor.b)));
    
    // If the difference is less than threshold, make transparent
    if (diff < threshold) {
        // Smoothly blend the alpha based on the difference
        color.a = smoothstep(0.0, threshold, diff);
    }
    
    gl_FragColor = color;
}
