import styled from "@emotion/styled";

export const Root = styled.div`
    padding: ${({ theme }) => theme.spacing(3, 4)};
    border-radius: ${({ theme }) => theme.spacing(2.5)};

    background: white;
    box-shadow: rgba(0, 0, 0, 0.04) 0 5px 22px, rgba(0, 0, 0, 0.03) 0 0 0 0.5px;
`;
