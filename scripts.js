document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const postType = urlParams.get('type');
    if (postType) {
        setupForm(postType);
    } else {
        loadPosts();
    }
});

function setupForm(postType) {
    const form = document.getElementById('post-form');
    form.innerHTML = '';
    if (postType === 'san-tim-nguoi') {
        form.innerHTML = `
            <h2>Sân Tìm Người</h2>
            <h3>Thông tin sân</h3>
            <input type="text" id="dia-chi" placeholder="Địa Chỉ Sân" required>
            <input type="date" id="ngay" required>
            <input type="time" id="gio" required>
            <input type="number" id="thoi-luong" placeholder="Thời Lượng (tiếng)" required>
            <input type="text" id="thong-tin-lien-he" placeholder="Thông Tin Liên Hệ" required>
            <h3>Tuyển người</h3>
            <input type="number" id="so-nguoi" placeholder="Số Lượng Người" value="1" required>

            <label>Giới Tính:</label>
            <div id="gioi-tinh">
                <label><input type="checkbox" value="Nam"> Nam</label>
                <label><input type="checkbox" value="Nữ"> Nữ</label>
                <label><input type="checkbox" value="Mix"> Mix</label>
            </div>
            <div id="selected-gioi-tinh"></div>

            <label>Trình Độ:</label>
            <div id="trinh-do">
                <label><input type="checkbox" value="Mới Chơi"> Mới Chơi</label>
                <label><input type="checkbox" value="Yếu"> Yếu</label>
                <label><input type="checkbox" value="Trung Bình Yếu"> Trung Bình Yếu</label>
                <label><input type="checkbox" value="Trung Bình"> Trung Bình</label>
                <label><input type="checkbox" value="Trung Bình Khá"> Trung Bình Khá</label>
                <label><input type="checkbox" value="Khá"> Khá</label>
                <label><input type="checkbox" value="Giỏi"> Giỏi</label>
            </div>
            <div id="selected-trinh-do"></div>

            <h3>Thông tin mô tả thêm</h3>
            <textarea id="mo-ta-them" placeholder="Thông Tin Mô Tả Thêm" rows="4"></textarea>
            <button type="button" onclick="createPost('san-tim-nguoi')">Tạo Bài Post</button>
            <p id="error-message" class="error-message"></p>
        `;
        setupCheckboxListeners('gioi-tinh', 'selected-gioi-tinh');
        setupCheckboxListeners('trinh-do', 'selected-trinh-do');
    } else if (postType === 'nguoi-tim-san') {
        form.innerHTML = `
            <input type="number" id="so-nguoi" placeholder="Số Lượng Người" required>

            <label>Giới Tính:</label>
            <div id="gioi-tinh">
                <label><input type="checkbox" value="Nam"> Nam</label>
                <label><input type="checkbox" value="Nữ"> Nữ</label>
                <label><input type="checkbox" value="Bất Kỳ"> Bất Kỳ</label>
            </div>
            <div id="selected-gioi-tinh"></div>

            <label>Trình Độ:</label>
            <div id="trinh-do">
                <label><input type="checkbox" value="Mới Chơi"> Mới Chơi</label>
                <label><input type="checkbox" value="Yếu"> Yếu</label>
                <label><input type="checkbox" value="Trung Bình Yếu"> Trung Bình Yếu</label>
                <label><input type="checkbox" value="Trung Bình"> Trung Bình</label>
                <label><input type="checkbox" value="Trung Bình Khá"> Trung Bình Khá</label>
                <label><input type="checkbox" value="Khá"> Khá</label>
                <label><input type="checkbox" value="Giỏi"> Giỏi</label>
            </div>
            <div id="selected-trinh-do"></div>

            <input type="text" id="khung-gio" placeholder="Khung Giờ Tìm Sân" required>
            <input type="text" id="khu-vuc" placeholder="Khu Vực" required>
            <button type="button" onclick="createPost('nguoi-tim-san')">Tạo Bài Post</button>
            <p id="error-message" class="error-message"></p>
        `;
        setupCheckboxListeners('gioi-tinh', 'selected-gioi-tinh');
        setupCheckboxListeners('trinh-do', 'selected-trinh-do');
    }
}

function setupCheckboxListeners(checkboxContainerId, displayContainerId) {
    const container = document.getElementById(checkboxContainerId);
    const display = document.getElementById(displayContainerId);
    container.addEventListener('change', () => {
        const selected = Array.from(container.querySelectorAll('input[type="checkbox"]:checked'))
            .map(input => input.value);
        display.textContent = `Selected: ${selected.join(', ')}`;
    });
}

function createPost(type) {
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
        type: type,
        details: {}
    };
    if (type === 'san-tim-nguoi') {
        post.details.diaChi = document.getElementById('dia-chi').value;
        post.details.ngay = document.getElementById('ngay').value;
        post.details.gio = document.getElementById('gio').value;
        post.details.thoiLuong = document.getElementById('thoi-luong').value;
        post.details.thongTinLienHe = document.getElementById('thong-tin-lien-he').value;
        post.details.soNguoi = document.getElementById('so-nguoi').value;
        post.details.gioiTinh = Array.from(document.querySelectorAll('#gioi-tinh input[type="checkbox"]:checked')).map(input => input.value);
        post.details.trinhDo = Array.from(document.querySelectorAll('#trinh-do input[type="checkbox"]:checked')).map(input => input.value);
        post.details.moTaThem = document.getElementById('mo-ta-them').value;
    } else if (type === 'nguoi-tim-san') {
        post.details.soNguoi = document.getElementById('so-nguoi').value;
        post.details.trinhDo = Array.from(document.querySelectorAll('#trinh-do input[type="checkbox"]:checked')).map(input => input.value);
        post.details.gioiTinh = Array.from(document.querySelectorAll('#gioi-tinh input[type="checkbox"]:checked')).map(input => input.value);
        post.details.khungGio = document.getElementById('khung-gio').value;
        post.details.khuVuc = document.getElementById('khu-vuc').value;
    }

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
            <h2>${post.type === 'san-tim-nguoi' ? 'Sân Tìm Người' : 'Người Tìm Sân'}</h2>
            ${Object.keys(post.details).map(key => `<p>${capitalize(key)}: ${post.details[key]}</p>`).join('')}
        `;
        postList.appendChild(postElement);
    });
}

function filterPosts(filterType) {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    const filteredPosts = filterType === 'all' ? posts : posts.filter(post => post.type === filterType);
    const postList = document.getElementById('post-list');
    postList.innerHTML = '';
    filteredPosts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'post';
        postElement.innerHTML = `
            <h2>${post.type === 'san-tim-nguoi' ? 'Sân Tìm Người' : 'Người Tìm Sân'}</h2>
            ${Object.keys(post.details).map(key => `<p>${capitalize(key)}: ${post.details[key]}</p>`).join('')}
        `;
        postList.appendChild(postElement);
    });
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase().replace(/-/g, ' ');
}