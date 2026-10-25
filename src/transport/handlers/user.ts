import type { UserService } from "../../services/user.types";
import type { UserResponse } from "../dto/user/responses";
import type { UserRequest } from "../dto/user/requests";
import type { UserError } from "../dto/user/errors";
import type { Response, Request } from "express";

export interface UserHandler{
    register(req: Request<{}, {}, UserRequest, {}>, res: Response<UserResponse| UserError>): Promise<Response>
}

export function createUserHandler(service: UserService): UserHandler{

    return{
        async register(req, res){
            const {email, password} = req.body;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (
                typeof email !== 'string' || 
                !emailRegex.test(email.trim()) || 
                typeof password !== 'string' || 
                password.length < 8
            ) {
                return res.status(422).json({message: 'Invalid register input'});
            }
            try{
                const user = await service.register({email, password});
                return res.status(201).json(user);
            }
            catch(error){
                if (
                    error instanceof Error &&
                    error.message === 'USER_ALREADY_EXISTS'
                ) {
                   return res.status(409).json({ message: 'User with this email already exists' });
                }

                return res.status(500).json({ message: 'Internal server error' });
            }
        }
    }
}