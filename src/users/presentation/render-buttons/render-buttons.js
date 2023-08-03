import usersStore from '../../store/users-store';
import { renderTable } from '../render-table/render-table';
import './render-buttons.css';

/**
 * 
 * @param {HTMLDivElement} element 
 */
export const renderButtons = ( element ) => {

    const firstPageButton = document.createElement('button');
    firstPageButton.innerText = '<< First ';

    const lastPageButton = document.createElement('button');
    lastPageButton.innerText = ' Last >>';
    
    const nextPageButton = document.createElement('button');
    nextPageButton.innerText = ' Next >';
    
    const prevPageButton = document.createElement('button');
    prevPageButton.innerText = '< Prev ';

    const currentPageLabel = document.createElement('span');
    currentPageLabel.id = 'current-page';
    currentPageLabel.innerHTML = usersStore.getCurrentPage();

    element.append(firstPageButton, prevPageButton, currentPageLabel, nextPageButton, lastPageButton );

    //LISTENERS
    nextPageButton.addEventListener('click', async () => {
        await usersStore.loadNextPage();
        currentPageLabel.innerHTML = usersStore.getCurrentPage();
        renderTable( element );
    });

    prevPageButton.addEventListener('click', async () => {
        await usersStore.loadPreviousPage();
        currentPageLabel.innerHTML = usersStore.getCurrentPage();
        renderTable( element );
    });

    firstPageButton.addEventListener('click', async () => {
        await usersStore.loadFirstPage();
        currentPageLabel.innerHTML = usersStore.getCurrentPage();
        renderTable( element );
    });

    lastPageButton.addEventListener('click', async () => {
        await usersStore.loadLastPage();
        currentPageLabel.innerHTML = usersStore.getCurrentPage();
        renderTable( element );
    });
}