import { GetServerSideProps } from "next";

import { PageProps } from "@utils/routes/types";

export function installRouteMiddleware<T extends PageProps>(title?: string) {
    return (origin: GetServerSideProps<Omit<T, "title">>): GetServerSideProps<T> => {
        return async context => {
            const data = await origin(context);

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
