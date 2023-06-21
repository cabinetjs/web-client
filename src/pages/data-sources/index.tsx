import { queryDataSourceCount, useDataSourcesQuery } from "@apollo/queries";

import { DataSourcesPage } from "@pages/data-sources";

import { installRouteMiddleware } from "@utils/routes/middleware";
import { PageProps } from "@utils/routes/types";

interface DataSourcesPageProps extends PageProps {
    itemCount: number;
}

export default function DataSources({ itemCount }: DataSourcesPageProps) {
    const { data, loading } = useDataSourcesQuery();

    return <DataSourcesPage loading={loading} items={data?.dataSources} itemCount={itemCount} />;
}

export const getServerSideProps = installRouteMiddleware<DataSourcesPageProps>("Data Sources")(
    async (_, { client }) => {
        const { data } = await queryDataSourceCount(client);
        if (!data) {
            throw new Error("No data returned from DataSourceCount query");
        }

        return {
            props: {
                itemCount: data.dataSourceCount,
            },
        };
    },
);
