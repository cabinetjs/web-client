import React from "react";

import { useWindowVirtualizer } from "@tanstack/react-virtual";

export interface VirtualizedListProps<T> {
    items: T[];
    children(item: T, index: number): React.ReactNode;
    onVirtualizer?(virtualizer: ReturnType<typeof useWindowVirtualizer>): void;
}

export function VirtualizedList<T>({ items, children, onVirtualizer }: VirtualizedListProps<T>) {
    const parentRef = React.useRef<HTMLDivElement>(null);
    const parentOffsetRef = React.useRef(0);

    React.useLayoutEffect(() => {
        parentOffsetRef.current = parentRef.current?.offsetTop ?? 0;
    }, []);

    const virtualizer = useWindowVirtualizer({
        count: items.length,
        estimateSize: () => 220,
        scrollMargin: parentOffsetRef.current,
    });

    const virtualItems = virtualizer.getVirtualItems();

    React.useEffect(() => {
        onVirtualizer?.(virtualizer);
    }, [onVirtualizer, virtualizer]);

    return (
        <div
            style={{
                height: virtualizer.getTotalSize(),
                width: "100%",
                position: "relative",
            }}
        >
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    transform: `translateY(${virtualItems[0].start}px)`,
                }}
            >
                {virtualItems.map(virtualRow => (
                    <div key={virtualRow.key} data-index={virtualRow.index} ref={virtualizer.measureElement}>
                        {items[virtualRow.index] && children(items[virtualRow.index], virtualRow.index)}
                    </div>
                ))}
            </div>
        </div>
    );
}
