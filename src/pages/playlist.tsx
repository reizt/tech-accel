import { PlayButton } from '#/components/PlayButton';
import { PlaylistHeader } from '#/components/PlaylistHeader';
import { PlaylistRow, PlaylistRowSong } from '#/components/PlaylistRow';
import { SkipButton } from '#/components/SkipButton';
import { getTrackListWithTempo } from '#/features/track';
import type { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import useSwr from 'swr';

const Home: NextPage = () => {
  const router = useRouter();
  const [playing, setPlaying] = useState<boolean>(false);
  const { data: session } = useSession();
  const swrKey = session != null ? () => ({ key: 'getTrackListWithTempo', token: session.user.accessToken }) : null;
  const { data: tracks } = useSwr(swrKey, getTrackListWithTempo);

  const goBackToMeasurement = () => {
    router.push(`/`).catch((err) => {
      console.error(err);
    });
  };

  return (
    <>
      <PlaylistHeader bpm={120} onClose={() => goBackToMeasurement()} className="fixed inset-x-0 top-0" />
      <div className="flex flex-col items-center gap-y-48 pt-174">
        <div className="flex w-216 items-center justify-between">
          <SkipButton direction="prev" />
          <PlayButton playing={playing} onClick={() => setPlaying((prev) => !prev)} />
          <SkipButton direction="next" />
        </div>
        <ol className="row-auto grid w-full justify-center px-16">
          {tracks?.map((track, i) => {
            const song: PlaylistRowSong = {
              name: track.track.name,
              artistName: track.track.artists.map((a) => a.name).join(', '),
              seconds: track.track.duration_ms / 1000,
            };
            return (
              <li key={track.track.id} className="w-[calc(100vw-1rem*2)] max-w-700">
                <PlaylistRow playingNow={false} serialNumber={i + 1} song={song} className="w-full" />
              </li>
            );
          })}
          {tracks != null && tracks.length === 0 && <p>お気に入りの曲がありません。</p>}
        </ol>
      </div>
    </>
  );
};

export default Home;
