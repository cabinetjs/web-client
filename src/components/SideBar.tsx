import React from "react";

import { Box, Hidden, ThemeProvider, Typography } from "@mui/material";

import { Menu } from "@components/Menu";

import { NAV_MENU_ITEMS } from "@constants/nav";
import { useMinimalDataSourcesQuery } from "@apollo/queries";
import { sideBarTheme } from "@styles/theme";
import { buildMenuItems } from "@utils/dataSources";

import { Logo, Root, TitleBar } from "@components/SideBar.styles";

export interface SideBarProps {
    open: boolean;
    onClose?(): void;
}

export function SideBar({ open, onClose }: SideBarProps) {
    const { data, loading } = useMinimalDataSourcesQuery();
    const dataSourceMenuItems = React.useMemo(() => {
        if (!data?.dataSources || loading) {
            return [];
        }

        return buildMenuItems(data.dataSources);
    }, [data, loading]);

    if (!data?.dataSources && !loading) {
        throw new Error("Failed to load data source list");
    }

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
