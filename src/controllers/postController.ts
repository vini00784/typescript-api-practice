import Message from '../module/messages'
import PostModel from '../models/postModel'
import { CreatePostProps } from '../@types/postInfosProps'

const postModel = new PostModel()
const messages = new Message()

export default class PostController {
    async createPost(postInfos: CreatePostProps) {
        try {
            const postToCreate: CreatePostProps = {
                title: postInfos.title,
                content: postInfos.content,
                userId: postInfos.userId
            }

            const createdPost = await postModel.createPost(postToCreate)

            if(createdPost) {
                return {
                    statusCode: 201,
                    message: messages.MESSAGE_SUCESS.INSERT_ITEM
                }
            } else {
                return {
                    statusCode: 400,
                    message: messages.MESSAGE_ERROR.REQUIRED_FIELDS
                }
            }
        } catch (error) {
            return {
                statusCode: 500,
                message: messages.MESSAGE_ERROR.INTERNAL_ERROR_DB
            }
        }
    }

    async getAllPosts() {
        try {
            const postsInfos = await postModel.findAllPosts()

            if(postsInfos) {
                return {
                    statusCode: 200,
                    message: postsInfos
                }
            } else {
                return {
                    statusCode: 404,
                    message: messages.MESSAGE_ERROR.NOT_FOUND_DB
                }
            }
        } catch (error) {
            return {
				statusCode: 500,
				message: messages.MESSAGE_ERROR.INTERNAL_ERROR_DB,
			};
        }
    }
}