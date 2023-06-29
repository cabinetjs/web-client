import _ from "lodash";
import React from "react";

import {
    Box,
    FormControl,
    FormControlLabel,
    InputLabel,
    MenuItem,
    Select,
    SelectProps,
    Switch,
    FormControlLabelProps,
    Container,
    Skeleton,
} from "@mui/material";
import { SortablePostFragment } from "@apollo/queries";

export enum ThreadSortOrder {
    LastReply = "Last Reply",
    CreationDate = "Creation Date",
    ReplyCount = "Reply Count",
    FileCount = "File Count",
}

export type ThreadSort = [ThreadSortOrder, boolean];

export interface ThreadToolbarProps {
    loading?: boolean;
    order: ThreadSortOrder;
    reverse: boolean;
    onChange: (sort: ThreadSort) => void;
}

export function ThreadToolbar({ order, onChange, reverse, loading = false }: ThreadToolbarProps) {
    const [reversed, setReversed] = React.useState<boolean>(reverse);
    const [orderType, setOrderType] = React.useState<ThreadSortOrder>(order);
    const [mounted, setMounted] = React.useState<boolean>(false);

    const handleChange: SelectProps<ThreadSortOrder>["onChange"] = event => {
        setOrderType(event.target.value as ThreadSortOrder);
    };

    const handleReverseChange: FormControlLabelProps["onChange"] = (_, checked) => {
        setReversed(checked);
    };

    React.useEffect(() => {
        setMounted(true);
    }, []);

    React.useEffect(() => {
        onChange([orderType, reversed]);
    }, [onChange, orderType, reversed]);

    if (!mounted || loading) {
        return (
            <Container maxWidth="xl">
                <Box mb={2} display="flex" justifyContent="flex-end" alignItems="flex-end">
                    <Skeleton animation="wave" variant="rectangular" height={40} width={300} />
                </Box>
            </Container>
        );
    }

    return (
        <Container maxWidth="xl">
            <Box mb={2} display="flex" justifyContent="flex-end" alignItems="flex-end">
                <FormControlLabel
                    value="start"
                    control={<Switch size="small" color="primary" />}
                    label="Reversed"
                    labelPlacement="start"
                    sx={{ mr: 1 }}
                    onChange={handleReverseChange}
                    componentsProps={{
                        typography: {
                            sx: {
                                fontSize: "0.85rem",
                                mr: 1,
                            },
                        },
                    }}
                />
                <FormControl size="small" sx={{ width: 160 }}>
                    <InputLabel id="demo-simple-select-label">Sort Order</InputLabel>
                    <Select<ThreadSortOrder>
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Sort Order"
                        value={order}
                        onChange={handleChange}
                    >
                        <MenuItem value={ThreadSortOrder.LastReply}>{ThreadSortOrder.LastReply}</MenuItem>
                        <MenuItem value={ThreadSortOrder.CreationDate}>{ThreadSortOrder.CreationDate}</MenuItem>
                        <MenuItem value={ThreadSortOrder.ReplyCount}>{ThreadSortOrder.ReplyCount}</MenuItem>
                        <MenuItem value={ThreadSortOrder.FileCount}>{ThreadSortOrder.FileCount}</MenuItem>
                    </Select>
                </FormControl>
            </Box>
        </Container>
    );
}

export function orderThread<TThread extends SortablePostFragment>(
    targetThreads: TThread[],
    [order, reversed]: ThreadSort,
) {
    let threads = _.chain([...targetThreads]);
    switch (order) {
        case ThreadSortOrder.CreationDate:
            threads = threads.orderBy(t => t.writtenAt, "desc");
            break;

        case ThreadSortOrder.LastReply:
            threads = threads.orderBy(t => t.lastReply?.writtenAt, "desc");
            break;

        case ThreadSortOrder.ReplyCount:
            threads = threads.orderBy(t => t.replyCount, "desc");
            break;

        case ThreadSortOrder.FileCount:
            threads = threads.orderBy(t => t.attachmentCount, "desc");
            break;
    }

    if (reversed) {
        threads = threads.reverse();
    }

    return threads.value();
}
