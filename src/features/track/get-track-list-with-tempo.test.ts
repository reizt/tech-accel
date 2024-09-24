import { afterEach, describe, expect, it, vi } from 'vitest';
import * as FetchTrackListTempo from './fetch-track-list-tempo';
import * as FetchUserTrackList from './fetch-user-track-list';
import { getTrackListWithTempo } from './get-track-list-with-tempo';

const mockUserTrackList = [
	{ track: { id: 'A' } },
	{ track: { id: 'B' } },
	{ track: { id: 'C' } },
	{ track: { id: 'D' } },
	{ track: { id: 'E' } },
];

const mockTempoList = [
	{ id: 'A', tempo: 20 },
	{ id: 'B', tempo: 10 },
	{ id: 'C', tempo: undefined },
	{ id: 'D', tempo: 50 },
	{ id: 'E', tempo: 40 },
];

describe(getTrackListWithTempo.name, async () => {
	const fetchUserTrackListSpy = vi.spyOn(FetchUserTrackList, 'fetchUserTrackList');
	fetchUserTrackListSpy.mockResolvedValue(mockUserTrackList as never);

	const fetchTrackListTempoSpy = vi.spyOn(FetchTrackListTempo, 'fetchTrackListTempo');
	fetchTrackListTempoSpy.mockResolvedValue(mockTempoList as never);

	afterEach(() => {
		vi.clearAllMocks();
	});

	it('correctly formatted and sorted', async () => {
		const response = await getTrackListWithTempo({ token: '' });
		expect(response).toEqual([
			{ track: { id: 'D' }, tempo: 50 },
			{ track: { id: 'E' }, tempo: 40 },
			{ track: { id: 'A' }, tempo: 20 },
			{ track: { id: 'B' }, tempo: 10 },
		]);
	});
});
