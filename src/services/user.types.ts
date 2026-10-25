import type { PublicUser } from '../domain/user/entity.js'

export interface UserInput {
    email: string
    password: string
}

export interface PasswordHasher {
    hash(password: string): Promise<string>
}

export interface UserService {
    register(input: UserInput): Promise<PublicUser>
}