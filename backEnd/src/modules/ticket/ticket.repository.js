import { useId } from "react";
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
export const getTicketId = async (ticketId) => {
    return prisma.ticket.findUnique({
        where: { id: parseInt(ticketId.id) },
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
export const createTicket = async (ticket) => {
    return prisma.ticket.create({
        data: {
            title: ticket.title,
            description: ticket.description,
            status: ticket.status,
            priority: ticket.priority,
            dueDate: ticket.dueDate,
            createdBy: ticket.createdBy,
            ticketUsers: ticket.ticketUsers?.length ? {
                create: ticket.ticketUsers.map(user => ({
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
    console.log(ticket);
};

export const updateTicket = async (updatePayload) => {
    return prisma.ticket.update({
        where: { id: parseInt(updatePayload.id) },
        data: {
            title: updatePayload.title,
            description: updatePayload.description,
            status: updatePayload.status,
            priority: updatePayload.priority,
            dueDate: updatePayload.dueDate,
            createdBy: updatePayload.createdBy,

            ticketUsers: updatePayload.ticketUsers?.length ? {
                deleteMany: {},
                create: updatePayload.ticketUsers.map(user => ({
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

// export const createComment = async (commentData) => {
//     return prisma.comment.create({
//         data: {
//             ticketId: parseInt(commentData.ticketId),
//             userId: parseInt(commentData.userId),
//             content: commentData.content

//         },
//         // include: {
//         //     comments: {
//         //         include: { user: true }
//         //     }
//         // }
//     });

// };
