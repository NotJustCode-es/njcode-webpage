import { DefaultQueryParams } from '@server/models/default-query-params';

export interface ContentfulPageQueryParams extends DefaultQueryParams {
  slug: string;
}
