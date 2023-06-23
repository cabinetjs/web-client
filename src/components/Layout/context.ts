import React from "react";

import { FullAttachmentFragment } from "@apollo/queries";

export interface LayoutEventTypeMap {
    refresh: () => void;
    "media-viewer-change": (attachment: FullAttachmentFragment) => void;
}

export type LayoutEventMap = {
    [K in keyof LayoutEventTypeMap]: LayoutEventTypeMap[K][];
};

export interface LayoutContextValues {
    setAttachments(attachments: FullAttachmentFragment[]): void;
    setMediaViewerVisibility(visible: boolean): void;

    addEventListener<K extends keyof LayoutEventTypeMap>(type: K, listener: LayoutEventTypeMap[K]): void;
    removeEventListener<K extends keyof LayoutEventTypeMap>(type: K, listener: LayoutEventTypeMap[K]): void;

    scrollToTop(dom: HTMLElement, smooth?: boolean): void;
}

export const LayoutContext = React.createContext<LayoutContextValues | null>(null);
