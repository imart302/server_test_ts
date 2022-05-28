"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePostBody = void 0;
const joi_1 = __importDefault(require("joi"));
const postSchema = joi_1.default.object({
    name: joi_1.default.string().min(3).required(),
    email: joi_1.default.string().min(4).email().required(),
    status: joi_1.default.number().integer().required()
});
function validatePostBody(req, res, body) {
    return new Promise((resolve, reject) => {
        postSchema.validateAsync(body)
            .then(value => {
            resolve(value);
        })
            .catch(error => {
            reject(error);
        });
    });
}
exports.validatePostBody = validatePostBody;
//# sourceMappingURL=users.middleware.js.map