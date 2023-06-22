import React from "react";
import mimeTypes from "mime-types";

import { FullAttachmentFragment } from "@apollo/queries";

import { VideoView } from "@components/Video/View";
import { Image } from "@components/Media/MediaView.styles";

import { getAttachmentUrl } from "@utils/attachments";

export interface MediaViewProps {
    attachment: FullAttachmentFragment;
    onClick?(event: React.MouseEvent): void;
    onContextMenu?(event: React.MouseEvent): void;
    className?: string;
    withoutControls?: boolean;
}

export function MediaView({ attachment, onClick, className, onContextMenu, withoutControls }: MediaViewProps) {
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
        return <VideoView src={url} mime={mime} withoutControls={withoutControls} {...props} />;
    } else if (mime.startsWith("image/")) {
        return <Image key={url} src={url} alt={`Attachment ${attachment.id}`} {...props} />;
    } else {
        throw new Error(`MediaView: unknown mime type ${mime}`);
    }
}
