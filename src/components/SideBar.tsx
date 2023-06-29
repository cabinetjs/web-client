import React from "react";

import { Box, Hidden, ThemeProvider, Typography } from "@mui/material";

import { Menu } from "@components/Menu";

import { NAV_MENU_ITEMS } from "@constants/nav";
import { sideBarTheme } from "@styles/theme";

import { Logo, Root, TitleBar } from "@components/SideBar.styles";

import { buildMenuItems } from "@utils/dataSources";
import { PageProps } from "@utils/routes/types";

export interface SideBarProps {
    open: boolean;
    onClose?(): void;
    dataSources?: PageProps["dataSources"];
}

export function SideBar({ open, onClose, dataSources }: SideBarProps) {
    const dataSourceMenuItems = React.useMemo(() => {
        if (!dataSources) {
            throw new Error("Available data sources not provided");
        }

        return buildMenuItems(dataSources);
    }, [dataSources]);

    const content = (
        <>
            <TitleBar>
                <Box width="100%" px={2.5} display="flex" alignItems="center">
                    <Logo />
                    <Typography variant="h6" fontSize="1rem" lineHeight={1} noWrap component="div">
                        CabinetJS
                    </Typography>
                </Box>
            </TitleBar>
            <Box p={1.5}>
                <Menu items={NAV_MENU_ITEMS} />
                <Menu title="Data Sources" items={dataSourceMenuItems} />
            </Box>
        </>
    );

    return (
        <ThemeProvider theme={sideBarTheme}>
            <Hidden mdDown>
                <Root variant="permanent" anchor="left">
                    {content}
                </Root>
            </Hidden>
            <Hidden lgUp>
                <Root open={open} variant="temporary" anchor="left" onClose={onClose}>
                    {content}
                </Root>
            </Hidden>
        </ThemeProvider>
    );
}
