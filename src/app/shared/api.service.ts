import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  postEmploye(data: any) {
    return this.http.post<any>("http://localhost:3000/posts", data)
    pipe(map((res: any) => {res}))
  }
  getEmploye() {
    return this.http.get<any>("http://localhost:3000/posts")
    pipe(map((res: any) => {res}))
  }
  updateEmploye(data: any, id: number) {
    return this.http.put<any>("http://localhost:3000/posts/"+id, data)
    pipe(map((res: any) => {res}))
  }
  deleteEmploye(id: number) {
    return this.http.delete<any>("http://localhost:3000/posts/"+id)
    pipe(map((res: any) => {res}))
  }
}
