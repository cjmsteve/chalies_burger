document.addEventListener('DOMContentLoaded', function () {
    // 모바일 메뉴 토글
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainMenu = document.querySelector('.main-menu');

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function () {
            this.classList.toggle('active');
            mainMenu.classList.toggle('active');
        });
    }

    // 스크롤 시 헤더 스타일 변경
    const header = document.querySelector('header');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

});
// 뉴스 아이템 더 불러오기 (예시)
function loadMoreNews() {
    const newsContainer = document.querySelector('.news-items');
    if (newsContainer) {
        const moreNews = [
            {
                title: '찰리스버거, 신메뉴 출시 이벤트 진행',
                date: '2023.11.15',
                image: 'images/news1.jpg',
                content: '찰리스버거에서 겨울 시즌 한정 신메뉴를 출시하고 다양한 이벤트를 진행합니다.'
            },
            {
                title: '찰리스버거, 새로운 매장 오픈 소식',
                date: '2023.11.01',
                image: 'images/news2.jpg',
                content: '찰리스버거의 새로운 매장이 11월 중 오픈 예정입니다. 많은 기대와 관심 부탁드립니다.'
            }
        ];

        // 뉴스 아이템 HTML 생성 및 추가
        let newsHTML = '';
        moreNews.forEach(news => {
            newsHTML += `
                <div class="news-item">
                    <div class="news-image">
                        <img src="${news.image}" alt="${news.title}">
                    </div>
                    <div class="news-content">
                        <h3>${news.title}</h3>
                        <p class="news-date">${news.date}</p>
                        <p>${news.content}</p>
                        <a href="#" class="read-more">자세히 보기</a>
                    </div>
                </div>
            `;
        });

        // 뉴스 컨테이너에 추가
        newsContainer.innerHTML += newsHTML;
    }
}


// 이벤트 검색 버튼에 이벤트 리스너 추가
document.addEventListener('DOMContentLoaded', function () {
    const searchButton = document.querySelector('.store-search button');
    if (searchButton) {
        searchButton.addEventListener('click', searchStore);
    }

    // 검색 입력 필드에서 엔터키 눌렀을 때 검색 실행
    const searchInput = document.querySelector('.store-search input');
    if (searchInput) {
        searchInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                searchStore();
            }
        });
    }
});