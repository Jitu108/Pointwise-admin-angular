import { map, tap } from 'rxjs/operators';
import { Article } from 'src/app/models/article';
import { Observable, BehaviorSubject, ReplaySubject, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { ArticleRepository } from '../repositories/article-repository.service';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
    private articleListSubject = new BehaviorSubject<Article[]>([]);
    articleList$: Observable<Article[]> = this.articleListSubject.asObservable();

    private subject = new ReplaySubject<Article>();
    article$: Observable<Article> = this.subject.asObservable();

    selectedArticle: Article;
  
  constructor(private repository: ArticleRepository) { }

  init() {
    this.repository.getArticles()
    .subscribe(
        items => this.articleListSubject.next(items)
    );
  }
  // Get all Articles
  getArticles() : Observable<Article[]> {
    this.init();
    const articles = this.articleListSubject.getValue();
    return this.articleList$;
}

  // Save Article
  save(id: number, article: Article): Observable<Article> {
    return this.repository.save(id, article)
    .pipe(tap(res => {
        this.init();
    }));
  }

  // Soft Delete Article
  softDelete(id: number): Observable<boolean> {
    return this.repository.softDelete(id)
    .pipe(map(x => {
        this.init();
        return true;
    }));
  }

  // Undo Soft Delete Article
  undoSoftDelete(id: number): Observable<boolean> {
    return this.repository.undoSoftDelete(id)
    .pipe(map(x => {
        this.init();
        return true;
    }));
  }

  // Delete Article
  delete(id: number): Observable<boolean> {
    return this.repository.delete(id)
    .pipe(map(x => {
        this.init();
        return true;
    }));
  }

  // Get Article By Id
  getById(id?: number): Observable< boolean> {
      if(id !== null && id !== undefined && id != 0){
        return this.repository.getById(id)
        .pipe(
            map((x:Article) => {
                this.selectedArticle = x;
                this.subject.next(this.selectedArticle);
                this.init();
             return true;
        }));
      }
      else {
          this.selectedArticle = new Article(0);
          this.subject.next(this.selectedArticle);
          return of(true);
      }
  }

  refreshSelectedArticle(article: Article){
      this.subject.next(article);
  }

  // Search Articles
  getAllBySearchString(searchString: string){
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



/*
import { CategoryService } from 'src/app/services/article.service';
import { SourceService } from './source.service';
import { Injectable } from '@angular/core';
import { Article } from '../models/article';
import { LocalStorageTable } from '../enums/local-storage-table.enum';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  public articles: Article[] = [];
  private sourceService: SourceService;
  private categoryService: CategoryService;

  constructor() { 
    //this.sourceService = new SourceService();
    //this.categoryService = new CategoryService();
  }

  // Add Article
  addArticle(article: Article) {
    var articleArray = this.getLocalStorage();
    if(articleArray != null) {
      var maxId = Math.max.apply(Math, articleArray.map((o:Article) => {return o.ArticleId}));
      article.ArticleId = maxId + 1;
    }
    else {
      article.ArticleId = 1;
    }
    articleArray.push(article);
    this.setLocalStorage(articleArray);
  }

  // Update Article
  updateArticle(article: Article) {

    // if id is 0
    if(article.ArticleId === 0) {
      this.addArticle(article);
    }
    else {
      var articleInStore = this.getArticleById(article.ArticleId);

      // If article does not exist in the persistance store
      if(articleInStore === null) {
        article.ArticleId = 0;
        this.addArticle(article);
      }
      else {
        //articleInStore.title = article.title;

        var articleArray = this.getLocalStorage();
        for(var i in articleArray) {
          if(articleArray[i].id == article.id){
            articleArray[i].author = article.author;
            articleArray[i].title = article.title;
            articleArray[i].summary = article.summary;
            articleArray[i].url = article.url;
            articleArray[i].publicationDate = article.publicationDate;
            articleArray[i].content = article.content;
            articleArray[i].synopsis = article.synopsis;
            articleArray[i].sourceId = article.sourceId;
            articleArray[i].source = article.source;
            articleArray[i].categoryId = article.categoryId;
            articleArray[i].category = article.category;
            articleArray[i].image = article.image;
            articleArray[i].imageName = article.imageName;
          }
        }
        this.setLocalStorage(articleArray);
      }
    }
  }

  // Delete Article
  deleteArticle(id: number) {
    var articleArray = this.getLocalStorage();
    for(var i in articleArray) {
      if(articleArray[i].id === id) {
        articleArray.splice(+i, 1);
        this.setLocalStorage(articleArray);
      }
    }
  }

  // Get Article By Id
  getArticleById(id: number) : Article {
    var articleArray = this.getLocalStorage();
    var article = articleArray.filter(article => article.id === id).pop();
    return article;
  }

  // Get all Articles
  getArticles() : Article[] {
    this.articles = this.getLocalStorage();

    if(this.articles === null || this.articles.length === 0){
      var dummyArticles = this.getDummyArticles();
      this.articles = dummyArticles;
      this.setLocalStorage(dummyArticles);
    }

    for(var i=0; i < this.articles.length; i++){
      // if(this.categoryService.getCategoryById(this.articles[i].categoryId) !== undefined) {
      //   this.articles[i].category = this.categoryService.getCategoryById(this.articles[i].categoryId).Name;
      // }
      
      // if(this.sourceService.getSougetrceById(this.articles[i].sourceId) !== undefined) {
      //   this.articles[i].source = this.sourceService.getSourceById(this.articles[i].sourceId).name;
      // }
    }
    this.setLocalStorage(this.articles);
    return this.articles;
  }

  // Search Articles
  getArticlesBySearchString(searchString: string){
    if(searchString === "") {
      return this.getArticles();
    }
    var articles = this.getLocalStorage();
    var result: Article[] = new Array();

    for(var index = 0; index <articles.length; index++) {
      var entry = articles[index];
      if(
        entry && 
        (
          (entry.title && entry.title.toUpperCase().indexOf(searchString.toUpperCase()) != -1)
          || (entry.summary && entry.summary.toUpperCase().indexOf(searchString.toUpperCase()) != -1)
          || (entry.content && entry.content.toUpperCase().indexOf(searchString.toUpperCase()) != -1)
        
        )) {
        result.push(entry);
      }
    }
    this.articles = result;
    return this.articles;
  }

  // Save dummy Articles
  getDummyArticles() : Article[] {
    var dummyArticles = [
      new Article(
        // Id
        1, 
        // author
        'Vivek Deshpande', 
        // title
        'Two leopards, sloth bears electrocuted at Maharashtra ordinance factory', 
        // summary
        'The Chandrapur Ordnance Factory covers a vast forest area which is home to a variety of wildlife, including leopards. There have been several occassions when even tigers were spotted in the factory area, owing to its proximity to the Tadoba-Andhari Tiger Reserve (TATR).', 
        // synopsis
        '',
        // url
        'https://indianexpress.com/article/india/two-leopards-sloth-bears-electrocuted-at-maharashtra-ordinance-factory-6246450/', 
        // publicationDate
        new Date(), 
        // content
        'Four wild animals — two leopards and two sloth bears — were found electrocuted within the premises of an Ordnance Factory in Maharashtra’s Chandrapur on Saturday, raising questions over the status of security at the sensitive installation. Blaming poachers over the deaths, Chandrapur Honorary Wildlife Warden Bandu Dhotre said the incident shows how wildlife is vulnerable in such high-security zone.',
        // sourceId 
        1,
        //categoryId 
        1,
        // source
        '',
        // category
        '',
        // Image
        null,
        // Image Name
        ""
        ),

        new Article(
          // Id
          2, 
          // author
          'Pranav Mukul', 
          // title
          'With 324 Indians from coronavirus-hit Wuhan, Air India flight reaches Delhi', 
          // summary
          'For an initial check, screening camps have also been set up at Delhi\'s Indira Gandhi International Airport. The crew, which is also learnt to be under a seven-day lockdown, are unlikely to be allowed to meet even their families during this period.', 
          // synopsis
          '',
          // url
          'https://indianexpress.com/article/india/with-324-indians-from-coronavirus-hit-wuhan-air-india-flight-reaches-delhi-6245465/', 
          // publicationDate
          new Date(), 
          // content
          'Air India’s special flight evacuating Indian citizens from Wuhan, the Chinese city locked down due to the coronavirus outbreak, landed in Delhi at 7.26 am on Saturday. The flight, operated on a 423-seater Boeing 747 jumbo jet aircraft, brought back 324 people  — comprising 211 students, 110 working professionals, and three minors — from Wuhan to Delhi, from where they will be taken to special quarantine camps set up in Manesar.',
          // sourceId 
          1,
          //categoryId 
          1,
          // source
          '',
          // category
          '',
          // Image
          null,
          // Image Name
          ""
          ),
      //new Article(2, 'Indian Culture'),
      //new Article(3, 'History of India')
    ];

    return dummyArticles;
  }

  // Get Local Storage
  getLocalStorage(): Article[] {
    return JSON.parse(localStorage.getItem(LocalStorageTable.Article));
  }

  // Reset Local Storage
  setLocalStorage(articleArray: Article[]) {
    localStorage.setItem(LocalStorageTable.Article, JSON.stringify(articleArray));
  }

  
  
}
*/