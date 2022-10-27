import { z } from 'zod'

export const Track = z
  .object({
    name: z.string(),
    artists: z.string().array(),
    image_url: z.string().url().nullable(),
    uri: z.string(),
    explicit: z.boolean()
  })
  .strict()

export const Tracks = Track.array()

export const DemoQuery = z
  .object({
    query: z.string(),
    result: z.number()
  })
  .strict()
