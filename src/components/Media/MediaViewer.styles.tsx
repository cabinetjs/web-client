import styled from "@emotion/styled";
import { MediaView } from "@components/Media/MediaView";
import { ThumbnailView } from "@components/Media/ThumbnailView";
import { ButtonBase } from "@mui/material";

export const Root = styled.div<{ opened: boolean }>`
    margin: 0;
    padding: 0;

    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    z-index: 10000;

    color: white;
`;

export const ViewerWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1 1 auto;

    position: relative;
`;

export const ThumbnailContainer = styled.div`
    width: ${({ theme }) => theme.spacing(18.75)};

    display: flex;
    flex-direction: column;
    flex: 0 0 ${({ theme }) => theme.spacing(18.75)};

    overflow-y: scroll;

    background: rgba(0, 0, 0, 0.5);
`;

export const Media = styled(MediaView)`
    max-width: 100%;
    max-height: 100%;
`;

export const Thumbnail = styled(ThumbnailView)`
    max-width: 100%;

    display: block;
`;

export const ThumbnailButton = styled(ButtonBase, { shouldForwardProp: propName => propName !== "active" })<{
    active?: boolean;
}>`
    padding: ${({ theme }) => theme.spacing(0.5)};

    display: flex;
    align-items: center;
    justify-content: center;

    background: ${({ active, theme }) => (active ? theme.palette.primary.main : "transparent")};
`;

export const Metadata = styled.div`
    padding: ${({ theme }) => theme.spacing(2)};

    display: flex;
    flex-direction: column;
    align-items: flex-end;

    position: absolute;
    right: 0;
    bottom: 0;

    p {
        margin-top: ${({ theme }) => theme.spacing(0.5)};
        padding: ${({ theme }) => theme.spacing(0.5, 1)};
        border-radius: 4px;

        background: rgba(0, 0, 0, 0.8);
    }
`;
