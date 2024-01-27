import { Post } from "@prisma/client";

export interface CreateUserProps {
    name: string;
    email: string;
    password: string;
};