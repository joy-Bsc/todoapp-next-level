import { NextRequest , NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { hashPassword } from "@/lib/hash";
import { signToken } from "@/lib/tokens";

export async function POST(req: NextRequest) {
    try {
        await connectDB();
        const { name, email, password } = await req.json();
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return NextResponse.json({ message: "User already exists" }, { status: 400 });
        }

        const hashedPassword = await hashPassword(password);
        
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });
        const token = signToken({ _id: user._id, email: user.email });

        return NextResponse.json({
            success: true,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email
            },
            token
        }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}