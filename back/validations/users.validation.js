import joi from "joi";

export default function usersValidation(body){
    const usersCreate = joi.object({
      password: joi.string().required(),
      login: joi.string().required()
    })

    const usersUpdate = joi.object({
      password: joi.string(),
      login: joi.string()
    })

    const usersLogin = joi.object({
      login: joi.string(),
      password: joi.string(),
    })

    return {
        usersCreate: usersCreate.validate(body),
        usersUpdate: usersUpdate.validate(body),
        usersLogin: usersLogin.validate(body),
    }
}
