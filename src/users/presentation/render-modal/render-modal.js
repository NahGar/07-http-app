import { User } from '../../models/user';
import './render-modal.css';
import modalHtml from './render-modal.html?raw';
import { getUserById } from "../../use-cases/get-user-by-id";

let modal, form;
//se utiliza para no perder campos que no se mantienen, como por 
//ejemplo: gender
let loadedUser = {}; //objeto vacío

/**
 * 
 * @param {String|Number} id 
 */
export const showModal = async ( id ) => {
    modal?.classList.remove('hide-modal');
    loadedUser = {}; //objeto vacío

    if(!id) return;
    const user = await getUserById( id );
    setFormValues( user );
}

export const hideModal = () => {
    modal?.classList.add('hide-modal');
    //limpia los valores cargados
    form?.reset();
}

/**
 * 
 * @param {User} user 
 */
const setFormValues = ( user ) => {
    form.querySelector('[name="firstName"]').value = user.firstName;
    form.querySelector('[name="lastName"]').value = user.lastName;
    form.querySelector('[name="balance"]').value = user.balance;
    form.querySelector('[name="isActive"]').checked = user.isActive;
    loadedUser = user;
}

/**
 * 
 * @param {HTMLDivElement} element 
 * @param {(userLike)=>Promise<void>} callback
 */
export const renderModal = ( element, callback ) => {

    if( modal ) return;

    modal = document.createElement('div');
    modal.innerHTML = modalHtml;
    modal.className = 'modal-container hide-modal';

    form = modal.querySelector('form');

    modal.addEventListener('click', (event) => {
        
        if(event.target.className === 'modal-container') {
            hideModal();
        }
    });

    form.addEventListener('submit', async (event) => {
        //para evitar el POST
        event.preventDefault();

        const formData = new FormData( form );
        const userLike = { ...loadedUser };

        //for (const iterator of formData) {
        for (const [key, value] of formData) {
            
            if ( key === 'balance') {
                //data[key] = Number(value);
                userLike[key] = +value;
                continue; //se va al siguiente registro del for
            }

            if ( key === 'isActive') {
                userLike[key] = ( value === 'on') ? true: false;
                continue
            }

            userLike[key] = value;

        }

        await callback( userLike );

        hideModal();
    });

    element.append( modal );
}