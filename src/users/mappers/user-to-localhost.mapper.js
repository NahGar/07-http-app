import { User } from "../models/user"

export const userModelToLocalhost = ( user ) => {

    //desestructurar
    const {
        avatar,
        balance,
        firstName,
        gender,
        id,
        isActive,
        lastName,
    } = user;

    return {
        avatar,
        balance,
        first_name: firstName,
        gender,
        id,
        isActive,
        last_name: lastName,
    }
}
