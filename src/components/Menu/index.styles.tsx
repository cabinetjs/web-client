import styled from "@emotion/styled";

export const Root = styled.div`
    padding: 0;

    svg {
        font-size: 20px;

        display: block;

        opacity: 0.65;
    }
`;

export const Wrapper = styled.div`
    &:not(:first-of-type) {
        margin-top: ${({ theme }) => theme.spacing(2)};
    }
`;

export const ListTitle = styled.p`
    margin: 0;
    padding: ${({ theme }) => theme.spacing(0, 1, 1)};

    opacity: 0.65;
`;
