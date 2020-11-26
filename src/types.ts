import express from 'express'

export type FeaturesType = { [name: string]: string }

type Locals = {
  features: FeaturesType
}

export type ApiResponse = Omit<express.Response, 'locals'> & {
  locals: Locals
}
