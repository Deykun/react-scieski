import { calculateDistance, calculateSpeed, calculateTimeDifference } from './tracks'

describe('calculateDistance()', () => {
  const pointZero = { lat: 0, lng: 0 }
  const pointOne = { lat: 1, lng: 1 }
  const pointMinusOne = { lat: -1, lng: -1 }

  it('Distance equal 0 when number of points is smaller than 2', () => {
    /* 0 points */
    let result = calculateDistance([])
    expect(result).toEqual( 0 )
    /* 1 point */
    result = calculateDistance([pointZero])
    expect(result).toEqual( 0 )
    /* 2 points */
    result = calculateDistance([pointZero, pointOne])
    expect(result).toBeGreaterThan( 0 )
  })

  it('Distance equal 0 when points have the same location', () => {
    const result = calculateDistance([pointZero, pointZero, pointZero])
    expect(result).toEqual( 0 )
  })

  it('Calculating distance', () => {
    const result = calculateDistance([pointZero, pointOne])
    expect(Math.floor(result)).toEqual( 157 )
  })

  it('Calculating distance for negative location', () => {
    const result = calculateDistance([pointZero, pointMinusOne])
    expect(Math.floor(result)).toEqual( 157 )
  })

})

describe('calculateSpeed()', () => {

  it('Calculating speed in km/h', () => {
    const start = new Date()
    const end = new Date( start.getTime() )
    /* Duration 1h */
    end.setHours( end.getHours() + 1 )
    const distanceKm = 50
    const result = calculateSpeed( start, end, distanceKm )
    expect(result).toEqual( 50 )
  })

})

describe('calculateTimeDifference()', () => {

  it('Calculating duration in ms', () => {
    const start = new Date()
    const end = new Date( start.getTime() )
    /* Duration 1h */
    end.setHours( end.getHours() + 1 )
    const result = calculateTimeDifference( start, end )
    expect(result).toEqual( 1000 * 60 * 60 )
  })

})

