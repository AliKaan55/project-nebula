export const vert = `
varying vec3 vN; varying vec3 vP;
void main(){ vN = normalize(normalMatrix * normal); vP = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.); }`

export const planetFrag = `
varying vec3 vN; varying vec3 vP;
uniform float uT; uniform float uHover; uniform float uPulse;
float h(vec3 p){p=fract(p*.3183099+.1);p*=17.;return fract(p.x*p.y*p.z*(p.x+p.y+p.z));}
float n(vec3 x){vec3 i=floor(x),f=fract(x);f=f*f*(3.-2.*f);
 return mix(mix(mix(h(i),h(i+vec3(1,0,0)),f.x),mix(h(i+vec3(0,1,0)),h(i+vec3(1,1,0)),f.x),f.y),
            mix(mix(h(i+vec3(0,0,1)),h(i+vec3(1,0,1)),f.x),mix(h(i+vec3(0,1,1)),h(i+vec3(1,1,1)),f.x),f.y),f.z);}
float fbm(vec3 p){float a=.5,s=0.;for(int i=0;i<5;i++){s+=a*n(p);p*=2.;a*=.5;}return s;}
void main(){
  float f = fbm(vP*1.7 + vec3(uT*.03, 0., uT*.02));
  vec3 navy=vec3(.04,.07,.28), vio=vec3(.48,.36,1.), cy=vec3(.32,.9,.95);
  vec3 c = mix(navy, vio, smoothstep(.38,.62,f));
  c = mix(c, cy, smoothstep(.62,.82,f)*.85);
  vec3 L = normalize(vec3(-1.,.6,1.));
  float d = max(dot(vN,L),0.);
  float rim = pow(1.-max(dot(vN,vec3(0.,0.,1.)),0.),3.);
  vec3 col = c*(.12+d*1.15) + cy*rim*(.45+uHover*.7) + cy*uPulse*.35;
  gl_FragColor = vec4(col,1.);
}`

export const atmoFrag = `
varying vec3 vN; uniform float uHover;
void main(){ float i = pow(.68 - dot(vN, vec3(0.,0.,1.)), 3.5);
  gl_FragColor = vec4(.32,.75,1.,1.) * i * (1.1 + uHover*.8); }`