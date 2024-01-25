import { CreateUserProps } from "../@types/userInfosProps";
import prisma from "../lib/prisma";

// prisma.entity_name.http_method
export default class UserModel {
    async createUser(userInfos: CreateUserProps) {
        try {
            return await prisma.user.create({
                data: {
                    name: userInfos.name,
                    email: userInfos.email,
                    password: userInfos.password
                }
            }) ;
        } catch (error) {
            console.log(error);
            throw new Error(`${error}`);
        };
    };

    async findAllUsers() {
        try {
            return await prisma.user.findMany({
                include: {
                    posts: true
                }
            })
        } catch (error) {
            console.log(error);
            throw new Error(`${error}`);
        }
    }

    async findUserById(userId: number) {
        try {
            return await prisma.user.findUnique({
                where: {
                    id: userId
                }
            })
        } catch (error) {
            console.log(error);
            throw new Error(`${error}`);
        }
    }
};