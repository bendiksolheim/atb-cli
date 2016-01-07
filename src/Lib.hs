{-# LANGUAGE ScopedTypeVariables #-}
module Lib
    ( atb
    ) where

import Models
import Api

format = unlines . map ts . filter (isRoute 60) . next

atb loc = do
    stop <- busStop loc
    putStrLn . format $ stop
