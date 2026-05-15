
import { Context } from './Context'


class MagicEightBallError extends Error {

  isMagicEightBallError = true

  sdk = 'MagicEightBall'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  MagicEightBallError
}

