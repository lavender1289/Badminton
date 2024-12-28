document.addEventListener('DOMContentLoaded', function () {
    loadPosts();

    document.getElementById('search-form')?.addEventListener('submit', function (event) {
        event.preventDefault();
        const query = document.getElementById('search-query').value;
        searchPosts(query);
    });
});

function loadPosts() {
    fetch('http://localhost:5000/posts')
        .then(response => response.json())
        .then(posts => {
            displayPosts(posts);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function searchPosts(query) {
    fetch(`http://localhost:5000/posts/search?query=${encodeURIComponent(query)}`)
        .then(response => response.json())
        .then(posts => {
            displayPosts(posts);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function displayPosts(posts) {
    const postList = document.getElementById('post-list');
    postList.innerHTML = '';
    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'post';
        postElement.innerHTML = `
            <h2>${post.type === 'court' ? 'Sân Tìm Người' : 'Người Tìm Sân'}</h2>
            <p>Địa Chỉ: ${post.diaChi}</p>
            <p>Ngày: ${post.ngay}</p>
            <p>Giờ: ${post.gio}</p>
            <p>Thời Lượng: ${post.thoiLuong} tiếng</p>
            <p>Thông Tin Liên Hệ: ${post.thongTinLienHe}</p>
            <p>Số Lượng Người: ${post.soNguoi}</p>
            <p>Giới Tính: ${post.gioiTinh.join(', ')}</p>
            <p>Trình Độ: ${post.trinhDo.join(', ')}</p>
            <a href="view_post.html?id=${post._id}">View Post</a>
        `;
        postList.appendChild(postElement);
    });
}