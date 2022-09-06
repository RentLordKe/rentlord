import db from "../config/dbconfig";

const migrate = async () => {
    try {
        await db.sync();
    } catch (error) {
        console.log(error);
    }
}

migrate();