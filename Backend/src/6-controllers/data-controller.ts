import express, { NextFunction, Request, Response } from "express";
import path from "path";
import StatusCode from "../3-models/status-code";
import UserModel from "../3-models/user-model";
import VacationModel from "../3-models/vacation-model";
import blockNonAdmin from "../4-middleware/block-non-admin";
import dataService from "../5-services/data-service";
import requireToken from "../4-middleware/require-token";
import ExpandedRequest from "../3-models/expanded-request";
import { UnauthorizedError } from "../3-models/client-errors";

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

router.get("/vacations/:id", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const vacationId = +request.params.id;

        const vacation = await dataService.getVacation(vacationId);

        response.json(vacation);
    }
    catch(err: any) {
        next(err);
    }
});

router.post("/vacations", [requireToken, blockNonAdmin], async (request: ExpandedRequest, response: Response, next: NextFunction) => {
    try {
        // Add image from request.files into request.body:
        request.body.image = request.files?.image;

        const vacation = new VacationModel(request.body);
        
        const addedVacation = await dataService.addVacation(vacation);
        response.status(StatusCode.Created).json(addedVacation);
    }
    catch(err: any) {
        next(err);
    }
});

router.patch("/vacations/:id", [requireToken, blockNonAdmin], async (request: ExpandedRequest, response: Response, next: NextFunction) => {
    try {
        // Add image from request.files into request.body:
        request.body.image = request.files?.image;

        // Get vacation Id from request params:
        request.body.vacationId = +request.params.id;

        delete request.body.imageUrl;

        const vacation = new VacationModel(request.body);
        await dataService.updateVacation(vacation);
        response.send();
    }
    catch (err: any) {
        next(err);
    }
});

router.delete("/vacations/:id", [requireToken, blockNonAdmin], async (request: ExpandedRequest, response: Response, next: NextFunction) => {
    try {
        const vacationId = +request.params.id;

        await dataService.deleteVacation(vacationId);
        
        response.sendStatus(StatusCode.NoContent);
    }
    catch (err: any) {
        next(err);
    }
});

// GET http://localhost:4000/api/vacations/:imageName
router.get("/images/vacations/:imageName", async (request: Request, response: Response, next: NextFunction) => {
    try {

        // Get image name: 
        const imageName = request.params.imageName;

        // Get image absolute path:
        const absolutePath = path.join(__dirname, "..", "1-assets", "images", imageName);

        // Response back the image file:
        response.sendFile(absolutePath);
    }
    catch (err: any) {
        next(err);
    }
});

// POST http://localhost:4000/api/vacations/:id/follow
router.post("/vacations/:id/follow", requireToken, async (request: ExpandedRequest, response: Response, next: NextFunction) => {
    try {

        // Get vacation id: 
        const vacationId = +request.params.id;

        // Get user id:
        const { user } = request;
        
        if(!user) throw new UnauthorizedError("You must be logged in to follow");

        // Call service:
        const isFollowing = await dataService.followVacation(vacationId, user.userId);

        response.send(isFollowing);
    }
    catch (err: any) {
        next(err);
    }
});

// GET http://localhost:4000/api/vacations/:id/follow
router.get("/vacations/:id/follow", requireToken, async (request: ExpandedRequest, response: Response, next: NextFunction) => {
    try {

        // Get vacation id: 
        const vacationId = +request.params.id;

        // Get user id:
        const { user } = request;
        
        if(!user) throw new UnauthorizedError("No user found to check for follows");

        // Call service:
        const isFollowing = await dataService.getVacationFollowStatus(vacationId, user.userId);

        response.send(isFollowing);
    }
    catch (err: any) {
        next(err);
    }
});

router.get("/followids", requireToken, async (request: ExpandedRequest, response: Response, next: NextFunction) => {
    try {
        const userId = request.user.userId;
        
        const vacationIds = await dataService.getUserFollowIDs(userId);

        response.json(vacationIds);
    }
    catch(err: any) {
        next(err);
    }
});

// USERS AREA
router.get("/users", [requireToken, blockNonAdmin], async (request: Request, response: Response, next: NextFunction) => {
    try {
        const users: UserModel[] = await dataService.getAllUsers();
        
        response.json(users);
    }
    catch(err: any) {
        next(err);
    }
});


router.get("/users/:id", [requireToken, blockNonAdmin], async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = +request.params.id;
        const user = await dataService.getOneUser(id);
        response.json(user);
    }
    catch (err: any) {
        next(err);
    }
});

router.patch("/users/:id", [requireToken, blockNonAdmin], async (request: Request, response: Response, next: NextFunction) => {
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
