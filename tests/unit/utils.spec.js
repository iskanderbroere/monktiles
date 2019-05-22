import { square, mapIndexed } from '@/utils'

describe('square', () => {
  it('squares given numbers', () => {
    expect(square(2)).toBe(4)
    expect(square(3)).toBe(9)
  })
})

describe('mapIndexed', () => {
  it('iterates an array and provides an index in the callback', () => {
    const arrayOfIndexes = mapIndexed((_, i) => i, Array(3))
    expect(arrayOfIndexes).toEqual([0, 1, 2])
  })
})
