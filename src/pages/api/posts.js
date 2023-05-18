import clientPromise from "../../lib/mongodb";

export default async function getSchedules(req, res) {
    try {
        const client = await clientPromise;
        const db = client.db("schedules");
        const {sem} = req.query;
        const schedule = await db
            .collection(sem)
            .find({})
            .limit(10)
            .toArray();

        res.json(schedule);
    } catch (e) {
        console.error(e);
    }
};