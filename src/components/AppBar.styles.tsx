import styled from "@emotion/styled";

import { AppBar as MuiAppBar } from "@mui/material";

import { SIDEBAR_WIDTH } from "@constants/layout";

export const Root = styled(MuiAppBar)`
    width: calc(100% - ${SIDEBAR_WIDTH}px);

    margin-left: ${SIDEBAR_WIDTH}px;

    background: rgba(248, 249, 250, 0.8);
    backdrop-filter: blur(6px) saturate(300%);
`;
