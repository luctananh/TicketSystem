import * as ticketRepo from "./ticket.repository.js";

// Lấy toàn bộ Ticket
export const getAllTicket = async () => {
    return ticketRepo.getAllTicket();
};

// Lấy thông tin Ticket theo ID
export const getTicketId = async (id) => {
    return ticketRepo.getTicketId(id);
};

//Tạo Ticket mới
export const createTicket = async (dataTicket) => {
    return ticketRepo.createTicket(dataTicket);
};

//Cập nhật Ticket
export const updateTicket = async (id, data) => {
    return ticketRepo.updateTicket(id, data);
};

//Xóa ticket
export const deleteTicket = async (id) => {
    return ticketRepo.deleteTicket(id);
};