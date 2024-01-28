import { CreatePostProps } from "../@types/postInfosProps";
import prisma from "../lib/prisma";

export default class PostModel {
    async createPost(postInfos: CreatePostProps) {
        try {
            return await prisma.post.create({
                data: {
                    title: postInfos.title,
                    content: postInfos.content,
                    userId: postInfos.userId
                }
            })
        } catch (error) {
            console.log(error);
            throw new Error(`${error}`)
        }
    }

    async findAllPosts() {
        try {
            return await prisma.post.findMany({
                include: {
                    user: true
                }
            })
        } catch (error) {
            console.log(error);
            throw new Error(`${error}`)
        }
    }
}