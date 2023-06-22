import React from "react";

import { FullAttachmentFragment } from "@apollo/queries";
import { Root } from "@components/Media/ThumbnailView.styles";
import { getThumbnailUrl } from "@utils/attachments";

export interface ThumbnailViewProps {
    attachment: FullAttachmentFragment;
    size: [number] | [number, number];
    className?: string;
}

export function ThumbnailView({ attachment, size, className }: ThumbnailViewProps) {
    if (!attachment) {
        throw new Error("ThumbnailView: attachment is undefined");
    }

    const url = getThumbnailUrl(attachment, size[0], size[1]);
    if (!url) {
        throw new Error("ThumbnailView: url is undefined");
    }

    const { thumbnail } = attachment;

    return (
        <Root
            src={url}
            alt={`Attachment ${attachment.id}`}
            className={className}
            style={{ aspectRatio: `${thumbnail.width} / ${thumbnail.height}` }}
        />
    );
}
