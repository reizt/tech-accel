import type { SavedTrack } from 'spotify-types';
import { fetchTrackListTempo } from './fetch-track-list-tempo';
import { fetchUserTrackList } from './fetch-user-track-list';

const LIMIT = 50;
const OFFSET = 0;

type Props = {
	token: string;
};

export type TrackListWitTempo = (SavedTrack & { tempo: number | undefined })[];

export const getTrackListWithTempo = async ({ token }: Props): Promise<TrackListWitTempo> => {
	const userTrackList = await fetchUserTrackList({ token, limit: LIMIT, offset: OFFSET });
	if (userTrackList === undefined) {
		throw new Error('user track list empty');
	}

	if (userTrackList.length === 0) {
		return [];
	}

	const trackListTempo = await fetchTrackListTempo({
		token,
		ids: userTrackList.map((userTrack) => userTrack.track.id),
	});
	if (trackListTempo === undefined) {
		throw new Error('track list tempo empty');
	}
	if (trackListTempo.length === 0) {
		return [];
	}

	return userTrackList
		.map((userTrack) => {
			const tempo = trackListTempo.find(({ id }) => id === userTrack.track.id)?.tempo;
			return { ...userTrack, tempo };
		})
		.filter((track) => track.tempo !== undefined)
		.sort((a, b) => ((a.tempo as number) > (b.tempo as number) ? -1 : 1));
};
