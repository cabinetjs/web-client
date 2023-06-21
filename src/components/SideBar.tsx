import React from "react";

import { Box, ThemeProvider, Typography } from "@mui/material";

import { Menu } from "@components/Menu";

import { NAV_MENU_ITEMS } from "@constants/nav";
import { useMinimalDataSourcesQuery } from "@apollo/queries";
import { sideBarTheme } from "@styles/theme";
import { buildMenuItems } from "@utils/dataSources";

import { Logo, Root, TitleBar } from "@components/SideBar.styles";

export function SideBar() {
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

    return (
        <ThemeProvider theme={sideBarTheme}>
            <Root variant="permanent" anchor="left">
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
            </Root>
        </ThemeProvider>
    );
}
