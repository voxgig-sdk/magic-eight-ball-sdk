import { MagicEightBallEntityBase } from '../MagicEightBallEntityBase';
import type { MagicEightBallSDK } from '../MagicEightBallSDK';
import type { Control } from '../types';
import type { MagicEightBall, MagicEightBallLoadMatch } from '../MagicEightBallTypes';
declare class MagicEightBallEntity extends MagicEightBallEntityBase<MagicEightBall> {
    constructor(client: MagicEightBallSDK, entopts: any);
    make(this: MagicEightBallEntity): MagicEightBallEntity;
    load(this: any, reqmatch?: MagicEightBallLoadMatch, ctrl?: Control): Promise<MagicEightBallEntity>;
}
export { MagicEightBallEntity };
