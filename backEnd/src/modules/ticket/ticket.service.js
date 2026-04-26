import * as ticketRepo from "./ticket.repository.js";

// Lấy toàn bộ Ticket
export const getAllTicket = async () => {
    return ticketRepo.getAllTicket();
};

// Lấy thông tin Ticket theo ID
export const getTicketId = async (ticketId) => {
    return ticketRepo.getTicketId(ticketId);
};

//Tạo Ticket mới
export const createTicket = async (ticket) => {
    return ticketRepo.createTicket(ticket);
};

//Cập nhật Ticket
export const updateTicket = async (updatePayload) => {
    return ticketRepo.updateTicket(updatePayload);
};

//Xóa ticket
export const deleteTicket = async (id) => {
    return ticketRepo.deleteTicket(id);
};

// export const createComment = async (commentData) => {
//     return ticketRepo.createComment(commentData);
// };