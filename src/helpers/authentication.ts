import * as express from 'express';
import * as jwt from 'jsonwebtoken';

export function expressAuthentication(request: express.Request, securityName: string, scopes?: string[]): Promise<any> {

  if (securityName === 'jwt') {
    const token = request.body.token || request.query.token || request.headers['authorization'];

    return new Promise((resolve, reject) => {
      if (!token) {
        reject(new Error("No token provided"))
      }
      jwt.verify(token, process.env['TOKEN_SECRED'], function (err: any, decoded: any) {
        if (err) {
          reject(err)
        } else {
          if(!scopes.includes(decoded.role)){
              reject(new Error("JWT does not contain required scope."));
            }else{
                resolve(decoded);
            }          
        }
      });
    });
  }
};