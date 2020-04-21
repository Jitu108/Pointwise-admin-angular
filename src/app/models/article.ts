export class Article {
    constructor(
        public articleId: number,
        public articleAuthor?: string,
        public articleTitle?: string,
        public articleSummary?: string,
        public articleUrl?: string,
        public articlePublicationDate?: Date,
        public articleContent?: string,
        public articleSynopsis?: string,
        public articleSourceId?: number,
        public articleCategoryId?: number,
        public articleSource?: string,
        public articleCategory?: string,
        public articleAssetType?: string,
        public articleTags?: string[],

        public imageId?: number,
        public imageName?: string,
        public imagePath?: string,
        public imageContentType?: string,
        public imageData?: string | ArrayBuffer,
        public imageExtension?: string,

        public articleIsDeleted?: boolean
        
    ) { }
}
