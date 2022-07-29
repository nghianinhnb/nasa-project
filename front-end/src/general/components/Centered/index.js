import { withStyles } from "arwes";

import style from "./style";


function Centered(props) {
  const { classes, className, children, ...rest } = props;
  
  return (
    <div className={`${classes.root} ${className}`} {...rest}>
      {children}
    </div>
  );
};

export default withStyles(style)(Centered);
