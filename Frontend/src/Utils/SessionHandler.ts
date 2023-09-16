// Handles storing and reading info about a user's browsing session. Things like: 
// *Have we shown the user a 'Welcome back' message? *Do we need to tell the user their login is expired?

class SessionHandler {
    // Is this the first time the user has loaded this session. (0 args) -> Asked as a question. (1 arg) -> Stated as answer:
    public isFirstSessionLoad = (state?: boolean): boolean => {
        if (state !== undefined) {
            state ?
                sessionStorage.setItem('shownWelcomeBack', 'true')
                : sessionStorage.removeItem('shownWelcomeBack');
            return state;
        }

        const storageEntry = sessionStorage.getItem('shownWelcomeBack');

        return !!storageEntry;
    }
}

// Singleton export:
const sessionHandler = new SessionHandler();

export default sessionHandler;