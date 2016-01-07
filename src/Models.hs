{-# LANGUAGE DeriveGeneric, ScopedTypeVariables #-}
module Models where

import Data.Aeson (FromJSON)
import GHC.Generics

data BusStop = Stop
    { name :: String
    , lat :: String
    , lon :: String
    , next :: [Slot]
    } deriving (Show, Generic)

data Slot = Slot
    { l :: String
    , t :: String
    , ts :: String
    , rt :: Int
    , d :: String
    } deriving (Show, Generic)

instance FromJSON BusStop
instance FromJSON Slot

isRoute route slot = l slot == show route
