import React from "react";

import { LayoutContext } from "@components/Layout/context";

export function useLayout() {
    const layout = React.useContext(LayoutContext);
    if (!layout) {
        throw new Error("useLayout must be used within a LayoutProvider");
    }

    return layout;
}
