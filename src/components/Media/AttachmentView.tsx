/* eslint-disable @next/next/no-img-element */
import React from "react";
import mimeTypes from "mime-types";

import { MediaView } from "@components/Media/MediaView";
import { Root } from "@components/Media/AttachmentView.styles";

import { FullAttachmentFragment } from "@apollo/queries";

import { getAttachmentUrl, getThumbnailUrl } from "@utils/attachments";
import { preloadImage, preloadVideo } from "@utils/media";

export interface AttachmentViewProps {
    attachment: FullAttachmentFragment;
    thumbnailSize: [number] | [number, number];
    onExpandChange?: (expanded: boolean) => void;
}

export function AttachmentView({ attachment, thumbnailSize }: AttachmentViewProps) {
    const [expanded, setExpanded] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [[imageUrl], setImageUrl] = React.useState<[string | null]>([null]);
    const [mime] = React.useState<string>(attachment.mimeType ?? (mimeTypes.lookup(attachment.extension) || ""));

    const handleClick = React.useCallback(() => {
        setExpanded(prev => !prev);
    }, []);

    React.useEffect(() => {
        if (!expanded) {
            return;
        }

        if (imageUrl) {
            return;
        }

        const expandedImageUrl = getAttachmentUrl(attachment);
        if (!expandedImageUrl) {
            return;
        }

        if (mime.startsWith("video/")) {
            setLoading(true);
            preloadVideo(expandedImageUrl).then(url => {
                setLoading(false);
                setImageUrl([url]);
            });
        } else {
            setLoading(true);
            preloadImage(expandedImageUrl).then(() => {
                setLoading(false);
                setImageUrl([expandedImageUrl]);
            });
        }
    }, [expanded, attachment, imageUrl, mime]);

    const thumbnailUrl = getThumbnailUrl(attachment, thumbnailSize[0], thumbnailSize[1]);
    if (!thumbnailUrl) {
        throw new Error("AttachmentView: url is undefined");
    }

    const showLargeImage = expanded && !loading && imageUrl;

    return (
        <Root role="button" tabIndex={-1} onClick={handleClick}>
            {(!expanded || (expanded && loading) || loading) && (
                <img
                    src={thumbnailUrl}
                    loading="lazy"
                    alt={`Thumbnail of attachment ${attachment.id}`}
                    style={{
                        opacity: loading ? 0.5 : 1,
                        width: attachment.thumbnail.width,
                        height: attachment.thumbnail.height,
                    }}
                />
            )}
            {showLargeImage && <MediaView attachment={attachment} />}
        </Root>
    );
}
