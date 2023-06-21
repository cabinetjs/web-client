import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult, PreviewData } from "next";
import { ParsedUrlQuery } from "querystring";

import { createClient } from "@apollo/createClient";

import { PageProps } from "@utils/routes/types";

interface RouteMiddlewareClientOptions {
    client: ReturnType<typeof createClient>;
}

export type RouteMiddlewareClient<
    T,
    Params extends ParsedUrlQuery = ParsedUrlQuery,
    Preview extends PreviewData = PreviewData,
> = (
    context: GetServerSidePropsContext<Params, Preview>,
    options: RouteMiddlewareClientOptions,
) => Promise<GetServerSidePropsResult<T>>;

export function installRouteMiddleware<T extends PageProps>(title?: string) {
    return (origin: RouteMiddlewareClient<Omit<T, "title">>): GetServerSideProps<T> => {
        return async context => {
            const apolloClient = createClient({ headers: context.req.headers });
            const data = await origin(context, { client: apolloClient });

            if ("props" in data) {
                return {
                    props: {
                        ...data.props,
                        title,
                    } as T,
                };
            }

            return data;
        };
    };
}
