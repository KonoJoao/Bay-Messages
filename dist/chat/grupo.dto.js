"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Grupo = void 0;
const chat_dto_1 = require("./chat.dto");
class Grupo extends chat_dto_1.Chat {
    constructor() {
        super(...arguments);
        this.adicionarUsuario = () => { };
        this.removerUsuario = () => { };
    }
}
exports.Grupo = Grupo;
//# sourceMappingURL=grupo.dto.js.map