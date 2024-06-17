<h1 align="center">
  @pansy/lnglat-transform
</h1>

## 主要的经纬度坐标系

- WGS-84: 标准坐标系(地球坐标系)
- GCJ-02: 国测局坐标(火星坐标系)，高德地图、腾讯地图
- BD-09: 通过GCJ02进行进一步偏移算法得到，百度地图使用

## 📦 Install

```sh
pnpm i @pansy/lnglat-transform
```

## 🦄 Usage

```ts
import { gcj02ToWgs84, wgs84ToGcj02, } from '@pansy/lnglat-transform'

wgs84ToGcj02(116.404, 39.915)
gcj02ToWgs84(116.404, 39.915)
```
