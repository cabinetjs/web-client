import { installRouteMiddleware } from "@utils/routes/middleware";

export default function Home() {
    return <>Home</>;
}

export const getServerSideProps = installRouteMiddleware("Home")(async () => {
    return {
        props: {},
    };
});
