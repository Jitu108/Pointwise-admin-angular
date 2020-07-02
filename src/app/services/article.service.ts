import { map, tap } from 'rxjs/operators';
import { Article } from 'src/app/models/article';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { ArticleRepository } from '../repositories/article-repository.service';

@Injectable({
    providedIn: 'root'
})
export class ArticleService {
    private articleListSubject = new BehaviorSubject<Article[]>([]);
    articleList$: Observable<Article[]> = this.articleListSubject.asObservable();

    private subject = new BehaviorSubject<Article>(null);
    article$: Observable<Article> = this.subject.asObservable();

    selectedArticle: Article;

    constructor(private repository: ArticleRepository) { }

    init =
        () => {
            this.repository.getArticles()
                .subscribe(
                    items => this.articleListSubject.next(items)
                );
        }
    // Get all Articles
    getArticles =
        (): Observable<Article[]> => {
            this.init();
            const articles = this.articleListSubject.getValue();
            return this.articleList$;
        }

    // Save Article
    save =
        (id: number, article: Article): Observable<Article> => {
            return this.repository.save(id, article)
                .pipe(tap(res => {
                    this.init();
                }));
        }

    // Soft Delete Article
    softDelete =
        (id: number): Observable<boolean> => {
            return this.repository.softDelete(id)
                .pipe(map(x => {
                    this.init();
                    return true;
                }));
        }

    // Undo Soft Delete Article
    undoSoftDelete =
        (id: number): Observable<boolean> => {
            return this.repository.undoSoftDelete(id)
                .pipe(map(x => {
                    this.init();
                    return true;
                }));
        }

    // Delete Article
    delete =
        (id: number): Observable<boolean> => {
            return this.repository.delete(id)
                .pipe(map(x => {
                    this.init();
                    return true;
                }));
        }

    // Get Article By Id
    getById =
        (id?: number): Observable<boolean> => {
            if (id && id != 0) {
                return this.repository.getById(id)
                    .pipe(
                        map((x: Article) => {
                            this.selectedArticle = x;
                            this.subject.next(this.selectedArticle);
                            this.init();
                            return true;
                        }));
            }
            else {
                this.selectedArticle = new Article();
                this.selectedArticle.articleTags = [];
                this.subject.next(this.selectedArticle);
                return of(true);
            }
        }

    refreshSelectedArticle =
        (article: Article) => {
            this.subject.next(article);
        }

    // Search Articles
    getAllBySearchString =
        (searchString: string) => {
            this.init();
            return this.articleList$
                .pipe(
                    map(articles =>
                        articles
                            .filter(
                                article =>
                                    article.articleTitle.toLowerCase().includes(searchString.toLowerCase())
                                    || article.articleSummary.toLowerCase().includes(searchString.toLowerCase())
                            )
                    )
                );
        }
}