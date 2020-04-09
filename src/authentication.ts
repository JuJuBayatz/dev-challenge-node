import * as express from 'express';
import * as jwt from 'jsonwebtoken';

export function expressAuthentication(request: express.Request, securityName: string, scopes?: string[]): Promise<any> {
  console.log('sss') ;   
  if (securityName === 'jwt') {
    const token = request.body.token || request.query.token || request.headers['authorization'];
    
    const temp = jwt.decode(token);
    console.log(token);
    console.log(temp);
    return new Promise((resolve, reject) => {
      if (!token) {
        reject(new Error("No token provided"))
      }
      jwt.verify(token, "shhhh", function (err: any, decoded: any) {
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