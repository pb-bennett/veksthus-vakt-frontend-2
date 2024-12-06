import PropTypes from "prop-types";
import { RotateCw } from "lucide-react";
const RefreshButton = ({ handleRefresh, className, size = 24 }) => {
  return (
    <button onClick={handleRefresh} className={className}>
      <RotateCw size={size} />
    </button>
  );
};
RefreshButton.propTypes = {
  handleRefresh: PropTypes.func,
  className: PropTypes.string,
  size: PropTypes.number,
};
export default RefreshButton;
