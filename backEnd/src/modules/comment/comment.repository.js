import { useId } from "react";
import { prisma } from "../../../lib/prisma";

export const createComment = async (commentData) => {
    return prisma.comment.create({
        data: {
            ticketId: parseInt(commentData.ticketId),
            userId: parseInt(commentData.userId),
            content: commentData.content
        },
        include: {
            user: { // Lấy thông tin người viết để hiển thị ngay
                select: { name: true, email: true }
            }
        }
    });
};