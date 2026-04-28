// src/modules/comment/comment.repository.js
import { prisma } from "../../../lib/prisma.js";

export const createComment = async (data) => {
    return prisma.comment.create({
        data: {
            content: data.content,
            ticketId: parseInt(data.ticketId), // ID của ticket nhận comment
            userId: parseInt(data.userId)      // ID của người viết comment
        },
        include: {
            user: { // Lấy thông tin người viết để hiển thị ngay
                select: { name: true, email: true }
            }
        }
    });
};

export const updateComment = async (updatePayload) => {
    return prisma.comment.update({
        where: { id: parseInt(updatePayload.id) },
        data: {
            content: updatePayload.content,
            ticketId: parseInt(updatePayload.ticketId),
            userId: parseInt(updatePayload.userId)
        },
    });
};

export const deleteComment = async (id) => {
    return prisma.comment.delete({
        where: { id: parseInt(id) }
    });
};

// export const updateComment = async (id, updateData) => {
//     return prisma.comment.update({
//         where: { id: parseInt(id) },
//         data: {
//             content: updateData.content,
//             ticketId: parseInt(updateData.ticketId),
//             userId: parseInt(updateData.userId)
//         },
//     });
// };

