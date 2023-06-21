import { createTheme } from "@mui/material";

import localFont from "next/font/local";

export const suitFont = localFont({ src: "./suit.woff2" });

export const theme = createTheme({
    palette: {
        background: {
            default: "rgb(248, 249, 250)",
        },
    },
    typography: {
        fontFamily: [suitFont.style.fontFamily, "sans-serif"].join(","),
        fontWeightRegular: 500,
    },
    components: {
        MuiTooltip: {
            styleOverrides: {
                tooltip: {
                    fontSize: "0.8rem",
                },
            },
        },
    },
});

export const sideBarTheme = createTheme({
    palette: {
        mode: "dark",
        background: {
            default: "#1c2536",
            paper: "#1c2536",
        },
    },
    typography: {
        fontFamily: [suitFont.style.fontFamily, "sans-serif"].join(","),
    },
});
