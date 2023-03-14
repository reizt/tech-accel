import type { AudioFeatures } from 'spotify-types';

const END_POINT = 'https://api.spotify.com/v1/audio-features';

type AudioFeatureResponse = { audio_features: AudioFeatures[] };

type Props = {
  ids: string[];
  token: string;
};

export const fetchTrackListTempo = async ({ ids, token }: Props) => {
  const formattedQuery = [['ids', ids.join(',')]];

  const params = new URLSearchParams(formattedQuery).toString();

  const response: AudioFeatureResponse | Error = await fetch(`${END_POINT}?${params}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return new Error();
  });

  if (response instanceof Error) {
    return undefined;
  }

  const tempoList = response.audio_features.map(({ id, tempo }) => ({ id, tempo }));

  return tempoList;
};
