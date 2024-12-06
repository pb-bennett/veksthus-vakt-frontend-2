import { createPortal } from "react-dom";

const Portal = ({ children, containerId = "portal-root" }) => {
  let container = document.getElementById(containerId);
  if (!container) {
    container = document.createElement("div");
    container.id = containerId;
    document.body.appendChild(container);
  }

  return createPortal(children, container);
};

export default Portal;
