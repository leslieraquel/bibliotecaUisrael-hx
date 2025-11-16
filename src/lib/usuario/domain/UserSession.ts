export class UserSession {
    constructor(
        public readonly token: string,
        public readonly user: {
            ci: string;
            name: string;
            email: string;
        },
        public readonly expiresAt: Date
    ) {}
}