import type { SavedTrack } from 'spotify-types';

const END_POINT = 'https://api.spotify.com/v1/me/tracks';

type UserTrackListResponse = {
	href: string;
	items: SavedTrack[];
};

type Props = {
	limit: number | undefined;
	offset: number | undefined;
	token: string;
};

export const fetchUserTrackList = async ({ limit, offset, token }: Props) => {
	const formattedQuery = [
		limit !== undefined && ['limit', String(limit)],
		offset !== undefined && ['offset', String(offset)],
	].filter((element): element is string[] => element !== false);

	const params = new URLSearchParams(formattedQuery).toString();

	const response: UserTrackListResponse | Error = await fetch(`${END_POINT}?${params}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	}).then((res) => {
		if (res.ok) {
			return res.json();
		}
		return new Error();
	});

	if (response instanceof Error) {
		return undefined;
	}

	return response.items;
};
