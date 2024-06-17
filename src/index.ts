import { PI, a, ee, x_PI } from './constants'
import { transformLat, transformLng } from './utils'

/**
 * 百度坐标系转火星坐标系(BD-09 > GCJ-02)
 * @param bd_lng 经度
 * @param bd_lat 纬度
 * @returns 转换后的经纬度坐标
 */
export function bd09ToGcj02(bd_lng: number, bd_lat: number) {
  const x = bd_lng - 0.0065
  const y = bd_lat - 0.006
  const z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_PI)
  const theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_PI)

  const gcj_lng = z * Math.cos(theta)
  const gcj_lat = z * Math.sin(theta)

  return [gcj_lng, gcj_lat]
}

/**
 * 火星坐标系转百度坐标系(GCJ-02 > BD-09)
 * @param gcj_lng 经度
 * @param gcj_lat 纬度
 * @returns 转换后的经纬度坐标
 */
export function gcj02ToBd09(gcj_lng: number, gcj_lat: number) {
  const z = Math.sqrt(gcj_lng * gcj_lng + gcj_lat * gcj_lat) + 0.00002 * Math.sin(gcj_lat * x_PI)
  const theta = Math.atan2(gcj_lat, gcj_lng) + 0.000003 * Math.cos(gcj_lng * x_PI)

  const bd_lng = z * Math.cos(theta) + 0.0065
  const bd_lat = z * Math.sin(theta) + 0.006

  return [bd_lng, bd_lat]
}

/**
 * 火星坐标系转标准坐标系(GCJ-02 > WGS-84)
 * @param gcj_lng 经度
 * @param gcj_lat 纬度
 * @returns 转换后的经纬度坐标
 */
export function gcj02ToWgs84(gcj_lng: number, gcj_lat: number) {
  let dlat = transformLat(gcj_lng - 105.0, gcj_lat - 35.0)
  let dlng = transformLng(gcj_lng - 105.0, gcj_lat - 35.0)

  const radlat = (gcj_lat / 180.0) * PI
  let magic = Math.sin(radlat)
  magic = 1 - ee * magic * magic

  const sqrtmagic = Math.sqrt(magic)
  dlat = (dlat * 180.0) / (((a * (1 - ee)) / (magic * sqrtmagic)) * PI)
  dlng = (dlng * 180.0) / ((a / sqrtmagic) * Math.cos(radlat) * PI)

  const mglat = gcj_lat + dlat
  const mglng = gcj_lng + dlng
  return [gcj_lng * 2 - mglng, gcj_lat * 2 - mglat]
}

/**
 * 标准坐标系转火星坐标系(WGS-84 > GCJ-02)
 * @param wgs_lng 经度
 * @param wgs_lat 纬度
 * @returns 转换后的经纬度坐标
 */
export function wgs84ToGcj02(wgs_lng: number, wgs_lat: number) {
  let dlat = transformLat(wgs_lng - 105.0, wgs_lat - 35.0)
  let dlng = transformLng(wgs_lng - 105.0, wgs_lat - 35.0)

  const radlat = (wgs_lat / 180.0) * PI
  let magic = Math.sin(radlat)

  magic = 1 - ee * magic * magic
  const sqrtmagic = Math.sqrt(magic)

  dlat = (dlat * 180.0) / (((a * (1 - ee)) / (magic * sqrtmagic)) * PI)
  dlng = (dlng * 180.0) / ((a / sqrtmagic) * Math.cos(radlat) * PI)

  const mglat = wgs_lat + dlat
  const mglng = wgs_lng + dlng
  return [mglng, mglat]
}

/**
 * 标准坐标系转百度坐标系(WGS-84 > BD-09)
 * @param wgs_lng 经度
 * @param wgs_lat 纬度
 * @returns 转换后的经纬度坐标
 */
export function wgs84ToBd09(wgs_lng: number, wgs_lat: number) {
  // 第一次转换
  let dlat = transformLat(wgs_lng - 105.0, wgs_lat - 35.0)
  let dlng = transformLng(wgs_lng - 105.0, wgs_lat - 35.0)

  const radlat = (wgs_lat / 180.0) * PI
  let magic = Math.sin(radlat)
  magic = 1 - ee * magic * magic
  const sqrtmagic = Math.sqrt(magic)
  dlat = (dlat * 180.0) / (((a * (1 - ee)) / (magic * sqrtmagic)) * PI)
  dlng = (dlng * 180.0) / ((a / sqrtmagic) * Math.cos(radlat) * PI)
  const mglat = wgs_lat + dlat
  const mglng = wgs_lng + dlng

  // 第二次转换
  const z = Math.sqrt(mglng * mglng + mglat * mglat) + 0.00002 * Math.sin(mglat * x_PI)
  const theta = Math.atan2(mglat, mglng) + 0.000003 * Math.cos(mglng * x_PI)
  const bd_lng = z * Math.cos(theta) + 0.0065
  const bd_lat = z * Math.sin(theta) + 0.006
  return [bd_lng, bd_lat]
}

/**
 * 百度坐标系转标准坐标系(BD-09 > WGS-84)
 * @param bd_lng 经度
 * @param bd_lat 纬度
 * @returns 转换后的经纬度坐标
 */
export function bd09ToWgs84(bd_lng: number, bd_lat: number) {
  const s_gcj = bd09ToGcj02(bd_lng, bd_lat)
  const s_wgs84 = gcj02ToWgs84(s_gcj[0], s_gcj[1])

  return [s_wgs84[0], s_wgs84[1]]
}
