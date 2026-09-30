import mongoose from 'mongoose'

export async function connectDB(): Promise<void> {
    const uri = process.env.URI;
    if (!uri) { throw new Error("uri is undifind") }
    await mongoose.connect(uri)
    console.log('Mongo DB Connected');
}