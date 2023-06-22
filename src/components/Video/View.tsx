import React from "react";

import styled from "@emotion/styled";

import { useVideo } from "@components/Video/Context";

export interface VideoViewProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
    src: string;
    mime: string;
    withoutControls?: boolean;
}

export const Root = styled.video`
    display: block;
    cursor: pointer;
`;

export function VideoView({ src, mime, withoutControls, ...rest }: VideoViewProps) {
    const { subscribeVolume, unsubscribeVolume, addVolume } = useVideo();
    const [videoDOM, setVideoDOM] = React.useState<HTMLVideoElement | null>(null);
    const handleWheel = React.useCallback(
        (e: WheelEvent) => {
            const delta = (e.deltaY / 100) * -1 * 0.05;
            addVolume(delta);

            e.preventDefault();
        },
        [addVolume],
    );

    React.useEffect(() => {
        if (!videoDOM) {
            return;
        }

        subscribeVolume(videoDOM);

        return () => {
            unsubscribeVolume(videoDOM);
        };
    }, [subscribeVolume, unsubscribeVolume, videoDOM]);

    React.useEffect(() => {
        videoDOM?.addEventListener("wheel", handleWheel);

        return () => {
            videoDOM?.removeEventListener("wheel", handleWheel);
        };
    }, [handleWheel, videoDOM]);

    return (
        <Root ref={setVideoDOM} key={src} controls={!withoutControls} loop autoPlay {...rest}>
            <source type={mime} src={src} />
        </Root>
    );
}
