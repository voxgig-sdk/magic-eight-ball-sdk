import { Context } from './Context';
declare class MagicEightBallError extends Error {
    isMagicEightBallError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { MagicEightBallError };
