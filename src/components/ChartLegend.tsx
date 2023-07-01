import React from "react";
import type { Props } from "recharts/types/component/DefaultLegendContent";

import { Typography } from "@mui/material";

import { Item, Root } from "@components/ChartLegend.styles";
import memoizeOne from "memoize-one";

export interface ChartLegendProps extends Omit<Props, "payload" | "onMouseOver" | "onMouseOut" | "onClick"> {
    onMouseOver?: (dataKey: string) => void;
    onMouseOut?: (dataKey: string) => void;
    onClick?: (dataKey: string) => void;
    payload?: Array<Exclude<Props["payload"], undefined>[0] & { dataKey: string }>;
    disabledKeys: string[];
}

export class ChartLegend extends React.Component<ChartLegendProps> {
    public handleMouseOver = memoizeOne((dataKey: string) => {
        return () => {
            const { onMouseOver } = this.props;
            if (!onMouseOver) {
                return;
            }

            onMouseOver(dataKey);
        };
    });
    public handleMouseOut = memoizeOne((dataKey: string) => {
        return () => {
            const { onMouseOut } = this.props;
            if (!onMouseOut) {
                return;
            }

            onMouseOut(dataKey);
        };
    });
    public handleClick = memoizeOne((dataKey: string) => {
        return () => {
            const { onClick } = this.props;
            if (!onClick) {
                return;
            }

            onClick(dataKey);
        };
    });

    public render() {
        const { payload, disabledKeys } = this.props;
        if (!payload) {
            return null;
        }

        return (
            <Root>
                {payload.map(({ color, value, dataKey }) => {
                    return (
                        <Item
                            key={value}
                            color={color || "rgb(0, 0, 0)"}
                            onMouseOver={this.handleMouseOver(dataKey)}
                            onMouseOut={this.handleMouseOut(dataKey)}
                            onClick={this.handleClick(dataKey)}
                            style={{ opacity: disabledKeys.includes(dataKey) ? 0.5 : 1 }}
                        >
                            <Typography
                                variant="body1"
                                fontWeight={600}
                                fontSize="0.8rem"
                                lineHeight={1}
                                sx={{ ml: 1 }}
                            >
                                {value}
                            </Typography>
                        </Item>
                    );
                })}
            </Root>
        );
    }
}
