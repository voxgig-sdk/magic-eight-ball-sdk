package voxgigmagiceightballsdk

import (
	"github.com/voxgig-sdk/magic-eight-ball-sdk/go/core"
	"github.com/voxgig-sdk/magic-eight-ball-sdk/go/entity"
	"github.com/voxgig-sdk/magic-eight-ball-sdk/go/feature"
	_ "github.com/voxgig-sdk/magic-eight-ball-sdk/go/utility"
)

// Type aliases preserve external API.
type MagicEightBallSDK = core.MagicEightBallSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type MagicEightBallEntity = core.MagicEightBallEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type MagicEightBallError = core.MagicEightBallError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewMagicEightBallEntityFunc = func(client *core.MagicEightBallSDK, entopts map[string]any) core.MagicEightBallEntity {
		return entity.NewMagicEightBallEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewMagicEightBallSDK = core.NewMagicEightBallSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewMagicEightBallSDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *MagicEightBallSDK  { return NewMagicEightBallSDK(nil) }
func Test() *MagicEightBallSDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
