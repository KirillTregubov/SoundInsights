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

export const PlaylistValidator = z
  .object({
    name: z.string(),
    uri: z.string(),
    owner: z.string(),
    image: z.string().url(),
    color: z.string().nullable()
  })
  .strict()

export type Playlist = z.infer<typeof PlaylistValidator>

export const PlaylistsValidator = PlaylistValidator.array()
