import prisma from '@/app/lib/prisma'
import { NextResponse, NextRequest } from 'next/server'

export async function GET(request: Request) {

    await prisma.todo.deleteMany(); 

    await prisma.todo.createMany({
        data: [
            {description: 'Piedra del timepo', complete: true},
            {description: 'Piedra del poder'},
            {description: 'Piedra del alma'},
            {description: 'Piedra del espacio'},
            {description: 'Piedra del realidad'},
        ]
    })
    

    return NextResponse.json({ message: 'Seed executed' })
}