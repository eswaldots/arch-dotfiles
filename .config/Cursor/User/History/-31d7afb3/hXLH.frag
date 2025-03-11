precision mediump float;

void main() {
    vec4 color = texture2D(tex, v_texcoord);
    
    // Define the chroma key color (bright green)
    vec3 keyColor = vec3(0.0, 1.0, 0.0);
    
    // Adjust this threshold to control sensitivity
    float threshold = 0.4;
    
    // Calculate difference between pixel color and key color
    float diff = length(color.rgb - keyColor);
    
    // If the difference is less than threshold, make transparent
    if (diff < threshold) {
        // Smoothly blend the alpha based on the difference
        color.a = smoothstep(0.0, threshold, diff);
    }
    
    gl_FragColor = color;
}
