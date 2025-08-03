/* ==========================================================
   Các chức năng khởi chạy khi trang web tải xong
   ========================================================== */
let isLoggedIn = false;

document.addEventListener('DOMContentLoaded', (event) => {
    const subtitle = document.querySelector('.subtitle');
    const subtitleText = "Công cụ hỗ trợ tóm tắt nhanh và chính xác các văn bản học thuật";
    typewriterEffect(subtitle, subtitleText, 50, true);

    const fileInput = document.getElementById('file-input');
    const fileListContainer = document.getElementById('file-list');

    fileInput.addEventListener('change', (e) => {
        const files = e.target.files;
        fileListContainer.innerHTML = '';

        if (files.length > 0) {
            for (const file of files) {
                const fileElement = document.createElement('div');
                fileElement.classList.add('file');
                let fileIconClass = '';
                if (file.name.endsWith('.pdf')) {
                    fileIconClass = 'fa-file-pdf';
                } else if (file.name.endsWith('.docx')) {
                    fileIconClass = 'fa-file-word';
                } else if (file.name.endsWith('.txt')) {
                    fileIconClass = 'fa-file-alt';
                }

                fileElement.innerHTML = `
                    <i class="fas ${fileIconClass}"></i>
                    <span>${file.name}</span>
                    <i class="fas fa-times" onclick="removeFile(this)"></i>
                `;
                fileListContainer.appendChild(fileElement);
            }
        }
    });

    updateLoginStatus(isLoggedIn);
});


/* ==========================================================
   Các hàm xử lý tương tác UI
   ========================================================== */
function removeFile(element) {
    const parentFileElement = element.parentNode;
    parentFileElement.remove();
}

function typewriterEffect(element, text, speed, loop = false) {
    let i = 0;
    element.textContent = '';
    element.style.opacity = '1';

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else if (loop) {
            setTimeout(() => {
                let j = text.length;
                function backspace() {
                    if (j > 0) {
                        element.textContent = text.substring(0, j - 1);
                        j--;
                        setTimeout(backspace, speed / 2);
                    } else {
                        setTimeout(() => {
                            typewriterEffect(element, text, speed, loop);
                        }, 1000);
                    }
                }
                backspace();
            }, 2000);
        }
    }
    type();
}

function toggleMenu() {
        const container = document.querySelector('.container');
        container.classList.toggle('menu-open');
}

function openLoginPopup(event) {
    event.preventDefault();
    const loginPopup = document.querySelector('.login-popup');
    const container = document.querySelector('.container');
    container.classList.add('hidden');
    loginPopup.classList.add('active');
}

function closeLoginPopup() {
    const loginPopup = document.querySelector('.login-popup');
    const container = document.querySelector('.container');
    loginPopup.classList.remove('active');
    container.classList.remove('hidden');
}

function clearChat() {
    const mainTextarea = document.getElementById('main-textarea');
    const outputArea = document.querySelector('.output-area');
    const fileListContainer = document.getElementById('file-list');
    const container = document.querySelector('.container');

    // Đóng menu trước khi xóa nội dung, chỉ khi nó đang mở
    if (container.classList.contains('menu-open')) {
        toggleMenu();
    }
    
    // Xóa nội dung trong các phần tử
    if (mainTextarea) {
        mainTextarea.value = '';
    }
    if (outputArea) {
        outputArea.innerHTML = '';
    }
    if (fileListContainer) {
        fileListContainer.innerHTML = '';
    }
}

function updateLoginStatus(isLoggedInStatus) {
    const userProfileLink = document.getElementById('user-profile-link');
    const userProfileMenuLink = document.getElementById('user-profile-menu-link');
    
    if (isLoggedInStatus) {
        userProfileLink.style.display = 'block';
        userProfileMenuLink.innerHTML = `<i class="fas fa-user-circle"></i><span>Tài khoản</span>`;
        userProfileMenuLink.onclick = toggleMenu;
        isLoggedIn = true;
    } else {
        userProfileLink.style.display = 'none';
        userProfileMenuLink.innerHTML = `<span>Đăng nhập</span>`;
        userProfileMenuLink.onclick = openLoginPopup;
        isLoggedIn = false;
    }
}


/* ==========================================================
   Các hàm xử lý logic đăng nhập/đăng xuất (cần triển khai)
   ========================================================== */
function loginWithGoogle() {
    alert("Đăng Nhập Thành Công!");
    closeLoginPopup(); 
    updateLoginStatus(true);
}

function logout() {
    if (isLoggedIn) {
        alert("Đăng Xuất Thành Công!");
        updateLoginStatus(false);
    } else {
        alert("Bạn chưa đăng nhập!");
    }
}
