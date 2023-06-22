import React from "react";

import { FullAttachmentFragment } from "@apollo/queries";

export interface PreviewContextProps {
    children: React.ReactNode;
}
export interface PreviewContextValues {
    attachment: FullAttachmentFragment | null;
    setAttachment(preview: FullAttachmentFragment | null): void;
}

export const PreviewReactContext = React.createContext<PreviewContextValues | null>(null);

export function usePreview() {
    const context = React.useContext(PreviewReactContext);
    if (!context) {
        throw new Error("usePreview must be used within a PreviewContext");
    }

    return context;
}

export function PreviewContext({ children }: PreviewContextProps) {
    const [{ attachment }, setAttachment] = React.useState<{ attachment: FullAttachmentFragment | null }>({
        attachment: null,
    });

    const updateAttachment = React.useCallback(
        (attachment: FullAttachmentFragment | null) => {
            setAttachment({ attachment });
        },
        [setAttachment],
    );

    return (
        <PreviewReactContext.Provider value={{ attachment, setAttachment: updateAttachment }}>
            {children}
        </PreviewReactContext.Provider>
    );
}
