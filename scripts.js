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
            <input type="text" id="ten-san" placeholder="Tên Sân" required>
            <input type="datetime-local" id="thoi-gian" required>
            <input type="text" id="dia-chi" placeholder="Địa Chỉ" required>
            <select id="trinh-do" required>
                <option value="">Trình Độ</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
            </select>
            <select id="gioi-tinh" required>
                <option value="">Giới Tính</option>
                <option value="male">Nam</option>
                <option value="female">Nữ</option>
                <option value="any">Bất Kỳ</option>
            </select>
            <input type="number" id="so-nguoi" placeholder="Số Người Cần Tuyển" required>
            <button type="button" onclick="createPost('san-tim-nguoi')">Tạo Bài Post</button>
        `;
    } else if (postType === 'nguoi-tim-san') {
        form.innerHTML = `
            <input type="number" id="so-nguoi" placeholder="Số Lượng Người" required>
            <select id="trinh-do" required>
                <option value="">Trình Độ</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
            </select>
            <select id="gioi-tinh" required>
                <option value="">Giới Tính</option>
                <option value="male">Nam</option>
                <option value="female">Nữ</option>
                <option value="any">Bất Kỳ</option>
            </select>
            <input type="text" id="khung-gio" placeholder="Khung Giờ Tìm Sân" required>
            <input type="text" id="khu-vuc" placeholder="Khu Vực" required>
            <button type="button" onclick="createPost('nguoi-tim-san')">Tạo Bài Post</button>
        `;
    }
}

function createPost(type) {
    const post = {
        type: type,
        details: {}
    };
    if (type === 'san-tim-nguoi') {
        post.details.tenSan = document.getElementById('ten-san').value;
        post.details.thoiGian = document.getElementById('thoi-gian').value;
        post.details.diaChi = document.getElementById('dia-chi').value;
        post.details.trinhDo = document.getElementById('trinh-do').value;
        post.details.gioiTinh = document.getElementById('gioi-tinh').value;
        post.details.soNguoi = document.getElementById('so-nguoi').value;
    } else if (type === 'nguoi-tim-san') {
        post.details.soNguoi = document.getElementById('so-nguoi').value;
        post.details.trinhDo = document.getElementById('trinh-do').value;
        post.details.gioiTinh = document.getElementById('gioi-tinh').value;
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
            ${Object.keys(post.details).map(key => `<p>${key}: ${post.details[key]}</p>`).join('')}
        `;
        postList.appendChild(postElement);
    });
}