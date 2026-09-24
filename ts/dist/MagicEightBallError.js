"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MagicEightBallError = void 0;
class MagicEightBallError extends Error {
    isMagicEightBallError = true;
    sdk = 'MagicEightBall';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.MagicEightBallError = MagicEightBallError;
//# sourceMappingURL=MagicEightBallError.js.map