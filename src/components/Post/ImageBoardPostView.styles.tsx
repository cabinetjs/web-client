import styled from "@emotion/styled";

import { Card } from "@mui/material";

export const Root = styled(Card)`
    margin: 0;
    padding: ${({ theme }) => theme.spacing(1)};
    border: 1px solid ${({ theme }) => theme.palette.divider};
`;

export const Metadata = styled.div`
    display: flex;

    font-weight: 600;

    color: ${({ theme }) => theme.palette.text.secondary};

    > :not(:last-child) {
        margin-right: ${({ theme }) => theme.spacing(1)};
    }
`;

export const Content = styled.div`
    margin-top: ${({ theme }) => theme.spacing(0.5)};

    display: flex;

    font-weight: 600;

    color: ${({ theme }) => theme.palette.text.primary};

    a {
        color: ${({ theme }) => theme.palette.primary.main};

        &.quotelink {
            font-family: "Consolas", "Courier New", monospace;
        }
    }

    span {
        &.quote {
            color: ${({ theme }) => theme.palette.primary.main};

            font-family: "Consolas", "Courier New", monospace;
        }

        &.deadlink {
            color: ${({ theme }) => theme.palette.error.main};
            text-decoration: line-through;

            font-family: "Consolas", "Courier New", monospace;
        }
    }
`;

export const Container = styled.div`
    display: flex;
`;
