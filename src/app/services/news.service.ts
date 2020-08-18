import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class NewsService {

  private apiv2url = 'https://m.ssm.com.my/apiv2/index.php/'

  constructor(private http: HttpClient) { }

  
}
