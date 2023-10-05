import mysql from "mysql";
import appConfig from "./app-config";

// Create a connection to the AWS RDS database instance:
const connection = mysql.createPool({
    host: appConfig.mysql_host,
    user: appConfig.mysql_user,
    password: appConfig.mysql_password,
    database: appConfig.mysql_databaseName,
    multipleStatements: true
});

// Execute any sql: 
function execute(sql: string, values?: any[]): Promise<any> {

    // Promisify:
    return new Promise<any>((resolve, reject) => {

        // Execute query in database:
        connection.query(sql, values, (err, result) => {

            // If query failed:
            if (err) {
                reject(err);
                return;
            }

            // Query succeeded:
            resolve(result);

        });
    });
}

export default {
    execute
};