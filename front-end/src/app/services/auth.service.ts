import { Adal5HTTPService, Adal5Service } from 'adal-angular5';
import { HttpClient, HttpHandler } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {
    private _user = null;
    private _config = {
        tenant: '0075db31-3f45-451a-b7d9-9ca926504d74',
        clientId: 'ba3add81-dd99-4b86-aa52-9acd840a0955',
        redirectUri: 'http://localhost:4200/auth-callback',
        postLogoutRedirectUri: 'http://localhost:4200'
    };

    constructor(private _adal: Adal5Service) {
        this._adal.init(this._config);

        if (this.isLoggedIn()) {
            console.log(
                `Reloading the page, it's the same token and it expires in ${this._expireIn()} seconds`
            );
        }
    }

    public isLoggedIn(): boolean {
        console.log(this._adal.userInfo);
        return (
            this._adal.userInfo &&
            this._adal.userInfo.authenticated &&
            this._expireIn() > 0
        );
    }

    public signOut(): void {
        this._adal.logOut();
    }

    public startAuthentication(): any {
        this._adal.login();
    }

    public getName(): string {
        return this._adal.userInfo.profile.name;
    }

    public getToken(): string {
        console.log(this._adal.userInfo);
        return this._adal.userInfo.token;
    }

    public completeAuthentication(): void {
        this._adal.handleWindowCallback();
        console.log(
            `Authentication OK and the token expires in ${this._expireIn()} seconds`
        );
    }

    private _expireIn(): number {
        return Math.round(
            this._adal.userInfo.profile.exp - new Date().getTime() / 1000
        );
    }
}
