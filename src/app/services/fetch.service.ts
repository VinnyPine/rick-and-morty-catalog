import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Body, Headers, Options, Params } from '../types/fetch';

@Injectable({
  providedIn: 'root',
})
export class FetchService {
  private http = inject(HttpClient);
  private _url: string = '';
  private _headers: Headers = {};
  private _params: Params = {};
  private _body?: Body;
  private _options?: Options;

  setUrl(url: string) {
    this._url = url;

    return this;
  }

  options(options: Options) {
    this._options = options;

    return this;
  }

  headers(headers: Headers) {
    Object.assign(this._headers, headers);

    return this;
  }

  params(params: Params) {
    Object.assign(this._params, params);

    return this;
  }

  body(body: Body) {
    this._body = body;
    return this;
  }

  private httpOptions(): Options | undefined {
    const hasHeaders = Object.keys(this._headers).length;
    const hasParams = Object.keys(this._params).length;
    const noSettingOptions = !hasHeaders && !hasParams && !this._options;

    if (noSettingOptions) return undefined;

    const options = {};
    if (this._options) Object.assign(options, { ...this._options });
    if (hasHeaders) Object.assign(options, { headers: this._headers });
    if (hasParams) Object.assign(options, { params: this._params });

    return options;
  }

  get<T>(...endpoints: string[]) {
    const urlArray = this._url ? [this._url, ...endpoints] : endpoints;
    return this.http.get<T>(urlArray.join('/'), this.httpOptions());
  }

  post<T>(...endpoints: string[]) {
    const urlArray = this._url ? [this._url, ...endpoints] : endpoints;
    return this.http.post<T>(
      urlArray.join('/'),
      this._body,
      this.httpOptions()
    );
  }
}
