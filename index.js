import WebGL from "three/addons/capabilities/WebGL.js";

if (!WebGL.isWebGL2Available()) {
  document.body.innerHTML = "";

  const warning = WebGL.getWebGL2ErrorMessage();
  document.body.appendChild(warning);
}
