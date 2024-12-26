import { TestBed } from '@angular/core/testing';

import { FetchService } from './fetch.service';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

describe('FetchService', () => {
  let service: FetchService;
  let httpTesting: HttpTestingController;

  const API_URL = 'https://testingurl.api';

  const RESPONSE = {
    data: 'test',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(FetchService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be request GET', async () => {
    const response$ = service.get<{ data: string }>(API_URL, 'testGet');

    const responsePromise = firstValueFrom(response$);

    const req = httpTesting.expectOne(API_URL + '/testGet', 'Request GET');

    expect(req.request.method).toBe('GET');

    req.flush(RESPONSE);

    expect(await responsePromise).toEqual(RESPONSE);

    httpTesting.verify();
  });

  it('should be request POST', async () => {
    const response$ = service.post<{ data: string }>(API_URL, 'testPost');

    const responsePromise = firstValueFrom(response$);

    const req = httpTesting.expectOne(API_URL + '/testPost', 'Request POST');

    expect(req.request.method).toBe('POST');

    req.flush(RESPONSE);

    expect(await responsePromise).toEqual(RESPONSE);

    httpTesting.verify();
  });

  it('should be set url', async () => {
    const response$ = service.setUrl(API_URL).get<{ data: string }>('testGet');

    const responsePromise = firstValueFrom(response$);

    const req = httpTesting.expectOne(API_URL + '/testGet', 'Request GET');

    expect(req.request.method).toBe('GET');

    req.flush(RESPONSE);

    expect(await responsePromise).toEqual(RESPONSE);

    httpTesting.verify();
  });

  it('should be set url params', async () => {
    const response$ = service.setUrl(API_URL).get('test', '1,2,3');

    const responsePromise = firstValueFrom(response$);

    const req = httpTesting.expectOne(API_URL + '/test/1,2,3', 'Request a test with url params');

    req.flush(RESPONSE);

    expect(await responsePromise).toEqual(RESPONSE);

    httpTesting.verify();
  });

  it('should be set params', async () => {
    const response$ = service
      .setUrl(API_URL)
      .params({ page: 2 })
      .get<{ data: string }>('testGet');

    const responsePromise = firstValueFrom(response$);

    const req = httpTesting.expectOne(
      API_URL + '/testGet' + '?page=2',
      'Request GET'
    );

    expect(req.request.method).toBe('GET');

    req.flush(RESPONSE);

    expect(await responsePromise).toEqual(RESPONSE);

    httpTesting.verify();
  });

  it('should be set headers', async () => {
    const response$ = service
      .setUrl(API_URL)
      .headers({ auth: 'token' })
      .get<{ data: string }>('testGet');

    const responsePromise = firstValueFrom(response$);

    const req = httpTesting.expectOne(API_URL + '/testGet', 'Request GET');

    expect(req.request.method).toBe('GET');
    expect(req.request.headers.has('auth')).toBeTruthy();
    expect(req.request.headers.get('auth')).toBe('token');

    req.flush(RESPONSE);

    expect(await responsePromise).toEqual(RESPONSE);

    httpTesting.verify();
  });

  it('should be set options', async () => {
    const response$ = service
      .setUrl(API_URL)
      .options({ params: { page: 4 }, headers: { auth: 'token' } })
      .get<{ data: string }>('testGet');

    const responsePromise = firstValueFrom(response$);

    const req = httpTesting.expectOne(
      API_URL + '/testGet?page=4',
      'Request GET'
    );

    expect(req.request.method).toBe('GET');
    expect(req.request.headers.has('auth')).toBeTruthy();
    expect(req.request.headers.get('auth')).toBe('token');

    req.flush(RESPONSE);

    expect(await responsePromise).toEqual(RESPONSE);

    httpTesting.verify();
  });

  it('should be set options and params has priority', async () => {
    const response$ = service
      .setUrl(API_URL)
      .params({ page: 5 })
      .options({ params: { page: 4 }, headers: { auth: 'token' } })
      .get<{ data: string }>('testGet');

    const responsePromise = firstValueFrom(response$);

    const req = httpTesting.expectOne(
      API_URL + '/testGet?page=5',
      'Request GET'
    );

    expect(req.request.method).toBe('GET');
    expect(req.request.headers.has('auth')).toBeTruthy();
    expect(req.request.headers.get('auth')).toBe('token');

    req.flush(RESPONSE);

    expect(await responsePromise).toEqual(RESPONSE);

    httpTesting.verify();
  });

  it('should be set options and headers has priority', async () => {
    const response$ = service
      .setUrl(API_URL)
      .headers({ auth: 'replaceToken' })
      .options({ params: { page: 4 }, headers: { auth: 'token' } })
      .get<{ data: string }>('testGet');

    const responsePromise = firstValueFrom(response$);

    const req = httpTesting.expectOne(
      API_URL + '/testGet?page=4',
      'Request GET'
    );

    expect(req.request.method).toBe('GET');
    expect(req.request.headers.has('auth')).toBeTruthy();
    expect(req.request.headers.get('auth')).toBe('replaceToken');

    req.flush(RESPONSE);

    expect(await responsePromise).toEqual(RESPONSE);

    httpTesting.verify();
  });

  it('should be send body', async () => {
    const response$ = service
      .setUrl(API_URL)
      .body({ data: 'test' })
      .post<{ data: string }>('testPost');

    const responsePromise = firstValueFrom(response$);

    const req = httpTesting.expectOne(
      API_URL + '/testPost',
      'Request POST'
    );

    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ data: 'test' });

    req.flush(RESPONSE);

    expect(await responsePromise).toEqual(RESPONSE);

    httpTesting.verify();
  });
});
