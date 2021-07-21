export class Bookmark {
    cluster: string;
    database: string;
    description: string;
    key: string;
    last_updated_timestamp?: Date;
    name: string;
    schema: string;
    type: string;

    constructor(bookmark?: Partial<Bookmark>) {
        this.cluster = bookmark?.cluster;
        this.database = bookmark?.database;
        this.description = bookmark?.description;
        this.key = bookmark?.key;
        this.last_updated_timestamp = bookmark?.last_updated_timestamp;
        this.name = bookmark?.name;
        this.schema = bookmark?.schema;
        this.type = bookmark?.type;
    }
}
