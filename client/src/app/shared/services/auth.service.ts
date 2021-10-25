import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs'
import {Message, User} from '../interfaces'
import {tap} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token

  private userId = null

  constructor(private http: HttpClient) {
  }

  register(user: User): Observable<User> {
    return this.http.post<User>('/api/auth/register', user)
  }

  login(user: User): Observable<{token: string, userId: string, status: string}> {
    return this.http.post<{token: string, userId: string, status: string}>('/api/auth/login', user)
      .pipe(
        tap(
          ({token, userId, status }) => {
            localStorage.setItem('auth-token', token)
            localStorage.setItem('userId', userId)
            localStorage.setItem('status', status)
            this.setToken(token)
          }
        )
      )
  }

  featch(): Observable<User[]> {
    return this.http.get<User[]>('/api/auth/getAll')
}

  getUserId(user: User): Observable<{userId:string}>{
    return this.http.post<{userId:string}>('/api/auth/getUserId', user)
      .pipe(
        tap(
          ({userId}) => {
            localStorage.setItem('UserId', userId)
            this.setId(userId)
          }
        )
      )
  }

  changePassword(userId: string, form: any):Observable<Message> {
    return this.http.patch<Message>('api/auth/password/'+userId, form)
  }

  setToken(token: string) {
    this.token = token
  }
  setId(userId: string){
    this.userId = userId
  }

  getId(): string {
    return this.userId
  }

  getToken(): string {
    return this.token
  }

  isAuthenticated(): boolean {
    return !!this.token
  }

  logout() {
    this.setToken(null)
    localStorage.clear()
  }
}
