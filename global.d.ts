declare module "*.svg" {
    import React from "react";
    const SVG: React.FC<React.SVGProps<SVGSVGElement>>;
    export default SVG;
}

declare module "apollo-link-logger" {
    import { ApolloLink } from "@apollo/client";
    const apolloLink: ApolloLink;

    export default apolloLink;
}
