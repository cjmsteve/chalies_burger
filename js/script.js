document.addEventListener('DOMContentLoaded', function () {
    // DOM 요소 선택
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainMenu = document.querySelector('.main-menu');
    const header = document.querySelector('header');
    const menuCategories = document.querySelectorAll('.menu-categories li');
    const menuSections = document.querySelectorAll('.menu-section');

    // 모바일 메뉴 토글
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function () {
            this.classList.toggle('active');
            mainMenu.classList.toggle('active');
        });
    }

    // 통합 스크롤 이벤트 핸들러
    let scrollHandler = function () {
        const scrollY = window.scrollY;

        // 헤더 스타일 변경
        if (scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // 메뉴 카테고리 자동 활성화 (메뉴 페이지에서만)
        if (menuSections.length > 0 && menuCategories.length > 0) {
            const scrollPosition = scrollY + 200;

            menuSections.forEach(function (section, index) {
                const sectionTop = section.offsetTop;
                const sectionBottom = sectionTop + section.offsetHeight;

                if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                    // 모든 카테고리에서 active 제거
                    menuCategories.forEach(function (cat) {
                        cat.classList.remove('active');
                    });

                    // 해당하는 카테고리에 active 추가
                    if (menuCategories[index]) {
                        menuCategories[index].classList.add('active');
                    }
                }
            });
        }
    };

    // 스크롤 이벤트 리스너 등록
    window.addEventListener('scroll', scrollHandler);

    // 메뉴 카테고리 네비게이션 클릭 이벤트
    if (menuCategories.length > 0) {
        menuCategories.forEach(function (category) {
            category.addEventListener('click', function (e) {
                e.preventDefault();

                // 모든 카테고리에서 active 클래스 제거
                menuCategories.forEach(function (cat) {
                    cat.classList.remove('active');
                });

                // 클릭된 카테고리에 active 클래스 추가
                this.classList.add('active');

                // 해당 섹션으로 스크롤
                const targetId = this.querySelector('a').getAttribute('href');
                const targetSection = document.querySelector(targetId);

                if (targetSection) {
                    const headerHeight = header.offsetHeight;
                    const navHeight = document.querySelector('.menu-navigation').offsetHeight;
                    const offsetTop = targetSection.offsetTop - headerHeight - navHeight - 20;

                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
});
