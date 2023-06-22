import React from "react";

import { FullAttachmentFragment } from "@apollo/queries";

export interface LayoutContextValues {
    setAttachments(attachments: FullAttachmentFragment[]): void;
    setMediaViewerVisibility(visible: boolean): void;
}

export const LayoutContext = React.createContext<LayoutContextValues | null>(null);
