import PropTypes from "prop-types";

import { useSelected } from "../../hooks/useSelected";
import { useExpanded } from "../../hooks/useExpanded";

function ModalMenuItem({ icon, text }) {
  const { selected, setSelected } = useSelected();
  const { setOverlayMenu } = useExpanded();
  const isActive = selected === text;
  return (
    <li
      onClick={() => {
        setSelected(text);
        setOverlayMenu(false);
      }}
      className={`group relative my-1 mr-6 flex cursor-pointer items-center rounded-md px-3 py-2 pl-4 font-medium transition-colors ${
        isActive
          ? "bg-gradient-to-tr from-emerald-200 to-emerald-100 text-emerald-800"
          : "text-gray-600 hover:bg-emerald-50"
      } `}
    >
      {icon}
      <span className={``}>{text}</span>
    </li>
  );
}

ModalMenuItem.propTypes = {
  icon: PropTypes.element.isRequired,
  text: PropTypes.string.isRequired,
};

export default ModalMenuItem;
