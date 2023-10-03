import { Notyf } from "notyf";

class NotifyService {

    private notyf = new Notyf({
        duration: 3000,
        position: { x: "center", y: "top" },
        ripple: false
    });

    public success(message: string): void {
        this.notyf.success(message);
    }

    public error(err: any): void {
        const message = this.extractErrorMessage(err);
        this.notyf.error(message);
    }

    private extractErrorMessage(err: any): string {
        
        // If error is the message string: 
        if (typeof err === "string") return err;

        // If error thrown by axios:
        if (err.response?.data) return err.response.data;
        else if (err.message === "AxiosError: Network Error") return "Couldn't connect to the server";
        else if (err.message) return err.message;
        
        // Unknown error (JIC = Just in Case)
        return "Some error, please try again";
    }

}

const notifyService = new NotifyService();

export default notifyService;
