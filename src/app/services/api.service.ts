import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pod } from '../coffee-flavours/coffee-flavours.page';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://192.168.252.119/Auth.asmx';

  constructor(private http: HttpClient) { }

  validateLogin(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'text/xml');

    const body = `
      <?xml version="1.0" encoding="utf-8"?>
      <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                     xmlns:xsd="http://www.w3.org/2001/XMLSchema"
                     xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
        <soap:Body>
          <ValidateLogin xmlns="intelliacc.com/ws_Auth">
            <InputUsername>${username}</InputUsername>
            <InputPassword>${password}</InputPassword>
          </ValidateLogin>
        </soap:Body>
      </soap:Envelope>
    `.trim();

    return this.http.post(`${this.apiUrl}?op=Validate_Login`, body, { headers, responseType: 'text' });
  }

  getProducts(): Observable<any> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'text/xml');

    const body = `
    <?xml version="1.0" encoding="utf-8"?>
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                   xmlns:xsd="http://www.w3.org/2001/XMLSchema"
                   xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
        <GetAllEntriesFromCOFFEESTOCK_TEMP_APPLICATION xmlns="intelliacc.com/ws_Auth">
          <Request></Request>
        </GetAllEntriesFromCOFFEESTOCK_TEMP_APPLICATION>
      </soap:Body>
    </soap:Envelope>
    `.trim();

    return this.http.post(`${this.apiUrl}?op=GetAllEntriesFromCOFFEESTOCK_TEMP_APPLICATION`, body, { headers, responseType: 'text' });
  }

  savePod(pod: Pod, image?: string): Observable<any> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'text/xml');

    const body = `
      <?xml version="1.0" encoding="utf-8"?>
      <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                     xmlns:xsd="http://www.w3.org/2001/XMLSchema"
                     xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
        <soap:Body>
          <UpdateEntryByID xmlns="intelliacc.com/ws_Auth">
            <Request>
              <ID>${pod.ID}</ID>
              <ProductNumber>${pod.Barcode}</ProductNumber>
              <Name>${pod.Name}</Name>
              <PricePerBox>${pod.PricePerBox}</PricePerBox>
              <PodsPerBox>${pod.PodsPerBox}</PodsPerBox>
              <PhotoName>${pod.PhotoName}</PhotoName>
              ${image ? `<Image>${image}</Image>` : ''}
            </Request>
          </UpdateEntryByID>
        </soap:Body>
      </soap:Envelope>
    `.trim();

    return this.http.post(this.apiUrl, body, { headers, responseType: 'text' });
  }

  deletePod(id: number): Observable<any> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'text/xml');

    const body = `
      <?xml version="1.0" encoding="utf-8"?>
      <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                     xmlns:xsd="http://www.w3.org/2001/XMLSchema"
                     xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
        <soap:Body>
          <DeleteEntryByID xmlns="intelliacc.com/ws_Auth">
            <ID>${id}</ID>
          </DeleteEntryByID>
        </soap:Body>
      </soap:Envelope>
    `.trim();

    return this.http.post(this.apiUrl, body, { headers, responseType: 'text' });
  }
}