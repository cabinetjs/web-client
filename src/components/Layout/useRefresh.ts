import React from "react";

import { useLayout } from "@components/Layout/useLayout";

export function useRefresh(callback: () => Promise<any>) {
    const layout = useLayout();
    const [isRefreshing, setIsRefreshing] = React.useState(false);

    React.useEffect(() => {
        const handleRefresh = () => {
            setIsRefreshing(true);

            callback().then(() => {
                setIsRefreshing(false);
            });
        };

        layout.addEventListener("refresh", handleRefresh);

        return () => {
            layout.removeEventListener("refresh", handleRefresh);
        };
    }, [layout, callback]);

    return isRefreshing;
}
