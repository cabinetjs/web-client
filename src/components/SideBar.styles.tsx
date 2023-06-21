import styled from "@emotion/styled";

import { Drawer, Toolbar } from "@mui/material";

import { SIDEBAR_WIDTH } from "@constants/layout";
import LogoSvg from "@res/icon.svg";

export const Root = styled(Drawer)`
    width: ${SIDEBAR_WIDTH}px;

    margin: 0;
    padding: 0;

    > .MuiDrawer-paper {
        width: ${SIDEBAR_WIDTH}px;

        border-right: 0;
    }
`;

export const TitleBar = styled(Toolbar)`
    width: 100%;

    padding: 0 !important;
    border-bottom: 1px solid ${({ theme }) => theme.palette.divider};
`;

export const Logo = styled(LogoSvg)`
    width: ${({ theme }) => theme.spacing(2.5)};
    height: ${({ theme }) => theme.spacing(2.5)};

    margin-left: ${({ theme }) => theme.spacing(0.5)};
    margin-right: ${({ theme }) => theme.spacing(1.5)};

    display: block;
`;
