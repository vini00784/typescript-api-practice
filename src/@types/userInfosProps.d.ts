import { Post } from "@prisma/client";

type CreateUserProps = {
    name: string;
    email: string;
    password: string;
    posts?: Array<Post>;
};