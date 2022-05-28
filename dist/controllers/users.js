"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.putUsuario = exports.postUsuario = exports.getUsuario = exports.getUsuarios = void 0;
const user_1 = __importDefault(require("../models/user"));
const getUsuarios = (req, res) => {
    user_1.default.findAll()
        .then(us => {
        res.json(us);
    })
        .catch(error => {
        res.status(500).json(error);
    });
};
exports.getUsuarios = getUsuarios;
const getUsuario = (req, res) => {
    const { id } = req.params;
    user_1.default.findByPk(id)
        .then(us => {
        if (us) {
            res.json(us);
        }
        else {
            res.status(404).json({ msg: 'User doesn\'t exists' });
        }
    })
        .catch(error => {
        res.status(500).end();
    });
};
exports.getUsuario = getUsuario;
const postUsuario = (req, res) => {
    const { body } = req;
    // User.create({
    //     name: body.name,
    //     email: body.email,
    //     status: body.status
    // })
    // .then(value => {
    //     res.status(201).json(value);
    // })
    // .catch(error => {
    //     res.status(500).json(error);
    // });
    const nuser = user_1.default.build({
        name: body.name,
        email: body.email,
        status: body.status
    });
    nuser.save()
        .then(value => {
        res.status(201).json(value);
    })
        .catch(error => {
        res.status(500).json(error);
    });
};
exports.postUsuario = postUsuario;
const putUsuario = (req, res) => {
    const { id } = req.params;
    const { body } = req;
    user_1.default.findByPk(id)
        .then(user => {
        if (user) {
            user.update(body)
                .then(result => {
                res.status(200).json(result);
            })
                .catch(error => {
                res.status(500).json(error);
            });
        }
        else {
            res.status(404).json({
                msg: "User doesn\'t exists"
            });
        }
    })
        .catch(error => {
        res.status(500).json(error);
    });
};
exports.putUsuario = putUsuario;
const deleteUser = (req, res) => {
    const { id } = req.params;
    user_1.default.findByPk(id)
        .then(user => {
        if (user) {
            user.destroy()
                .then(value => {
                res.status(200).json(value);
            })
                .catch(error => {
                res.status(500).json(error);
            });
        }
        else {
            res.status(404).json({ msg: "User doesn\'t exists" });
        }
    })
        .catch(error => {
        res.status(500).json(error);
    });
};
exports.deleteUser = deleteUser;
//# sourceMappingURL=users.js.map