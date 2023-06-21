import { useMemo } from "react";
import { AppProps } from "next/app";

import { createClient } from "./createClient";

export function useApollo(pageProps: AppProps["pageProps"]) {
    const state = pageProps.__APOLLO_STATE__;
    return useMemo(() => createClient({ initialState: state }), [state]);
}
