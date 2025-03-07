const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

/**
 * Hàm tải template
 *
 * Cách dùng:
 * <div id="parent"></div>
 * <script>
 *  load("#parent", "./path-to-template.html");
 * </script>
 */
function load(selector, path) {
    const cached = localStorage.getItem(path);
    if (cached) {
        $(selector).innerHTML = cached;
    }

    fetch(path)
        .then((res) => res.text())
        .then((html) => {
            if (html !== cached) {
                $(selector).innerHTML = html;
                localStorage.setItem(path, html);
            }
        })
        .finally(() => {
            window.dispatchEvent(new Event("template-loaded"));
        });
}

/**
 * Hàm kiểm tra một phần tử
 * có bị ẩn bởi display: none không
 */
function isHidden(element) {
    if (!element) return true;

    if (window.getComputedStyle(element).display === "none") {
        return true;
    }

    let parent = element.parentElement;
    while (parent) {
        if (window.getComputedStyle(parent).display === "none") {
            return true;
        }
        parent = parent.parentElement;
    }

    return false;
}

/**
 * Hàm buộc một hành động phải đợi
 * sau một khoảng thời gian mới được thực thi
 */
function debounce(func, timeout = 300) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, args);
        }, timeout);
    };
}

/**
 * Hàm tính toán vị trí arrow cho dropdown
 *
 * Cách dùng:
 * 1. Thêm class "js-dropdown-list" vào thẻ ul cấp 1
 * 2. CSS "left" cho arrow qua biến "--arrow-left-pos"
 */
const calArrowPos = debounce(() => {
    if (isHidden($(".js-dropdown-list"))) return;

    const items = $$(".js-dropdown-list > li");

    items.forEach((item) => {
        const arrowPos = item.offsetLeft + item.offsetWidth / 2;
        item.style.setProperty("--arrow-left-pos", `${arrowPos}px`);
    });
});

// Tính toán lại vị trí arrow khi resize trình duyệt
window.addEventListener("resize", calArrowPos);

// Tính toán lại vị trí arrow sau khi tải template
window.addEventListener("template-loaded", calArrowPos);

/**
 * JS toggle
 *
 * Cách dùng:
 * <button class="js-toggle" toggle-target="#box">Click</button>
 * <div id="box">Content show/hide</div>
 */
window.addEventListener("template-loaded", initJsToggle);
//ịnh nghĩa $$

function initJsToggle() {
    $$(".js-toggle").forEach((button) => {
        const target = button.getAttribute("toggle-target");

        if (!target) {
            console.error(`Cần thêm toggle-target cho: ${button.outerHTML}`);
            return;
        }

        const targetElement = $(target);
        if (!targetElement) {
            console.error(`Không tìm thấy phần tử "${target}"`);
            return;
        }

        button.onclick = (e) => {
            e.preventDefault();
            const phoneId = button.getAttribute("data-id");
            const isAdding = button.id === "phoneAdd";

            if (target === "#delete-confirm") {
                // Xử lý modal XÓA
                $("#phone-delete").setAttribute("data-id", phoneId);
            } else {
                // Xử lý modal THÊM/SỬA
                if (phoneId) {
                    $("#addPhone").classList.add("btn--disabled");
                    $("#savePhone").classList.remove("btn--disabled");
                    window.updatePhone(phoneId);
                } else if (isAdding) {
                    $("#addPhone").classList.remove("btn--disabled");
                    $("#savePhone").classList.add("btn--disabled");
                    $("#phoneForm").reset();
                }
            }

            // Hiển thị/ẩn modal
            targetElement.classList.toggle("hide");
            targetElement.classList.toggle("show");

            // Thêm sự kiện đóng modal khi click bên ngoài
            document.addEventListener("click", outsideClickHandler);
        };

        function outsideClickHandler(e) {
            if (!e.target.closest(target) && !e.target.closest(".js-toggle")) {
                targetElement.classList.add("hide");
                targetElement.classList.remove("show");
                document.removeEventListener("click", outsideClickHandler);

                // Reset trạng thái nút
                if (target !== "#delete-confirm") {
                    $("#addPhone").classList.remove("btn--disabled");
                    $("#savePhone").classList.add("btn--disabled");
                }
            }
        }
    });
}
