import type { UserRepository } from '../domain/user/repository.js'
import type { PasswordHasher, UserService } from './user.types.js'

export function createUserService(repository: UserRepository, hasher: PasswordHasher): UserService {
    return {
        async register(input) {
            const email = input.email.trim();
           
            const passwordHash = await hasher.hash(input.password);
            const user = await repository.createUser({
                email,
                passwordHash: passwordHash,
            })
            return { id: user.id, email: user.email }
        }
    }
}