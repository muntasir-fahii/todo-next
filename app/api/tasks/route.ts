import connectMongoDB from "@/libs/mongodb";
import Task from "@/models/task";
import { NextResponse } from "next/server";

// post a new todo
export async function POST(request: Request) {
  try {
    const { text, status } = await request.json();
    console.log(text, status);
    await connectMongoDB();

    const task = await Task.create({ text, status });
    return NextResponse.json(task);
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// get all todos
export async function GET() {
  try {
    await connectMongoDB();
    const task = await Task.find().sort({ createdAt: -1 });

    if (!task) {
      return NextResponse.json({ message: "Todo not found." }, { status: 404 });
    }

    return NextResponse.json(task);
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
