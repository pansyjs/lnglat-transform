import { expect, it } from 'vitest'
import coordtransform from 'coordtransform'
import TransformLngLat from 'lnglat-transform'
import {
  bd09ToGcj02,
  bd09ToWgs84,
  gcj02ToBd09,
  gcj02ToWgs84,
  wgs84ToBd09,
  wgs84ToGcj02,
} from '../src'

const instace = new TransformLngLat()

const lnglat = [116.404, 39.915] as const

it('bd09ToGcj02', () => {
  expect(bd09ToGcj02(...lnglat)).toEqual(coordtransform.bd09togcj02(...lnglat))
  expect(bd09ToGcj02(...lnglat)).toEqual(instace.bd09ToGcj02(...lnglat))
})

it('gcj02ToBd09', () => {
  expect(gcj02ToBd09(...lnglat)).toEqual(coordtransform.gcj02tobd09(...lnglat))
  expect(gcj02ToBd09(...lnglat)).toEqual(instace.gcj02ToBd09(...lnglat))
})

it('wgs84ToBd09', () => {
  expect(wgs84ToBd09(...lnglat)).toEqual(instace.wgs84ToBd09(...lnglat))
})

it('bd09ToWgs84', () => {
  expect(bd09ToWgs84(...lnglat)).toEqual(instace.bd09ToWgs84(...lnglat))
})

it('wgs84ToGcj02', () => {
  expect(wgs84ToGcj02(...lnglat)).toEqual(coordtransform.wgs84togcj02(...lnglat))
  expect(wgs84ToGcj02(...lnglat)).toEqual(instace.wgs84ToGcj02(...lnglat))
})

it('gcj02ToWgs84', () => {
  expect(gcj02ToWgs84(...lnglat)).toEqual(coordtransform.gcj02towgs84(...lnglat))
  expect(gcj02ToWgs84(...lnglat)).toEqual(instace.gcj02ToWgs84(...lnglat))
})
