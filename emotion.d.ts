import "@emotion/react";

import type { Theme as MuiTheme } from "@mui/material";

declare module "@emotion/react" {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    export interface Theme extends MuiTheme {}
}
