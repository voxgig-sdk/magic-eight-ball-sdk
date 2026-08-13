// Typed models for the MagicEightBall SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface MagicEightBall {
  answer?: string
  question?: string
  type?: string
}

export interface MagicEightBallLoadMatch {
  question: string
}

