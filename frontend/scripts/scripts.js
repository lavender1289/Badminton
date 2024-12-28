document.addEventListener('DOMContentLoaded', function () {
    loadPosts();
    setupCheckboxListeners('gioi-tinh', 'selected-gioi-tinh');
    setupCheckboxListeners('trinh-do', 'selected-trinh-do');
});

function createPost() {
    const requiredFields = document.querySelectorAll('#post-form [required]');
    let allFieldsFilled = true;
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.classList.add('error');
            allFieldsFilled = false;
        } else {
            field.classList.remove('error');
        }
    });

    if (!allFieldsFilled) {
        document.getElementById('error-message').textContent = 'Vui lòng điền đầy đủ các thông tin bắt buộc.';
        return;
    }

    const post = {
        diaChi: document.getElementById('dia-chi').value,
        ngay: document.getElementById('ngay').value,
        gio: document.getElementById('gio').value,
        thoiLuong: document.getElementById('thoi-luong').value,
        thongTinLienHe: document.getElementById('thong-tin-lien-he').value,
        soNguoi: document.getElementById('so-nguoi').value,
        gioiTinh: Array.from(document.querySelectorAll('#gioi-tinh input[type="checkbox"]:checked')).map(input => input.value),
        trinhDo: Array.from(document.querySelectorAll('#trinh-do input[type="checkbox"]:checked')).map(input => input.value),
        moTaThem: document.getElementById('mo-ta-them').value
    };

    // Save the post (for example, using localStorage for simplicity)
    let posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts.push(post);
    localStorage.setItem('posts', JSON.stringify(posts));

    // Redirect to home page
    window.location.href = 'index.html';
}

function loadPosts() {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    const postList = document.getElementById('post-list');
    postList.innerHTML = '';
    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'post';
        postElement.innerHTML = `
            <h2>Sân Tìm Người</h2>
            <p>Địa Chỉ: ${post.diaChi}</p>
            <p>Ngày: ${post.ngay}</p>
            <p>Giờ: ${post.gio}</p>
            <p>Thời Lượng: ${post.thoiLuong} tiếng</p>
            <p>Thông Tin Liên Hệ: ${post.thongTinLienHe}</p>
            <p>Số Lượng Người: ${post.soNguoi}</p>
            <p>Giới Tính: ${post.gioiTinh.join(', ')}</p>
            <p>Trình Độ: ${post.trinhDo.join(', ')}</p>
            <p>Thông Tin Mô Tả Thêm: ${post.moTaThem}</p>
        `;
        postList.appendChild(postElement);
    });
}

function setupCheckboxListeners(checkboxContainerId, displayContainerId) {
    const container = document.getElementById(checkboxContainerId);
    const display = document.getElementById(displayContainerId);
    container.addEventListener('change', () => {
        const selected = Array.from(container.querySelectorAll('input[type="checkbox"]:checked')).map(input => input.value);
        display.textContent = `Selected: ${selected.join(', ')}`;
    });
}