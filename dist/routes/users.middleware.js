"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePutBody = exports.existsEmail = exports.validatePostBody = void 0;
const user_1 = __importDefault(require("../models/user"));
const joi_1 = __importDefault(require("joi"));
const postSchema = joi_1.default.object({
    name: joi_1.default.string().min(3).required(),
    email: joi_1.default.string().min(4).email().required(),
    status: joi_1.default.number().integer().required()
});
const putSchema = joi_1.default.object({
    name: joi_1.default.string().min(3),
    email: joi_1.default.string().min(4).email(),
    status: joi_1.default.number().integer()
});
function validatePostBody(req, res, next) {
    return new Promise((resolve, reject) => {
        postSchema.validateAsync(req.body)
            .then(value => {
            next();
            resolve(value);
        })
            .catch(error => {
            res.status(400).json(error);
        });
    });
}
exports.validatePostBody = validatePostBody;
function existsEmail(req, res, next) {
    user_1.default.findOne({
        where: {
            email: req.body.email
        }
    })
        .then(user => {
        if (user) {
            res.status(400).json({
                msg: "email already exists"
            });
        }
        else {
            next();
        }
    })
        .catch(error => {
        res.status(500).end();
    });
}
exports.existsEmail = existsEmail;
function validatePutBody(req, res, next) {
    putSchema.validateAsync(req.body)
        .then(value => {
        if (req.body.email) {
            existsEmail(req, res, next);
        }
        else {
            next();
        }
    })
        .catch(error => {
        res.status(400).json(error);
    });
}
exports.validatePutBody = validatePutBody;
//# sourceMappingURL=users.middleware.js.map