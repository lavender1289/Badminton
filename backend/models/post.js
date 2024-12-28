const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    type: { type: String, required: true, enum: ['court', 'player'] }, // Thêm trường type
    diaChi: String,
    ngay: String,
    gio: String,
    thoiLuong: Number,
    thongTinLienHe: String,
    soNguoi: Number,
    gioiTinh: [String],
    trinhDo: [String],
    moTaThem: String
});

module.exports = mongoose.model('Post', postSchema);