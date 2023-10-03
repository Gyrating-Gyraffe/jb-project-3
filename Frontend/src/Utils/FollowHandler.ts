import VacationModel from "../Models/VacationModel";
import globalStore, { GlobalActionType } from "../Redux/GlobalState";
import dataService from "../Services/DataService";
import notifyService from "../Services/NotifyService";

class FollowHandler {

    // Get the initial follow ID array for current user (if not logged in, will give 401 error):
    public getInitialFollowIDs() {

        // Get followed vacationId array from DB:
        dataService.getUserFollowIDs()
            .then(data => {
    
                // Update Redux state:
                globalStore.dispatch({ payload: data, type: GlobalActionType.SetFollowIDs });
            })
            .catch(err => notifyService.error(err));
    }

    // Check if a given vacation is in the userFollowIDs array:
    public checkFollow(vacationId: number): boolean {

        // Check against Redux state:
        const filtered = globalStore.getState().userFollowIDs.filter(id => id === vacationId);      

        return filtered?.length > 0;
    }

    // Follow/Unfollow a vacation when its follow button is pressed:
    public handleFollow(vacation: VacationModel) {
        dataService.followVacation(vacation.vacationId)
            .then(res => this.updateUserFollowIDs(res, vacation))
            .catch(err => notifyService.error(err.message));
    }

    // Filter by follow status:
    public filterByFollow(vacations: VacationModel[]): VacationModel[] {
        return vacations.filter(v => {
            return this.checkFollow(v.vacationId);
        });
    }

    // Update the userFollowIDs array, and make changes to the follower count of the given Vacation Model:
    public updateUserFollowIDs(isFollowing: boolean, vacation: VacationModel) {

        // Get Redux state:
        let newFollowIDs = globalStore.getState().userFollowIDs;

        // Add follow:
        if (isFollowing) {
            newFollowIDs.push(vacation.vacationId);
            vacation.followerCount++;
        }
        // Remove follow:
        else {
            newFollowIDs = newFollowIDs.filter(id => id !== vacation.vacationId);
            vacation.followerCount--;
        }

        // Update Redux state:
        globalStore.dispatch({ payload: newFollowIDs, type: GlobalActionType.SetFollowIDs });
    }
}

const followHandler = new FollowHandler();
export default followHandler;