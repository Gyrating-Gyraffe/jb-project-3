import express, { Request, Response, NextFunction } from "express";
import dataService from "../5-services/data-service";
import UserModel from "../3-models/user-model";
import blockNonAdmin from "../4-middleware/block-non-admin";
import VacationModel from "../3-models/vacation-model";

const router = express.Router();

router.get("/vacations", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const vacations: VacationModel[] = await dataService.getAllVacations();

        response.json(vacations);
    }
    catch(err: any) {
        next(err);
    }
});

router.post("/vacations", blockNonAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const vacation = new VacationModel(request.body);
        const addedVacation = await dataService.addVacation(vacation);
        response.status(201).json(addedVacation);
    }
    catch(err: any) {
        next(err);
    }
});

router.patch("/vacations/:id", blockNonAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        request.body.id = +request.params.id;
        const vacation = new VacationModel(request.body);
        vacation.vacationId = request.body.id;
        await dataService.updateVacation(vacation);
        response.send();
    }
    catch (err: any) {
        next(err);
    }
});

router.get("/users", blockNonAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const users: UserModel[] = await dataService.getAllUsers();
        
        response.json(users);
    }
    catch(err: any) {
        next(err);
    }
});


router.get("/users/:id", blockNonAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = +request.params.id;
        const user = await dataService.getOneUser(id);
        response.json(user);
    }
    catch (err: any) {
        next(err);
    }
});

router.patch("/users/:id", blockNonAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        request.body.id = +request.params.id;
        const user = new UserModel(request.body);
        await dataService.updateUser(user);
        response.send()
    }
    catch (err: any) {
        next(err);
    }
});


export default router;
