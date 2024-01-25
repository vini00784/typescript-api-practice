import Message from '../module/messages'
import UserModel from '../models/userModel'
import { Prisma } from '@prisma/client'
import { CreateUserProps } from '../@types/userInfosProps'
import bycript from '../lib/bcrypt'

const userModel = new UserModel()
const messages = new Message()

export default class UserController {
    async createUser(userInfos: CreateUserProps) {
        try {
            const hashedPassword = await bycript.hash(userInfos.password, 10)

            const userToCreate: CreateUserProps = {
                name: userInfos.name,
                email: userInfos.email,
                password: hashedPassword
            }

            const createdUser = await userModel.createUser(userToCreate)

            if(createdUser) {
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

    async getAllUsers() {
        try {
            const getUsers = await userModel.findAllUsers()

            if(getUsers) {
                return {
                    statusCode: 200,
                    message: getUsers
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