import dal from "../2-utils/dal";
import { OkPacket } from "mysql";
import UserModel from "../3-models/user-model";
import { ListNotFoundError, ResourceNotFoundError, ValidationError } from "../3-models/client-errors";
import VacationModel from "../3-models/vacation-model";

async function getAllVacations(): Promise<VacationModel[]> {
    const sql = `SELECT * FROM vacations`;
    const vacations = await dal.execute(sql);

    if(vacations.length === 0) throw new ListNotFoundError();

    return vacations;
}

async function addVacation(vacation: VacationModel): Promise<VacationModel> {
    const sql = `INSERT INTO vacations VALUES(DEFAULT, ?, ?, ?, ?, ?, ?)`;
    
    const info: OkPacket = await dal.execute(sql, [vacation.destination, vacation.description, 
        vacation.startDate, vacation.endDate, vacation.price, vacation.imageName || '']);
    
    // Standard A.I primary key:
    vacation.vacationId = info.insertId;

    return vacation;
}

async function updateVacation(vacation: VacationModel): Promise<void> {
    const sql = `UPDATE vacations 
                SET destination = ?,
                    description = ?,
                    startDate = ?,
                    endDate = ?,
                    price = ?,
                    imageName = ?
                WHERE vacationId = ?`;
    
    const info: OkPacket = await dal.execute(sql, [vacation.destination, vacation.description, 
        vacation.startDate, vacation.endDate, vacation.price, vacation.imageName || '', vacation.vacationId]);

    if(info.affectedRows === 0) throw new ResourceNotFoundError(vacation.vacationId);
}

async function getAllUsers(): Promise<UserModel[]> {
    const sql = `SELECT * FROM users`;
    const users = await dal.execute(sql);
    
    if(users.length === 0) throw new ListNotFoundError();

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

    if(error) throw new ValidationError(error);

    const sql = `
        UPDATE users SET
            firstName = ?,
            lastName = ?,
            email = ?
        WHERE userId = ?`;

    const info: OkPacket = await dal.execute(sql, [user.firstName, user.lastName, user.email, user.userId]);

    if (info.affectedRows === 0) throw new ResourceNotFoundError(user.userId);
}

export default {
    getAllUsers,
    getOneUser,
    updateUser,
    getAllVacations,
    addVacation,
    updateVacation
};

