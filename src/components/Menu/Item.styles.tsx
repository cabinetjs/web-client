import styled from "@emotion/styled";
import { ButtonBase } from "@mui/material";

export const Label = styled.span`
    opacity: 0.65;
`;

export const Icon = styled.span`
    min-width: 0;

    margin-right: ${({ theme }) => theme.spacing(1.5)};

    display: block;
`;

export const IconPlaceholder = styled.span<{ active?: boolean }>`
    width: 20px;

    display: block;
    position: relative;

    &:before {
        content: "";

        width: ${({ theme }) => theme.spacing(0.75)};
        height: ${({ theme }) => theme.spacing(0.75)};

        border-radius: 50%;

        position: absolute;
        top: 50%;
        left: 50%;

        transform: translate(-50%, -50%);

        background: ${({ theme, active }) => (active ? theme.palette.primary.main : "transparent")};
    }
`;

export const Root = styled(ButtonBase, { shouldForwardProp: prop => prop !== "active" && prop !== "isChild" })<{
    active: boolean;
    isChild?: boolean;
}>`
    width: 100%;

    height: ${({ theme }) => theme.spacing(4.5)};

    padding: ${({ theme }) => theme.spacing(0, 1.5, 0, 1.5)};
    border-radius: 4px;

    display: flex;
    justify-content: flex-start;

    background-color: ${({ active, isChild }) =>
        isChild ? "transparent" : active ? "rgba(255, 255, 255, 0.08)" : "transparent"};

    &:not(:last-child) {
        margin: ${({ theme }) => theme.spacing(0, 0, 0.5)};
    }

    &:hover,
    &:focus-visible {
        background-color: rgba(255, 255, 255, 0.08);
    }

    &:focus-visible {
        outline: 2px solid ${({ theme }) => theme.palette.primary.main};
    }

    .MuiTypography-root,
    svg {
        opacity: ${({ active }) => (active ? 1 : 0.65)};
    }

    svg {
        color: ${({ theme, active }) => (active ? theme.palette.primary.main : theme.palette.text.primary)};
    }
`;

export const Chevron = styled.span`
    display: block;

    svg {
        display: block;

        opacity: 0.25;
    }
`;
