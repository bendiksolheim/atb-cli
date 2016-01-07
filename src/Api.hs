{-# LANGUAGE DeriveGeneric, ScopedTypeVariables #-}
module Api where

import Control.Lens
import Network.Wreq
import Models

base = "http://bybussen.api.tmn.io/rt/"

busStop id = do
    (stop :: Response BusStop) <- asJSON =<< get (base ++ id)
    return $ stop ^. responseBody
