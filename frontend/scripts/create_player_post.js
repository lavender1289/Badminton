document.getElementById('create-post-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const post = {
        type: formData.get('type'),
        diaChi: formData.get('diaChi'),
        ngay: formData.get('ngay'),
        gio: formData.get('gio'),
        thoiLuong: Number(formData.get('thoiLuong')),
        thongTinLienHe: formData.get('thongTinLienHe'),
        soNguoi: Number(formData.get('soNguoi')),
        gioiTinh: Array.from(formData.getAll('gioiTinh')),
        trinhDo: Array.from(formData.getAll('trinhDo')),
        moTaThem: formData.get('moTaThem')
    };

    fetch('http://localhost:5000/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(post)
    })
    .then(response => response.json())
    .then(data => {
        alert('Post created successfully');
        window.location.href = 'index.html';
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error creating post');
    });
});