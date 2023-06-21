import { queryDataSource, useDataSourceBoardsQuery } from "@apollo/queries";

import { DataSourceBoardsPage } from "@pages/data-sources/[data-source-id]";

import { installRouteMiddleware } from "@utils/routes/middleware";
import { PageProps } from "@utils/routes/types";

interface DataSourcePageProps extends PageProps {
    itemCount: number;
    dataSourceId: string;
}

export default function DataSourceBoards({ itemCount, dataSourceId }: DataSourcePageProps) {
    const { data, loading } = useDataSourceBoardsQuery({
        variables: {
            dataSourceId,
        },
    });

    return (
        <DataSourceBoardsPage
            loading={loading}
            items={data?.dataSource?.boards}
            itemCount={itemCount}
            dataSourceId={dataSourceId}
        />
    );
}

export const getServerSideProps = installRouteMiddleware<DataSourcePageProps>()(async ({ params }, { client }) => {
    const dataSourceId = params?.["data-source-id"];
    if (!dataSourceId || typeof dataSourceId !== "string") {
        throw new Error("No data source ID provided");
    }

    const { data } = await queryDataSource(client, {
        variables: {
            id: dataSourceId,
        },
    });

    if (!data.dataSource) {
        throw new Error("No data source found");
    }

    return {
        props: {
            itemCount: data.dataSource.boardCount,
            title: `'${data.dataSource.id}' Data Source`,
            dataSourceId: data.dataSource.id,
        },
    };
});
