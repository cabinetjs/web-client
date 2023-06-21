import { installRouteMiddleware } from "@utils/routes/middleware";

export default function DataSources() {
    return <>Data Sources</>;
}

export const getServerSideProps = installRouteMiddleware("Data Sources")(async () => {
    return {
        props: {},
    };
});
