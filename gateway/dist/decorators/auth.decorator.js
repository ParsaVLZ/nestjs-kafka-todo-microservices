"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Authorization;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_guard_1 = require("../guard/auth.guard");
function Authorization() {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiBearerAuth)("Authorization"), (0, common_1.UseGuards)(auth_guard_1.AuthGuard));
}
//# sourceMappingURL=auth.decorator.js.map