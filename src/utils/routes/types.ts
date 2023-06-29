import { MinimalDataSourceFragment } from "@apollo/queries";

export interface PageProps {
    title?: string;
    refreshable?: boolean;
    apiUrl: string;
    dataSources?: MinimalDataSourceFragment[];
}
