import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  apiUrl = 'http://192.168.1.8:3000';

  constructor(private httpClient: HttpClient) {
  }

  async getRequest(endpoint: string): Promise<any> {
    const url = `${this.apiUrl}/${endpoint}`;
    return new Promise((resolve, reject) => {
      this.httpClient.get(url).subscribe(data => {
        resolve(data);
      }, error => reject(error));
    });
  }

  async postRequest(endpoint: string, body: any): Promise<any> {
    const url = `${this.apiUrl}/${endpoint}`;
    return new Promise((resolve, reject) => {
      this.httpClient.post(url, body).subscribe(data => {
        resolve(data);
      }, error => reject(error));
    });
  }

  async putRequest(endpoint: string, body: any): Promise<any> {
    const url = `${this.apiUrl}/${endpoint}`;
    return new Promise((resolve, reject) => {
      this.httpClient.put(url, body).subscribe(data => {
        resolve(data);
      }, error => reject(error));
    });
  }

  async deleteRequest(endpoint: string): Promise<any> {
    const url = `${this.apiUrl}/${endpoint}`;
    return new Promise((resolve, reject) => {
      this.httpClient.delete(url).subscribe(data => {
        resolve(data);
      }, error => reject(error));
    });
  }


}


