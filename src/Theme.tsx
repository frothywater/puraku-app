import { createMuiTheme } from "@material-ui/core/styles";
import { cyan, pink, grey } from "@material-ui/core/colors";

export default createMuiTheme({
  palette: {
    primary: cyan,
    secondary: pink,
    background: {
      paper: grey[50]
    }
  }
});
