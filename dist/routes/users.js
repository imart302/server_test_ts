"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_1 = require("../controllers/users");
const users_middleware_1 = require("./users.middleware");
const router = (0, express_1.Router)();
router.get('/', users_1.getUsuarios);
router.get('/:id', users_1.getUsuario);
router.post('/', [users_middleware_1.validatePostBody, users_middleware_1.existsEmail], users_1.postUsuario);
router.put('/:id', [users_middleware_1.validatePutBody], users_1.putUsuario);
router.delete('/:id', users_1.deleteUser);
exports.default = router;
//# sourceMappingURL=users.js.map