import { prisma } from "../../../lib/prisma.ts";

// Lấy toàn bộ Ticket
export const getAllTicket = async () => {
    return prisma.ticket.findMany({
        where: {},
        select: {
            id: true,
            title: true,
            description: true,
            status: true,
            priority: true,
            dueDate: true,
            createdAt: true,
            updatedAt: true,
            createdBy: true,
            creator: {
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            },
            ticketUsers: true,
            comments: true
        }
    });
}

// Lấy thông tin Ticket theo ID
export const getTicketId = async (id) => {
    return prisma.ticket.findUnique({
        where: { id: parseInt(id) },
        select: {
            id: true,
            title: true,
            description: true,
            status: true,
            priority: true,
            dueDate: true,
            createdAt: true,
            updatedAt: true,
            createdBy: true,
            creator: {
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            },
            ticketUsers: true,
            comments: true
        }
    })
}

//Tạo Ticket mới
export const createTicket = async (dataTicket) => {
    return prisma.ticket.create({
        data: {
            title: dataTicket.title,
            description: dataTicket.description,
            status: dataTicket.status,
            priority: dataTicket.priority,
            dueDate: dataTicket.dueDate,
            createdBy: dataTicket.createdBy,
            ticketUsers: dataTicket.ticketUsers?.length ? {
                create: dataTicket.ticketUsers.map(user => ({
                    userId: user.userId,
                    role: user.role,
                    isMain: user.isMain ?? false
                }))
            } : undefined
        },
        include: {
            creator: {
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            },
            ticketUsers: {
                include: { user: true }
            }
        }

    });
    console.log(dataTicket);
};

export const updateTicket = async (id, data) => {
    return prisma.ticket.update({
        where: { id: parseInt(id) },
        data: {
            title: data.title,
            description: data.description,
            status: data.status,
            priority: data.priority,
            dueDate: data.dueDate,
            createdBy: data.createdBy,

            ticketUsers: data.ticketUsers?.length ? {
                deleteMany: {},
                create: data.ticketUsers.map(user => ({
                    userId: user.userId,
                    role: user.role,
                    isMain: user.isMain ?? false
                }))
            } : undefined
        },
    });
};

export const deleteTicket = async (id) => {
    return prisma.ticket.delete({
        where: { id: parseInt(id) }
    })
};

