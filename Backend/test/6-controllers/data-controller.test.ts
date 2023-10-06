import { expect } from "chai";
import { describe, it } from "mocha";
import supertest from "supertest";
import { ResourceNotFoundError, UnauthorizedError, ValidationError } from "../../src/3-models/client-errors";
import UserModel from "../../src/3-models/user-model";
import VacationModel from "../../src/3-models/vacation-model";
import app from "../app.test";
import testInject from "../test-inject";
import dataService from "../../src/5-services/data-service";

export const testDataController = () => {

    // ID used to test GET, PATCH, etc. of one vacation:
    const test_vacationId = 16;

    // Image name for testing GET /api/images/vacations:
    const test_vacationImageName = "6e604b07-1274-4167-a2a2-9d28e0e3c35d.jpg";

    // ID of vacation added in first post test. Is used to test correct delete request:
    let test_delete_vacationId = 0;

    // Expected keys in Vacation Model:
    const expectedKeys = [
        'vacationId',
        'destination',
        'description',
        'startDate',
        'endDate',
        'price',
        'imageUrl',
        'followerCount',
    ];

    // Create a sample vacation data object to post, patch etc:
    const test_vacationData = {
        destination: "Sample Destination",
        description: "Sample Description",
        startDate: "2023-01-01",
        endDate: "2023-01-10",
        price: 1000,
        imageUrl: "https://example.com/sample.jpg",
        followerCount: 0,
    };

    // Define some mock data for testing
    const mock_user: UserModel = {
        userId: 1,
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        password: "password",
        isAdmin: 0
    } as UserModel;

    // IDs of added vacations in test POST requests. Used in cleanup to delete them:
    const addedVacationIds: number[] = [];

    // ================================================================================================
    // Vacations Tests
    // ================================================================================================

    // GET Tests --------------------------------------------------------
    describe("Data Controller - GET Endpoints", async () => {

        it("Should get vacations array", async () => {
            const response = await supertest(app.server).get("/api/vacations");
            const vacations = response.body;

            // Check that the response is an array
            expect(vacations).to.be.an('array');

            // Check that each object in the array satisfies the expected keys
            vacations.forEach((vacation: VacationModel) => {
                expect(vacation).to.include.all.keys(expectedKeys);
            });
        });

        it("Should get one vacation", async () => {
            const response = await supertest(app.server).get("/api/vacations/" + test_vacationId);
            const data = response.body;

            expect(data).to.have.keys(expectedKeys);
        });

        it("Should throw 404 when asking for non-existant vacation", async () => {
            try {
                await supertest(app.server).get("/api/vacations/0");
            }
            catch (err: any) {
                expect(err).to.be.instanceOf(ResourceNotFoundError);
            }
        });

        it("Should throw 400 when asking for vacation with non-numeric id", async () => {
            try {
                await supertest(app.server).get("/api/vacations/abc");
            }
            catch (err: any) {
                expect(err).to.be.instanceOf(ValidationError);
            }
        });

        it("Should get one image file", async () => {
            const response = await supertest(app.server).get("/api/images/vacations/" + test_vacationImageName);

            // Check the response status code:
            expect(response.status).to.equal(200);

            // Check the response content type:
            expect(response.header['content-type']).to.include('image');
        });
    })

    // POST Tests --------------------------------------------------------
    describe("Data Controller - POST Endpoints", async () => {

        it("Should post one vacation and respond back with the added vacation in the same structure", async () => {

            // Make a POST request to the /vacations endpoint with the sample data:
            const response = await supertest(app.server)
                .post("/api/vacations")
                .send(test_vacationData);

            // Check the response status code (should be 201 - Created):
            expect(response.status).to.equal(201);

            // Check the response body for the added vacation data:
            const addedVacation = response.body;

            // Assign vacationId to test_delete for later use in delete test:
            test_delete_vacationId = addedVacation.vacationId;

            expect(addedVacation).to.have.keys(expectedKeys);
        });

        it("Should post one vacation and respond back with the same dates", async () => {

            // Make a POST request to the /vacations endpoint with the sample data:
            const response = await supertest(app.server)
                .post("/api/vacations")
                .send(test_vacationData);

            // Check the response status code (should be 201 - Created):
            expect(response.status).to.equal(201);

            // Check the response body for the added vacation data:
            const addedVacation = response.body;

            // Check absolute time for both returned dates versus what was posted:
            expect(new Date(addedVacation.startDate).getTime()).to.be.equal(new Date(test_vacationData.startDate).getTime());
            expect(new Date(addedVacation.endDate).getTime()).to.be.equal(new Date(test_vacationData.endDate).getTime());

            // Added vacation's id for cleanup:
            addedVacationIds.push(addedVacation.vacationId);
        });

        // Follow/unfollow POST req should respond with alternating booleans on success, this keeps track:
        let isFollowing: boolean;

        it("Should post to follow (follow/unfollow) and receive a boolean response", async () => {

            // Inject a mock user:
            testInject.mock_user = mock_user;

            const response = await supertest(app.server)
                .post(`/api/vacations/${test_vacationId}/follow`);

            expect(response.status).to.equal(200);
            expect(response.body).to.be.a('boolean');

            // Save response boolean. Used in next 'it':
            isFollowing = response.body;
        });

        it("Should post to follow (follow/unfollow) again and receive an opposite boolean", async () => {

            const response = await supertest(app.server)
                .post(`/api/vacations/${test_vacationId}/follow`);

            expect(response.status).to.equal(200);
            expect(response.body).to.be.a('boolean');
            expect(response.body).to.not.equal(isFollowing);

            // Remove injected mock user:
            testInject.mock_user = undefined;
        });

        it("Should throw 401 when trying to follow/unfollow without an authed user", async () => {
            try {
                await supertest(app.server).post(`/api/vacations/${test_vacationId}/follow`);
            }
            catch (err: any) {
                expect(err).to.be.instanceOf(UnauthorizedError);
            }
        });
    });

    // PATCH Tests --------------------------------------------------------
    describe("Data Controller - PATCH Endpoints", async () => {

        it("Should patch one vacation and respond with status code 200", async () => {

            // Make a PATCH request to the /vacations endpoint with the sample data:
            const response = await supertest(app.server)
                .patch("/api/vacations/" + test_vacationId)
                .send(test_vacationData);

            // Check the response status code (should be 200 - OK):
            expect(response.status).to.equal(200);
        });

    });

    // DELETE Tests --------------------------------------------------------
    describe("Data Controller - DELETE Endpoints", async () => {

        it("Should delete one vacation and respond with status code 204", async () => {

            // Make a PATCH request to the /vacations endpoint with the sample data:
            const response = await supertest(app.server)
                .delete("/api/vacations/" + test_delete_vacationId)
                .send();

            // Check the response status code (should be 204 - No Content):
            expect(response.status).to.equal(204);
        });
    });

    after(() => {

        // Delete all vacations added in POST tests:
        addedVacationIds.forEach(async (id) => {
            await dataService.deleteVacation(id);
        });


    });
}