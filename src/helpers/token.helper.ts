import * as express from 'express';
import * as jwt from 'jsonwebtoken';

export function parseToken(request: express.Request): any {

    const token = request.body.token || request.query.token || request.headers['authorization'];
    return jwt.decode(token);
};