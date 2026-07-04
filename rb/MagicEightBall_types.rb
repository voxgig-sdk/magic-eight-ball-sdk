# frozen_string_literal: true

# Typed models for the MagicEightBall SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# MagicEightBall entity data model.
#
# @!attribute [rw] magic
#   @return [Hash, nil]
MagicEightBall = Struct.new(
  :magic,
  keyword_init: true
)

# Request payload for MagicEightBall#load.
#
# @!attribute [rw] question
#   @return [String]
MagicEightBallLoadMatch = Struct.new(
  :question,
  keyword_init: true
)

