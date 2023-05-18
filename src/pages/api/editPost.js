import clientPromise from "../../lib/mongodb";

export default async function getSchedules(req, res) {
    try {
        const client = await clientPromise;
        const db = client.db("schedules");
        const { sem } = req.query;
        const { name, content } = req.body;

        // Delete all old documents from the collection
        await db.collection(name).deleteMany({});

        // Generate new _id values for each document in the content array
        const newContent = content.map((doc) => ({
            ...doc,
            _id: new ObjectId(),
        }));

        // Insert new content into the collection
        await db.collection(name).insertMany(newContent);

        const schedule = await db
            .collection(sem)
            .find({})
            .limit(10)
            .toArray();

        res.status(200).json({ message: `${name} schedule edited successfully` });
    } catch (e) {
        console.error(e);
    }
};