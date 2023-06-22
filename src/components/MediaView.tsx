import React from "react";
import mimeTypes from "mime-types";

import { FullAttachmentFragment } from "@apollo/queries";

import { Image, Video } from "@components/MediaView.styles";

import { getAttachmentUrl } from "@utils/attachments";

export interface MediaViewProps {
    attachment: FullAttachmentFragment;
    onClick?(event: React.MouseEvent): void;
    onContextMenu?(event: React.MouseEvent): void;
    className?: string;
}

export function MediaView({ attachment, onClick, className, onContextMenu }: MediaViewProps) {
    const mime = React.useMemo<string>(
        () => attachment.mimeType ?? (mimeTypes.lookup(attachment.extension) || ""),
        [attachment],
    );
    const url = getAttachmentUrl(attachment);
    if (!url) {
        throw new Error("MediaView: url is undefined");
    }

    const props = {
        onClick,
        className,
        onContextMenu,
    };

    if (mime.startsWith("video/")) {
        return (
            <Video key={url} controls loop autoPlay {...props}>
                <source type={mime} src={url} />
            </Video>
        );
    } else if (mime.startsWith("image/")) {
        return <Image key={url} src={url} alt={`Attachment ${attachment.id}`} {...props} />;
    } else {
        throw new Error(`MediaView: unknown mime type ${mime}`);
    }
}
