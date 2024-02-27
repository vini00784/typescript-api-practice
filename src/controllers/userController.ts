import Message from '../module/messages'
import UserModel from '../models/userModel'
import { CreateUserProps, UpdateUserProps } from '../@types/userInfosProps'
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
            const usersInfos = await userModel.findAllUsers()

            if(usersInfos) {
                return {
                    statusCode: 200,
                    message: usersInfos
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
    
    async getUserById(userId: number) {
        try {
            const userById = await userModel.findUserById(userId)

            if(userById) {
                return {
                    statusCode: 200,
                    message: userById
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

    async updateUser(userId: number, userInfo: UpdateUserProps) {
        try {
            const updatedUser = await userModel.updateUser(userId, userInfo)

            if(updatedUser) {
                return {
                    statusCode: 201,
                    message: messages.MESSAGE_SUCESS.UPDATE_ITEM
                }
            } else {
                return {
                    statusCode: 400,
                    message: messages.MESSAGE_ERROR.COULDNT_UPDATE_ITEM
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