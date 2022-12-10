import { useEffect, useState } from 'react'
import Loading from './Loading'

export default function AverageStats(props: any) {
  const [tempoAvg, setTempoAvg] = useState(0)
  const [popularityAvg, setPopularityAvg] = useState(0)
  const [durationAvg, setDurationAvg] = useState(0)
  const stats = props.data
    .map((e: any) => {
      return {
        tempo: e.audio_features.tempo,
        popularity: e.general_info.popularity,
        duration_ms: e.audio_features.duration_ms,
        track: {
          name: e.general_info.name,
          artists: e.general_info.artists.map((a: any) => a.name),
          images: {
            small: e.general_info.album?.images[0].url
          },
          uri: e.general_info.uri,
          explicit: e.general_info.explicit
        }
      }
    })
    .sort((a: any, b: any) => {
      if (a.tempo > b.tempo) {
        return -1
      } else if (a.tempo < b.tempo) {
        return 1
      } else {
        return 0
      }
    })

  useEffect(() => {
    const tempoSum = stats.reduce((a: any, b: any) => {
      return a + parseFloat(b.tempo)
    }, 0)
    const popularitySum = stats.reduce((a: any, b: any) => {
      return a + parseFloat(b.popularity)
    }, 0)
    const durationSum = stats.reduce((a: any, b: any) => {
      return a + parseFloat(b.duration_ms)
    }, 0)
    setTempoAvg(tempoSum / stats.length || 0)
    setPopularityAvg(popularitySum / stats.length || 0)
    setDurationAvg(durationSum / stats.length || 0)
  }, [stats])

  return (
    <>
      {stats && (
        <div className="flex flex-col items-end gap-1">
          <div className="flex w-full items-baseline">
            <span className="mr-1 block text-lg font-semibold">
              {durationAvg ? (
                new Intl.DateTimeFormat('default', {
                  timeZone: 'Etc/UTC',
                  hour12: false,
                  minute: '2-digit',
                  second: '2-digit'
                }).format(durationAvg)
              ) : (
                <Loading />
              )}
            </span>
            <span className="ml-auto block select-none text-neutral-600 dark:text-neutral-400">
              average duration
            </span>
          </div>
          <div className="flex w-full items-baseline gap-3">
            <div className="h-2.5 w-[8rem]  rounded-full bg-neutral-300 dark:bg-neutral-600">
              <div
                className="h-2.5 rounded-full bg-[#1DB954]"
                style={{
                  width: `${new Intl.NumberFormat('default', {
                    style: 'percent',
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  }).format(popularityAvg / 100)}`
                }}
                title={`Popularity is ${popularityAvg}`}></div>
            </div>
            <span className="select-none text-neutral-600 dark:text-neutral-400">
              average popularity
            </span>
          </div>
          <div className="flex w-full items-baseline">
            <span className="mr-1 block text-lg font-semibold">
              {tempoAvg ? tempoAvg.toFixed(2) : <Loading />}
            </span>
            <span className="ml-auto block select-none text-neutral-600 dark:text-neutral-400">
              average bpm
            </span>
          </div>
        </div>
      )}
    </>
  )
}
