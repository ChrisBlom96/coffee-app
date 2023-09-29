import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://joshua.intelliacc.com/ws_Auth/Auth.asmx?op=Validate_Login';

  constructor(private http: HttpClient) { }

  validateLogin(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'text/xml')
      .set('SOAPAction', 'http://tempuri.org/Validate_Login');

    const body = `
    <?xml version="1.0" encoding="utf-8"?>
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                   xmlns:xsd="http://www.w3.org/2001/XMLSchema"
                   xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
        <Validate_Login xmlns="intelliacc.com/ws_Auth">
          <Request>
            <UserName>${username}</UserName>
            <Password>${password}</Password>
          </Request>
        </Validate_Login>
      </soap:Body>
    </soap:Envelope>
    `.trim();

    return this.http.post(this.apiUrl, body, { headers, responseType: 'text' });
  }
  getProducts(): Observable<any> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'text/xml')
      .set('SOAPAction', 'http://tempuri.org/Get_Products');
  
    const body = `
    <?xml version="1.0" encoding="utf-8"?>
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                   xmlns:xsd="http://www.w3.org/2001/XMLSchema"
                   xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
        <Get_Products xmlns="intelliacc.com/ws_Products">
          <Request></Request>
        </Get_Products>
      </soap:Body>
    </soap:Envelope>
    `.trim();
  
    return this.http.post(`${this.apiUrl}?op=Get_Products`, body, { headers, responseType: 'text' });
  }
}