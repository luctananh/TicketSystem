import * as commentRepo from './comment.repository.js'

export const createComment = async (commnetData) => {
    return commentRepo.createComment(commnetData);
};

export const updateComment = async (updatePayload) => {
    return commentRepo.updateComment(updatePayload);
};

export const deleteComment = async (id) => {
    return commentRepo.deleteComment(id);
};

// export const updateComment = async (id, updateData) => {
//     return commentRepo.updateComment(id, updateData);
// };
