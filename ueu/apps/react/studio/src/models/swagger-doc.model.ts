// interfaces
import { Info } from './docs/info.model';
import { Path } from './docs/path.model';
import { Servers } from './docs/servers.model';
import { Tag } from './docs/tag.model';
import { Xtag } from './docs/x-tag.model';

export interface SwaggerDoc {
    openapi: string;
    servers?: Servers[];
    info: Info;
    tags?: Tag[];
    'x-tagGroups'?: Xtag[];
    paths: Path;
    components?;
}
