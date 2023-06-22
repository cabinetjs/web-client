import React from "react";
import { filesize } from "filesize";

import { Box, Modal, Typography } from "@mui/material";
import { FullAttachmentFragment } from "@apollo/queries";

import {
    Media,
    Metadata,
    Root,
    Thumbnail,
    ThumbnailButton,
    ThumbnailContainer,
    ViewerWrapper,
} from "@components/Media/MediaViewer.styles";

export interface ImageViewerProps {
    attachments: FullAttachmentFragment[];
    opened: boolean;
    onClose?(): void;
}

export function MediaViewer({ attachments, opened, onClose }: ImageViewerProps) {
    const [index, setIndex] = React.useState(0);
    const thumbnailRefs = React.useMemo(() => new Map<number, HTMLButtonElement>(), []);

    const moveIndex = React.useCallback(
        (delta: number) => {
            let targetIndex = index + delta;
            if (targetIndex < 0) {
                targetIndex = attachments.length - 1;
            } else if (targetIndex >= attachments.length) {
                targetIndex = 0;
            }

            setIndex(targetIndex);
        },
        [index, attachments],
    );

    React.useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!opened) {
                return;
            }

            if (e.key === "ArrowLeft") {
                moveIndex(-1);
            } else if (e.key === "ArrowRight") {
                moveIndex(1);
            }
        };

        window.addEventListener("keydown", handleKeyDown, false);

        return () => {
            window.removeEventListener("keydown", handleKeyDown, false);
        };
    }, [moveIndex, opened]);

    React.useEffect(() => {
        setIndex(0);
    }, [attachments]);

    React.useEffect(() => {
        const thumbnailDOM = thumbnailRefs.get(index);
        if (!thumbnailDOM) {
            return;
        }

        thumbnailDOM.scrollIntoView({
            block: "nearest",
        });
    }, [index, thumbnailRefs]);

    const handleClick = React.useCallback(
        (e: React.MouseEvent) => {
            moveIndex(1);
            e.preventDefault();
        },
        [moveIndex],
    );

    const handleContextMenu = React.useCallback(
        (e: React.MouseEvent) => {
            if (e.shiftKey) {
                return;
            }

            moveIndex(-1);
            e.preventDefault();
        },
        [moveIndex],
    );

    const handleOutsideClick = React.useCallback(
        (e: React.MouseEvent) => {
            if (e.target === e.currentTarget) {
                onClose?.();
            }
        },
        [onClose],
    );

    const handleThumbnailClick = React.useCallback((index: number) => {
        setIndex(index);
    }, []);

    const setRef = (dom: HTMLButtonElement | null, index: number) => {
        if (!dom) {
            return;
        }

        thumbnailRefs.set(index, dom);
    };

    const currentAttachment = attachments[index];

    return (
        <Modal open={opened} componentsProps={{ backdrop: { sx: { background: `rgba(0, 0, 0, 0.75)` } } }}>
            <Root opened={opened}>
                <ViewerWrapper onClick={handleOutsideClick}>
                    {currentAttachment && opened && (
                        <Media attachment={currentAttachment} onClick={handleClick} onContextMenu={handleContextMenu} />
                    )}
                    {currentAttachment && opened && (
                        <Metadata>
                            <Typography variant="body1" fontSize="0.9rem">
                                {index + 1} / {attachments.length}
                            </Typography>
                            <Typography variant="body1" fontSize="0.9rem">
                                {currentAttachment.name}
                                {currentAttachment.extension}
                            </Typography>
                            <Box display="flex">
                                <Typography variant="body1" fontSize="0.9rem">
                                    {`${filesize(
                                        currentAttachment.size,
                                    )} (${currentAttachment.size.toLocaleString()} bytes)`}
                                </Typography>
                            </Box>
                        </Metadata>
                    )}
                </ViewerWrapper>
                <ThumbnailContainer>
                    {attachments.map((attachment, i) => (
                        <ThumbnailButton
                            ref={dom => setRef(dom, i)}
                            key={attachment.id}
                            active={i === index}
                            onClick={() => handleThumbnailClick(i)}
                        >
                            <Thumbnail attachment={attachment} size={[150]} />
                        </ThumbnailButton>
                    ))}
                </ThumbnailContainer>
            </Root>
        </Modal>
    );
}
