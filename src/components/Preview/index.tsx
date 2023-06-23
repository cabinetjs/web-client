import React from "react";

import { Box } from "@mui/material";

import { MediaView } from "@components/Media/MediaView";

import { FullAttachmentFragment } from "@apollo/queries";
import mimeTypes from "mime-types";

export interface PreviewProps {
    attachment: FullAttachmentFragment | null;
}

export class Preview extends React.Component<PreviewProps> {
    public readonly rootDOM = React.createRef<HTMLDivElement>();
    public isUnmounted = false;
    public mimeType: string | null = null;
    public mouseX = 0;
    public mouseY = 0;

    public componentDidMount() {
        this.isUnmounted = false;
        window.requestAnimationFrame(this.handleRender);

        const { attachment } = this.props;
        if (!attachment) {
            return;
        }

        this.mimeType = attachment.mimeType ?? (mimeTypes.lookup(attachment.extension) || "");
        window.addEventListener("mousemove", this.handleMouseMove, false);
    }
    public componentDidUpdate(prevProps: Readonly<PreviewProps>) {
        if (prevProps.attachment !== this.props.attachment) {
            const { attachment } = this.props;
            if (!attachment) {
                return;
            }

            this.mimeType = attachment.mimeType ?? (mimeTypes.lookup(attachment.extension) || "");
        }
    }
    public componentWillUnmount() {
        this.isUnmounted = true;
        window.addEventListener("mousemove", this.handleMouseMove, false);
    }

    public handleMouseMove = (event: MouseEvent) => {
        this.mouseX = event.clientX;
        this.mouseY = event.clientY;
    };
    public handleRender = () => {
        if (this.isUnmounted) {
            return;
        }

        window.requestAnimationFrame(this.handleRender);
        const { current: dom } = this.rootDOM;
        const { attachment } = this.props;
        if (!dom || !attachment || !this.mimeType) {
            return;
        }

        const isVideo = this.mimeType.startsWith("video/");
        const { clientWidth, clientHeight } = document.documentElement;
        const height = dom.offsetHeight + 16;
        const width = dom.offsetWidth;
        const top = !isVideo
            ? Math.max(0, (this.mouseY * (clientHeight - height)) / clientHeight)
            : Math.max(0, Math.min(clientHeight - height, this.mouseY - 120));

        const threshold = clientWidth / 2;
        let marginX = (this.mouseX <= threshold ? this.mouseX : clientWidth - this.mouseX) + 45;
        marginX = Math.min(marginX, clientWidth - width);

        const { style } = dom;
        style.top = `${top.toFixed(2)}px`;
        if (this.mouseX <= threshold) {
            style.left = `${marginX}px`;
            style.right = "";
        } else {
            style.left = "";
            style.right = `${marginX}px`;
        }
    };

    public render() {
        const { attachment } = this.props;
        if (!attachment) {
            return null;
        }

        return (
            <Box
                ref={this.rootDOM}
                position="fixed"
                zIndex={10000}
                sx={{
                    pointerEvents: "none",
                }}
            >
                <MediaView syncTime withoutControls attachment={attachment} />
            </Box>
        );
    }
}
