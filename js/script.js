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
            const headerHeight = header.offsetHeight;
            const menuNavigation = document.querySelector('.menu-navigation');
            const navHeight = menuNavigation ? menuNavigation.offsetHeight : 0;
            const offset = headerHeight + navHeight + 50; // 여유 공간 추가

            let activeIndex = -1;

            // 현재 화면에 가장 많이 보이는 섹션을 찾기
            menuSections.forEach(function (section, index) {
                const rect = section.getBoundingClientRect();
                const sectionTop = rect.top;
                const sectionBottom = rect.bottom;

                // 섹션이 네비게이션 바로 아래 영역에 있는지 확인
                if (sectionTop <= offset && sectionBottom > offset) {
                    activeIndex = index;
                }
            });

            // 활성 카테고리 업데이트
            if (activeIndex !== -1) {
                menuCategories.forEach(function (cat, index) {
                    if (index === activeIndex) {
                        cat.classList.add('active');
                    } else {
                        cat.classList.remove('active');
                    }
                });
            }
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

                // 브라우저가 스타일을 즉시 적용하도록 강제
                this.offsetHeight;

                // 해당 섹션으로 스크롤
                const targetId = this.querySelector('a').getAttribute('href');
                const targetSection = document.querySelector(targetId);

                if (targetSection) {
                    // 더 정확한 위치 계산
                    const headerHeight = header.offsetHeight;
                    const menuNavigation = document.querySelector('.menu-navigation');
                    const navHeight = menuNavigation ? menuNavigation.offsetHeight : 0;

                    // 섹션의 실제 위치에서 고정 요소들의 높이와 여유 공간을 뺌
                    const sectionRect = targetSection.getBoundingClientRect();
                    const currentScrollY = window.scrollY;
                    const targetY = currentScrollY + sectionRect.top - headerHeight - navHeight - 30;

                    window.scrollTo({
                        top: Math.max(0, targetY), // 음수 방지
                        behavior: 'smooth'
                    });
                }
            });
        });

        // 페이지 로드 시 첫 번째 카테고리를 활성화
        if (menuCategories[0]) {
            menuCategories[0].classList.add('active');
        }
    }
});
