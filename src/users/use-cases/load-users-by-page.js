import { localhostUserToModel } from "../mappers/localhost-user.mapper";
import { User } from "../models/user";

/**
 * 
 * @param {Number} page 
 * @returns {Promise<User[]>}
 */
export const loadUsersByPage = async (page = 1) => {

    const url = `${ import.meta.env.VITE_BASE_URL }/users?_page=${ page }`;
    //const url = `http://localhost:3001/users?_page=${ page }`;
    
    console.log(url);
    const res = await fetch(url);
    const data = await res.json();

    //mi idea
    //let users = [];
    //data.forEach(element => {
    //    const user = localhostUserToModel(element);
    //    users.push(user);
    //});
    
    //sustituye cada posicion del array por lo que devuelve localhostUserToModel
    //const users = data.map( userLike => localhostUserToModel(userLike) );
    //simplificado
    const users = data.map( localhostUserToModel );

    return users;
}