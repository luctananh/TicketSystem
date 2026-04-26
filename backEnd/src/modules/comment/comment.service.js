import * as commentRepo from './comment.repository.js'
// import * as tickettRepo from "./tickett.repository.js";

export const createComment = async (commnetData) => {
    return commentRepo.createComment(commnetData);
};

