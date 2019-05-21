import { square } from '@/utils'

describe('square', () => {
  it('squares given numbers', () => {
    expect(square(2)).toBe(4)
    expect(square(3)).toBe(9)
  })
})
