import reducerEditor from './reducerEditor';
import {
  ADD_NEW_TRACK,
  REMOVE_TRACK,
  UPDATE_TRACK
} from '../constants/actions';

describe('Tracks reducer', () => {
  it('Adds track to state', () => {
    const initialState = {
      tracks: [],
    };

    const expected = {
      tracks: [
        {
          id: expect.any(String),
          title: '2013-02-03 156294493 Walking Endomondo',
          format: 'tcx',
          status: 'test'
        }
      ]    
    };

    expect( 
      reducerEditor(initialState, {
        type: ADD_NEW_TRACK,
        track: {
          id: '63fea2a3-b1d2-4e44-ac8a-5f5d5325bbb1',
          title: '2013-02-03 156294493 Walking Endomondo',
          format: 'tcx',
          status: 'test'
        }
      })
    ).toMatchObject(expected);
  });

  it('Deletes track', () => {
    const initialState = {
      tracks: [
        {
          id: '63fea2a3-b1d2-4e44-ac8a-5f5d5325bbb1',
          title: '2013-02-03 156294493 Walking Endomondo',
          format: 'tcx',
          status: 'success'
        },
        {
          id: '7fe0ec8a-eab9-4601-9fb4-44740a98c0dd',
          title: '20170829_183230',
          format: 'tcx',
          status: 'success'
        }
      ]
    };

    const expected = {
      tracks: [
        {
          id: '63fea2a3-b1d2-4e44-ac8a-5f5d5325bbb1',
          title: '2013-02-03 156294493 Walking Endomondo',
          format: 'tcx',
          status: 'success'
        }
      ]   
    };

    expect(
      reducerEditor(initialState, { 
        type: REMOVE_TRACK,
        id: '7fe0ec8a-eab9-4601-9fb4-44740a98c0dd'
      })
    ).toMatchObject(expected);
  });

  it('Updates track', () => {
    const initialState = {
      tracks: [
        {
          id: '63fea2a3-b1d2-4e44-ac8a-5f5d5325bbb1',
          title: '2013-02-03 156294493 Walking Endomondo',
          format: 'tcx',
          status: 'loading'
        },
        {
          id: '7fe0ec8a-eab9-4601-9fb4-44740a98c0dd',
          title: '20170829_183230',
          format: 'tcx',
          status: 'loading'
        }
      ]
    };

    const expected = {
      tracks: [
        {
          id: '63fea2a3-b1d2-4e44-ac8a-5f5d5325bbb1',
          title: '2013-02-03 156294493 Walking Endomondo',
          format: 'tcx',
          status: 'loading'
        },
        {
          id: '7fe0ec8a-eab9-4601-9fb4-44740a98c0dd',
          title: '20170829_183230',
          format: 'tcx',
          status: 'success',
          points: [
            { lat: 50, lng: 20 },
            { lat: 50, lng: 19 },
            { lat: 50, lng: 20 }
          ]
        }
      ]   
    };

    const action = { 
      type: UPDATE_TRACK,
      id: '7fe0ec8a-eab9-4601-9fb4-44740a98c0dd',
      track: {
        status: 'success',
        activity: 'walking',
        points: [
          { lat: 50, lng: 20 },
          { lat: 50, lng: 19 },
          { lat: 50, lng: 20 }
        ]
      }
    }

    expect(
      reducerEditor(initialState, action)
    ).toMatchObject(expected);
  });
});