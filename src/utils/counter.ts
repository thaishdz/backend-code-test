import Counter from "../contexts/core/genially/domain/schemas/stats.schema";

export async function incrementCounter(counterName: string): Promise<void> {
    await Counter.findOneAndUpdate(
        { name: counterName },
        { $inc: { count: 1} },
        { upsert: true, new: true }
    );
}


export async function getCounterByName(counterName: string): Promise<number> {
    const counter = await Counter.findOne({ name: counterName});
    return counter.count;
}