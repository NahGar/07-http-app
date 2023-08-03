import './render-modal.css';
import modalHtml from './render-modal.html?raw';

let modal, form;


export const showModal = () => {
    modal?.classList.remove('hide-modal');
}

export const hideModal = () => {
    modal?.classList.add('hide-modal');
}

/**
 * 
 * @param {HTMLDivElement} element 
 */
export const renderModal = ( element ) => {

    if( modal ) return;

    modal = document.createElement('div');
    modal.innerHTML = modalHtml;
    modal.className = 'modal-container hide-modal';

    form = modal.querySelector('form');

    modal.addEventListener('click', (event) => {
        console.log(event.target);
        if(event.target.className === 'modal-container') {
            hideModal();
        }
    });

    form.addEventListener('submit', (event) => {
        //para evitar el POST
        event.preventDefault();
    });

    element.append( modal );
}