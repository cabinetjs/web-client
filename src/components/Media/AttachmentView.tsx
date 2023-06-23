/* eslint-disable @next/next/no-img-element */
import React from "react";
import mimeTypes from "mime-types";

import { MediaView } from "@components/Media/MediaView";
import { usePreview } from "@components/Preview/Context";
import { useVideo } from "@components/Video/Context";

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
    const { addVolume } = useVideo();
    const { setAttachment } = usePreview();
    const [expanded, setExpanded] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [[imageUrl], setImageUrl] = React.useState<[string | null]>([null]);
    const [mime] = React.useState<string>(attachment.mimeType ?? (mimeTypes.lookup(attachment.extension) || ""));
    const [thumbnailDOM, setThumbnailDOM] = React.useState<HTMLImageElement | null>(null);

    const handleWheel = React.useCallback(
        (e: WheelEvent) => {
            if (!mime.startsWith("video/")) {
                return;
            }

            const delta = (e.deltaY / 100) * -1 * 0.05;
            addVolume(delta);

            e.preventDefault();
        },
        [mime, addVolume],
    );

    React.useEffect(() => {
        if (expanded || !thumbnailDOM) {
            return;
        }

        thumbnailDOM.addEventListener("wheel", handleWheel, { passive: false });

        return () => {
            thumbnailDOM.removeEventListener("wheel", handleWheel);
        };
    }, [expanded, handleWheel, thumbnailDOM]);

    const handleClick = React.useCallback(() => {
        setExpanded(prev => !prev);
        setAttachment(null);
    }, [setAttachment]);

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
    const handleMouseEnter = React.useCallback(() => {
        if (showLargeImage) {
            setAttachment(null);
            return;
        }

        setAttachment(attachment);
    }, [setAttachment, attachment, showLargeImage]);
    const handleMouseLeave = React.useCallback(() => {
        if (showLargeImage) {
            setAttachment(null);
            return;
        }

        setAttachment(null);
    }, [setAttachment, showLargeImage]);

    return (
        <Root
            role="button"
            tabIndex={-1}
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {(!expanded || (expanded && loading) || loading) && (
                <img
                    ref={setThumbnailDOM}
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
            {showLargeImage && <MediaView syncTime attachment={attachment} />}
        </Root>
    );
}
