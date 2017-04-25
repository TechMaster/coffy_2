# Coffy

## Công việc cần làm
1. Nguyên bổ xung thư mục crawling và hướng dẫn ReadMe.md để học viên khóa sau hiểu cách cào dữ liệu bằng NightMare.js

2. Đạt tạo ra file model dạng class để đóng gói các method. Giữ lại các method cũ để đối chiếu so sánh.

3. Hoàn thiện phần Vue.js kết nối REST sử dụng Axios --> Đạt

### Sử dụng REST 
1. Tìm địa điểm theo lat, long, khoảng cách r, loại quán type

    POST:  localhost:3000/find/location hoặc 163.44.206.220:3000/find/location

    param:  inLat, inLong, inR, inType

    vd: (21.014825, 105.846336, 2000, 2)

2. Tìm địa điểm theo quận và loại quán
  
    POST: localhost:3000/find/district hoặc 163.44.206.220:3000/find/district

    param: iType2, inDist

    vd: (2, 2)

## Cài đặt
1. Tải NodeJS: https://nodejs.org/en/download/
2. Mở terminal tới thư mục Coffy:
```
npm install
node app.js
```
