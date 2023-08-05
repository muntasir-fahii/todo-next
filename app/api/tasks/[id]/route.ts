import connectMongoDB from "@/libs/mongodb";
import Task from "@/models/task";
import { NextResponse } from "next/server";

// find a single Task
export async function GET(request: Request, { params }: { params: any }) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { message: "Invalid request. Missing 'id' parameter." },
        { status: 400 }
      );
    }

    await connectMongoDB();
    const task = await Task.findById(id);
    return NextResponse.json(task);
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// update Task
export async function PUT(request: Request, { params }: { params: any }) {
  try {
    const { id } = params;
    const { text, status } = await request.json();

    if (!id) {
      return NextResponse.json(
        { message: "Invalid request. Missing 'id' parameter." },
        { status: 400 }
      );
    }
    await connectMongoDB();

    const task = await Task.findByIdAndUpdate(
      id,
      { text, status },
      { new: true }
    );
    return NextResponse.json(task);
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// delete Task
export async function DELETE(request: Request, { params }: { params: any }) {
  try {
    const { id } = params;
    if (!id) {
      return NextResponse.json(
        { message: "Invalid request. Missing 'id' parameter." },
        { status: 400 }
      );
    }

    await connectMongoDB();
    const task = await Task.findByIdAndRemove(id);
    return NextResponse.json(task);
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
