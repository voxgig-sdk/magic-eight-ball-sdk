package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewMagicEightBallEntityFunc func(client *MagicEightBallSDK, entopts map[string]any) MagicEightBallEntity

