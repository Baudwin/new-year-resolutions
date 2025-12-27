export class PublicResolutionsResponse {
  items: { id: string; text: string }[];
  nextCursor: string | null;
}