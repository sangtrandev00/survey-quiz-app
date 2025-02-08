// interfaces/pagination-query.interface.ts
export interface PaginationQueryDto {
    limit?: number;
    offset?: number;
    sort?: string;
    filter?: string;
}