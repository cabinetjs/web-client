import React from "react";

import type { AppProps } from "next/app";

import { ThemeProvider } from "@mui/material";

import { ApolloProvider } from "@apollo/client";
import { useApollo } from "@apollo/useApollo";

import { Layout } from "@components/Layout";

import { theme } from "@styles/theme";
import { PageProps } from "@utils/routes/types";

export default function App({ Component, pageProps }: AppProps<PageProps>) {
    const apolloClient = useApollo(pageProps);

    return (
        <ApolloProvider client={apolloClient}>
            <ThemeProvider theme={theme}>
                <Layout title={pageProps.title}>
                    <Component {...pageProps} />
                </Layout>
            </ThemeProvider>
        </ApolloProvider>
    );
}
