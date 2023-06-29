import React from "react";
import { ThreadSort, ThreadSortOrder } from "@components/Thread/Toolbar";

export function isThreadSortOrder(data: unknown): data is ThreadSortOrder {
    return (
        data === ThreadSortOrder.CreationDate ||
        data === ThreadSortOrder.ReplyCount ||
        data === ThreadSortOrder.LastReply ||
        data === ThreadSortOrder.FileCount
    );
}

function getDefaultThreadSortOrder(): ThreadSort {
    if (typeof window === "undefined") {
        return [ThreadSortOrder.CreationDate, false];
    }

    const order = localStorage.getItem("thread-order");
    if (order) {
        try {
            const value = JSON.parse(order);
            if (!Array.isArray(value)) {
                throw new Error("Invalid thread order");
            }

            const [orderValue, reverse] = value;
            if (typeof orderValue !== "string" || typeof reverse !== "boolean" || !isThreadSortOrder(orderValue)) {
                throw new Error("Invalid thread order");
            }

            return [orderValue, reverse];
        } catch (e) {
            console.error(e);
        }
    }

    return [ThreadSortOrder.CreationDate, false];
}

function saveThreadSortOrder(order: ThreadSort) {
    localStorage.setItem("thread-order", JSON.stringify(order));
}

export function useThreadSortOrder() {
    const [threadSortOrder, setThreadSortOrder] = React.useState<ThreadSort>(getDefaultThreadSortOrder);

    React.useEffect(() => {
        saveThreadSortOrder(threadSortOrder);
    }, [threadSortOrder]);

    return [threadSortOrder, setThreadSortOrder] as const;
}
