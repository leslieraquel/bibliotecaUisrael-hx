import jwt from 'jsonwebtoken';

export class UserToken {
    constructor(public readonly value: string) {}
    
    static generate(payload: any): UserToken {
        const token = jwt.sign(payload, process.env.JWT_SECRET || 'secret-key', { 
            expiresIn: '24h' 
        });
        return new UserToken(token);
    }
    
    static verify(token: string): any {
        return jwt.verify(token, process.env.JWT_SECRET || 'secret-key');
    }
}