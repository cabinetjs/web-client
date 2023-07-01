import { HomePage } from "@pages/Home";

import { installRouteMiddleware } from "@utils/routes/middleware";

export default function Home() {
    return <HomePage />;
}

export const getServerSideProps = installRouteMiddleware({
    title: "Home",
})(async () => {
    return {
        props: {},
    };
});
