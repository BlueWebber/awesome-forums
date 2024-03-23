import ReactTooltip from "react-tooltip";
import { ThemeContext } from "styled-components";
import { useContext, forwardRef } from "react";

const StyledTooltip = forwardRef((props, ref) => {
  const theme = useContext(ThemeContext);
  const themeColor = theme.status === "dark" ? "dark" : "light";

  return (
    <ReactTooltip
      {...props}
      type={!props.type ? themeColor : props.type}
      ref={ref}
    />
  );
});

export default StyledTooltip;
