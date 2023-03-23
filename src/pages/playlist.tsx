import { PlayButton } from '#/components/PlayButton';
import { PlaylistHeader } from '#/components/PlaylistHeader';
import { PlaylistRow, PlaylistRowSong } from '#/components/PlaylistRow';
import { SkipButton } from '#/components/SkipButton';
import { getTrackListWithTempo } from '#/features/track';
import type { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import useSwr from 'swr';

type PlayState = {
  isPlaying: boolean;
  index: number;
};

const Home: NextPage = () => {
  const router = useRouter();
  const [{ isPlaying, index }, setPlayState] = useState<PlayState>({ isPlaying: false, index: 0 });
  const { data: session } = useSession();
  const swrKey = session != null ? () => ({ key: 'getTrackListWithTempo', token: session.user.accessToken }) : null;
  const { data: tracks } = useSwr(swrKey, getTrackListWithTempo);

  const audioRef = useRef<HTMLAudioElement>(null);

  const goBackToMeasurement = () => {
    router.push(`/`).catch((err) => {
      console.error(err);
    });
  };

  const play = (url: string, index: number) => {
    if (audioRef.current == null) return;

    pause();
    if (audioRef.current.src !== url) {
      audioRef.current.src = url;
    }
    audioRef.current
      .play()
      .then(() => {
        setPlayState({ isPlaying: true, index });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const pause = () => {
    if (audioRef.current == null) return;
    audioRef.current.pause();
    setPlayState((prev) => ({ ...prev, isPlaying: false }));
  };

  const reset = () => {
    if (audioRef.current == null) return;
    audioRef.current.pause();
    setPlayState({ index: 0, isPlaying: false });
  };

  const skip = (step: 1 | -1) => {
    if (tracks == null) return;

    const nextUrl = tracks.at(index + step)?.track.preview_url;
    if (nextUrl == null) {
      reset();
      return;
    }
    if (isPlaying) {
      play(nextUrl, index + step);
    } else {
      setPlayState((prev) => {
        const nextIndex = prev.index + step;
        const nextUrl = tracks.at(nextIndex)?.track.preview_url;
        if (nextIndex < 0 || nextIndex >= tracks.length || audioRef.current == null || nextUrl == null) {
          return prev;
        }
        audioRef.current.src = nextUrl;
        return { ...prev, index: nextIndex };
      });
    }
  };

  return (
    <>
      <PlaylistHeader bpm={120} onClose={() => goBackToMeasurement()} className="fixed inset-x-0 top-0" />
      <div className="flex flex-col items-center gap-y-48 pt-174">
        <div className="flex w-216 items-center justify-between">
          <SkipButton direction="prev" onClick={() => skip(-1)} />
          <PlayButton
            playing={isPlaying}
            onClick={() => {
              if (audioRef.current == null) return;

              if (!audioRef.current.paused) {
                pause();
              } else {
                const url = audioRef.current.src !== '' ? audioRef.current.src : tracks?.at(0)?.track.preview_url;
                if (url != null) {
                  play(url, index);
                }
              }
            }}
          />
          <SkipButton direction="next" onClick={() => skip(1)} />
        </div>
        <ol className="row-auto grid w-full justify-center px-16">
          {tracks?.map(({ track }, i) => {
            const song: PlaylistRowSong = {
              name: track.name,
              artistName: track.artists.map((a) => a.name).join(', '),
              seconds: track.duration_ms / 1000,
            };
            return (
              <li key={track.id} className="w-[calc(100vw-1rem*2)] max-w-700">
                <PlaylistRow
                  playingNow={i === index}
                  serialNumber={i + 1}
                  song={song}
                  onClick={() => play(track.preview_url, i)}
                  className="w-full"
                />
              </li>
            );
          })}
          {tracks != null && tracks.length === 0 && <p>お気に入りの曲がありません。</p>}
        </ol>
        <audio ref={audioRef} controls className="hidden"></audio>
      </div>
    </>
  );
};

export default Home;
