import { loadUsersByPage } from "../use-cases/load-users-by-page"

const state = {
    currentPage: 0,
    users:[],
    countPages: 0,
}

const loadNextPage = async() => {
    const users = await loadUsersByPage( state.currentPage + 1 );
    //si no hay registros no cambia la página actual
    if( users.length === 0 ) {
        state.countPages = state.currentPage;
        return;
    }
    
    state.currentPage += 1;
    state.users = users;
}

const loadPreviousPage = async() => {
    if( state.currentPage > 1) {
        const users = await loadUsersByPage( state.currentPage - 1 );
        state.currentPage -= 1;
        state.users = users;
    }
}

const loadFirstPage = async() => {
    state.currentPage = 0;
    const users = await loadUsersByPage( state.currentPage + 1 );
    //si no hay registros no cambia la página actual
    if( users.length === 0 ) return;
    
    state.currentPage += 1;
    state.users = users;
}

const loadLastPage = async() => {

    if(state.countPages === 0) {
        let lastPage = 1;
        let continuar = true;
        do {
            const users = await loadUsersByPage( lastPage );
            if( users.length === 0) {
                lastPage -= 1;
                continuar = false;
            }
            else {
                lastPage += 1;
            }
        } while( continuar )
        state.countPages = lastPage;
    }
    
    const users = await loadUsersByPage( state.countPages );
    
    state.currentPage = state.countPages;
    state.users = users;
}


const onUserChanged = () => {

}

const reloadPage = async () => {

}

export default {
    loadNextPage,
    loadPreviousPage,
    onUserChanged,
    reloadPage,
    loadFirstPage,
    loadLastPage,

    getUsers: () => [...state.users],
    getCurrentPage: () => state.currentPage,
}