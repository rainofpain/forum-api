import argon2 from 'argon2'

export const passwordHasher = {
    async hash(password: string): Promise<string> {
        const pepper = process.env.PASSWORD_PEPPER; 
        if (!pepper) {
            throw new Error('PASSWORD_PEPPER is not defined in environment variables');
        }
        
        return argon2.hash(password, {
            type: argon2.argon2id,
            memoryCost: 19456,
            timeCost: 2,
            parallelism: 1,
        })
    }
}