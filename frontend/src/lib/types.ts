import { z } from 'zod'

export const TrackValidator = z
  .object({
    name: z.string(),
    artists: z.string().array(),
    images: z
      .object({
        small: z.string().url(),
        large: z.string().url()
      })
      .nullable(),
    uri: z.string(),
    explicit: z.boolean()
  })
  .strict()
export type Track = z.infer<typeof TrackValidator>

export const TracksValidator = TrackValidator.array()
export type Tracks = z.infer<typeof TracksValidator>

export const DemoQuery = z
  .object({
    query: z.string(),
    result: z.number()
  })
  .strict()
