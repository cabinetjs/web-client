import styled from "@emotion/styled";

export const Root = styled.div`
    margin-top: ${({ theme }) => theme.spacing(2)};
    padding: 0;

    display: flex;
    justify-content: center;
`;

export const Item = styled.div<{ color: string }>`
    padding: ${({ theme }) => theme.spacing(0.5, 2)};

    display: flex;
    align-items: center;
    position: relative;

    cursor: pointer;
    user-select: none;

    &:before {
        content: "";

        width: ${({ theme }) => theme.spacing(1)};
        height: ${({ theme }) => theme.spacing(1)};

        border-radius: 100%;

        background: ${({ color }) => color};
    }
`;
