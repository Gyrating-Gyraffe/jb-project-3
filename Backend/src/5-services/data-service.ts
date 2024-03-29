import dal from "../2-utils/dal";
import { OkPacket } from "mysql";
import UserModel from "../3-models/user-model";
import { ListNotFoundError, ResourceNotFoundError, ValidationError } from "../3-models/client-errors";
import VacationModel from "../3-models/vacation-model";
import imageHelper from "../2-utils/image-helper";
import appConfig from "../2-utils/app-config";

async function getAllVacations(): Promise<VacationModel[]> {
    // Create sql: 
    const sql = `SELECT vacationId, destination, description, startDate, endDate, price,
                    CONCAT('/api/images/vacations/', imageName) as imageUrl, followerCount
                FROM vacations`;

    const vacations = await dal.execute(sql);

    if (vacations.length === 0) throw new ListNotFoundError();

    return vacations;
}

async function getVacation(vacationId: number): Promise<VacationModel> {
    // Create sql: 
    const sql = `SELECT vacationId, destination, description, startDate, endDate, price,
                    CONCAT('/api/images/vacations/', imageName) as imageUrl, followerCount
                FROM vacations WHERE vacationId = ?`;

    const vacation = await dal.execute(sql, [vacationId]);

    if (!vacation[0]) throw new ResourceNotFoundError(vacationId);

    return vacation[0];
}

async function addVacation(vacation: VacationModel): Promise<VacationModel> {
    vacation.validate();

    const imageName = await imageHelper.saveImage(vacation.image);

    const sql = `INSERT INTO vacations VALUES(DEFAULT, ?, ?, ?, ?, ?, ?, ?)`;

    const info: OkPacket = await dal.execute(sql, [vacation.destination, vacation.description,
    vacation.startDate, vacation.endDate, vacation.price, imageName, vacation.followerCount]);

    // Standard A.I primary key:
    vacation.vacationId = info.insertId;

    // Get image url:
    vacation.imageUrl = `${appConfig.domainName}/api/vacations/${imageName}`;

    // Remove image from vacation object because we don't response it back:
    delete vacation.image;

    // Return added vacation:
    return vacation;
}

async function updateVacation(vacation: VacationModel): Promise<void> {
    if (!vacation.image)
        return await updateVacationNoImage(vacation);

    // Save the new image and get the UUID image name as it appears in the Database, and delete the old image:
    const imageName = await imageHelper.updateImage(vacation.image, vacation.vacationId);

    const sql = `UPDATE vacations 
                SET destination = ?,
                    description = ?,
                    startDate = ?,
                    endDate = ?,
                    price = ?,
                    imageName = ?
                WHERE vacationId = ?`;

    // Get image url for the client (GET request URL):
    vacation.imageUrl = `${appConfig.origin}/api/vacations/${imageName}`;

    const info: OkPacket = await dal.execute(sql, [vacation.destination, vacation.description,
    vacation.startDate, vacation.endDate, vacation.price, imageName, vacation.vacationId]);

    if (info.affectedRows === 0) throw new ResourceNotFoundError(vacation.vacationId);
}

async function updateVacationNoImage(vacation: VacationModel): Promise<void> {
    const sql = `UPDATE vacations 
                SET destination = ?,
                    description = ?,
                    startDate = ?,
                    endDate = ?,
                    price = ?
                WHERE vacationId = ?`;

    const info: OkPacket = await dal.execute(sql, [vacation.destination, vacation.description,
    vacation.startDate, vacation.endDate, vacation.price, vacation.vacationId]);

    if (info.affectedRows === 0) throw new ResourceNotFoundError(vacation.vacationId);
}

async function deleteVacation(vacationId: number): Promise<void> {

    // Delete vacation image:
    await imageHelper.deleteImage(vacationId);

    // Delete vacation:
    const sql = `DELETE FROM vacations WHERE vacationId = ?`;

    const info: OkPacket = await dal.execute(sql, [vacationId]);

    if (info.affectedRows === 0) throw new ResourceNotFoundError(vacationId);
}

async function followVacation(vacationId: number, userId: number): Promise<boolean> {

    // Check if the user is already following the vacation:
    const isFollowing = await getVacationFollowStatus(vacationId, userId);

    if (isFollowing) {
        // If the user is already following, unfollow by deleting the record:
        await dal.execute('DELETE FROM followers WHERE userId = ? AND vacationId = ?', [userId, vacationId]);

    }
    else {
        // If the user is not following, follow by inserting a new record:
        await dal.execute('INSERT INTO followers(userId, vacationId) VALUES (?, ?)', [userId, vacationId]);
    }

    // Update vacation model's follower count for this vacation:
    const followerCountIncrement = isFollowing ? -1 : 1;
    await dal.execute(`UPDATE vacations SET followerCount = followerCount + ${followerCountIncrement} 
                        WHERE vacationId = ?`, [vacationId]);

    return !isFollowing;
}

async function getVacationFollowStatus(vacationId: number, userId: number): Promise<boolean> {

    // Check if the user is already following the vacation:
    const isFollowing = await dal.execute('SELECT 1 FROM followers WHERE userId = ? AND vacationId = ?', [userId, vacationId]);

    return isFollowing.length > 0;
}

async function getAllUsers(): Promise<UserModel[]> {
    const sql = `SELECT * FROM users`;
    const users = await dal.execute(sql);

    if (users.length === 0) throw new ListNotFoundError();

    return users;
}

async function getOneUser(userId: number): Promise<UserModel> {

    const sql = `SELECT * FROM users WHERE userId = ?`;
    const users = await dal.execute(sql, [userId]);

    if (users.length === 0) throw new ResourceNotFoundError(userId);

    const user = users[0];

    return user;
}

async function updateUser(user: UserModel): Promise<void> {

    const error = user.validate();

    if (error) throw new ValidationError(error);

    const sql = `
        UPDATE users SET
            firstName = ?,
            lastName = ?,
            email = ?
        WHERE userId = ?`;

    const info: OkPacket = await dal.execute(sql, [user.firstName, user.lastName, user.email, user.userId]);

    if (info.affectedRows === 0) throw new ResourceNotFoundError(user.userId);
}

async function getUserFollowIDs(userId: number): Promise<number[]> {
    const sql = `SELECT vacationId FROM followers WHERE userId = ?`;

    // Collection of vacationId objects:
    const vacationIds: { vacationId: number }[] = await dal.execute(sql, [userId]);

    if (vacationIds.length === 0) throw new ListNotFoundError();

    // Map to a number array:
    const numericalArray: number[] = vacationIds.map((item: { vacationId: number }) => item.vacationId);

    return numericalArray;
}

export default {
    getAllUsers,
    getOneUser,
    updateUser,
    getUserFollowIDs,
    getAllVacations,
    getVacation,
    addVacation,
    updateVacation,
    deleteVacation,
    followVacation,
    getVacationFollowStatus
};

