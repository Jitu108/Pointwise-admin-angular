export class Article {
    constructor(
        public ArticleId: number,
        public ArticleAuthor?: string,
        public ArticleTitle?: string,
        public ArticleSummary?: string,
        public ArticleUrl?: string,
        public ArticlePublicationDate?: Date,
        public ArticleContent?: string,
        public ArticleSynopsis?: string,
        public ArticleSourceId?: number,
        public ArticleCategoryId?: number,
        public ArticleSource?: string,
        public ArticleCategory?: string,
        public ArticleAssetType?: string,
        public ArticleTags?: string[],

        public ImageId?: number,
        public ImageName?: string,
        public ImagePath?: string,
        public ImageContentType?: string,
        public ImageData?: string | ArrayBuffer,
        public ImageExtension?: string,

        public ArticleIsDeleted?: boolean
        
    ) { }
}
