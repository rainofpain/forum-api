import type { UserRepository } from '../domain/user/repository.js';

type DatabaseType = typeof import('../prisma/db.js').db;

export function createUserRepository(db: DatabaseType): UserRepository {
    return {
        async createUser(user) {
            try{
                return await db.orm.public.User.create(user);

            } catch (error) {
                if (error instanceof Error && "sqlState" in error && error.sqlState === "23505") {
                    throw new Error("USER_ALREADY_EXISTS");
                }

                throw error;
            }
        }
    }
}