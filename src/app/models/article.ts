export class Article {
    constructor(
        public id: number,
        public author: string,
        public title: string,
        public summary: string,
        public synopsis:string,
        public url: string,
        public publicationDate: Date,
        public content: string,
        public sourceId: number,
        public categoryId: number,
        public source?: string,
        public category?: string,
        public image?: string | ArrayBuffer,
        public imageName?: string,
    ) { }
}
