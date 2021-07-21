export interface Endpoint {
    /*
     * path, tag and method properties are used for control purposes only
     * we use them as helping info to build the dynamic/custom swagger menu
     */
    path?: string;
    tag?: string;
    method?: string;

    tags: string[];
    description: string;
    summary: string;
    operationId?: string;

    /*
        ENDPOINT PARAMETERS
        TODO: Map every variation on the swagger API documentation
    */
    parameters?: {
        name: string;
        in: string;
        required: boolean;
        description: string;
        example: string;
        schema: {
            type: string;
        };
    }[];

    /*
        ENDPOINT REQUEST BODY
        TODO: Map every variation on the swagger API documentation
    */
    requestBody?: unknown;

    /*
        ENDPOINT SIPPETS/CURL
        TODO: Map every variation on the swagger API documentation
    */
    'x-code-samples'?: unknown;

    /*
        ENDPOINT RESPONSE CODES
        TODO: Map every variation on the swagger API documentation
    */
    responses?: {
        [key: string]: {
            description: string;
            content: {
                [key: string]: {
                    schema: {
                        $ref: string;
                    };
                };
            };
        };
    }[];
}
