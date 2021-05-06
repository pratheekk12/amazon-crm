"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(server, opts, next) {
    //function definition
    function getAllApiCalls() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // const dialerId = await server.telephonyService.generateTelephonyId();
                // telephonyRequest.dialerId = dialerId;
                const BOApiaccess = yield server.db.models.BOApiaccess.find({}).lean();
                return BOApiaccess;
            }
            catch (err) {
                throw err;
            }
        });
    }
    //function is return
    return { "getAllApiCalls": getAllApiCalls };
}
exports.default = default_1;
//# sourceMappingURL=boAPIaccessHistory.js.map