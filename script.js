// 전역 변수
let isMenuOpen = false;

// DOM이 로드된 후 실행
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// 앱 초기화
function initializeApp() {
    setupNavigation();
    setupScrollAnimations();
    setupSmoothScrolling();
    setupScrollToTop();
    addInteractiveEffects();
}

// 네비게이션 설정
function setupNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    // 모바일 메뉴 토글
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            toggleMobileMenu();
        });
    }

    // 네비게이션 링크 클릭 시 메뉴 닫기
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (isMenuOpen) {
                toggleMobileMenu();
            }
        });
    });

    // 스크롤 시 네비게이션 스타일 변경
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(26, 26, 26, 0.98)';
        } else {
            navbar.style.background = 'rgba(26, 26, 26, 0.95)';
        }
    });
}

// 모바일 메뉴 토글
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const navToggle = document.querySelector('.nav-toggle');
    
    isMenuOpen = !isMenuOpen;
    
    if (isMenuOpen) {
        navMenu.classList.add('active');
        navToggle.classList.add('active');
        document.body.style.overflow = 'hidden';
    } else {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// 스크롤 애니메이션 설정
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // 애니메이션 대상 요소들
    const animateElements = document.querySelectorAll(`
        .about-item,
        .feature-card,
        .demo-item,
        .tech-item,
        .team-member
    `);

    animateElements.forEach(el => {
        el.classList.add('fade-in-up');
        observer.observe(el);
    });
}

// 부드러운 스크롤 설정
function setupSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 맨 위로 스크롤 버튼
function setupScrollToTop() {
    // 맨 위로 버튼 생성
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #dc2626, #fbbf24);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        box-shadow: 0 4px 15px rgba(220, 38, 38, 0.3);
        z-index: 1000;
        font-size: 1.2rem;
    `;
    
    document.body.appendChild(scrollToTopBtn);
    
    // 스크롤 이벤트
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.visibility = 'visible';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.visibility = 'hidden';
        }
    });
    
    // 버튼 클릭 이벤트
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // 호버 효과
    scrollToTopBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1) translateY(-2px)';
        this.style.boxShadow = '0 8px 25px rgba(220, 38, 38, 0.4)';
    });
    
    scrollToTopBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) translateY(0)';
        this.style.boxShadow = '0 4px 15px rgba(220, 38, 38, 0.3)';
    });
}

// 상호작용 효과 추가
function addInteractiveEffects() {
    // 카드 호버 효과 강화
    const cards = document.querySelectorAll('.about-item, .feature-card, .team-member');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // 버튼 클릭 리플 효과
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            createRippleEffect(e, this);
        });
    });
    
    // 데모 이미지 클릭 효과
    const demoImages = document.querySelectorAll('.demo-screen img');
    
    demoImages.forEach(img => {
        img.addEventListener('click', function() {
            showImageModal(this.src);
        });
        
        img.style.cursor = 'pointer';
        img.title = '클릭하여 확대 보기';
    });
}

// 리플 효과 생성
function createRippleEffect(event, element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
    `;
    
    // 리플 애니메이션 CSS 추가
    if (!document.querySelector('#ripple-animation')) {
        const style = document.createElement('style');
        style.id = 'ripple-animation';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// 이미지 모달 표시
function showImageModal(imageSrc) {
    // 모달 생성
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
        cursor: pointer;
    `;
    
    const img = document.createElement('img');
    img.src = imageSrc;
    img.style.cssText = `
        max-width: 90%;
        max-height: 90%;
        object-fit: contain;
        border-radius: 12px;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
        transform: scale(0.8);
        transition: transform 0.3s ease;
    `;
    
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '<i class="fas fa-times"></i>';
    closeBtn.style.cssText = `
        position: absolute;
        top: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: rgba(255, 255, 255, 0.2);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        font-size: 1.2rem;
        backdrop-filter: blur(10px);
        transition: all 0.3s ease;
    `;
    
    closeBtn.addEventListener('mouseenter', function() {
        this.style.background = 'rgba(220, 38, 38, 0.8)';
        this.style.transform = 'scale(1.1)';
    });
    
    closeBtn.addEventListener('mouseleave', function() {
        this.style.background = 'rgba(255, 255, 255, 0.2)';
        this.style.transform = 'scale(1)';
    });
    
    modal.appendChild(img);
    modal.appendChild(closeBtn);
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // 애니메이션
    setTimeout(() => {
        modal.style.opacity = '1';
        img.style.transform = 'scale(1)';
    }, 10);
    
    // 닫기 이벤트
    const closeModal = () => {
        modal.style.opacity = '0';
        img.style.transform = 'scale(0.8)';
        setTimeout(() => {
            document.body.removeChild(modal);
            document.body.style.overflow = '';
        }, 300);
    };
    
    modal.addEventListener('click', closeModal);
    closeBtn.addEventListener('click', closeModal);
    
    // ESC 키로 닫기
    const handleEsc = (e) => {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', handleEsc);
        }
    };
    document.addEventListener('keydown', handleEsc);
}

// 텍스트 타이핑 효과
function typeText(element, text, speed = 50) {
    element.innerHTML = '';
    let i = 0;
    
    const timer = setInterval(() => {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
        } else {
            clearInterval(timer);
        }
    }, speed);
}

// 카운터 애니메이션
function animateCounter(element, start, end, duration = 2000) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
            current = end;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 16);
}

// 성능 최적화를 위한 디바운스 함수
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 윈도우 리사이즈 이벤트 최적화
window.addEventListener('resize', debounce(() => {
    // 모바일 메뉴가 열려있고 화면이 데스크톱 크기가 되면 메뉴 닫기
    if (isMenuOpen && window.innerWidth > 768) {
        toggleMobileMenu();
    }
}, 250));

// 페이지 로딩 애니메이션
window.addEventListener('load', function() {
    const loader = document.createElement('div');
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #1a1a1a 0%, #2d1b69 50%, #dc2626 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10001;
        opacity: 1;
        transition: opacity 0.5s ease;
    `;
    
    const spinner = document.createElement('div');
    spinner.innerHTML = '<i class="fas fa-film"></i>';
    spinner.style.cssText = `
        font-size: 3rem;
        color: white;
        animation: spin 1s linear infinite;
    `;
    
    // 스피너 애니메이션 CSS 추가
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    
    loader.appendChild(spinner);
    document.body.appendChild(loader);
    
    // 1초 후 로더 제거
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            if (document.body.contains(loader)) {
                document.body.removeChild(loader);
            }
        }, 500);
    }, 1000);
});

// 개발자 콘솔 메시지
console.log(`
🎬 Cinema Review - Landing Page
====================================
개발자: Frontend Team
기술스택: HTML5, CSS3, JavaScript
특징: 반응형 디자인, 부드러운 애니메이션
====================================
포트폴리오가 마음에 드셨나요? 연락주세요! 📧
`);

// 에러 핸들링
window.addEventListener('error', function(e) {
    console.error('JavaScript 오류 발생:', e.error);
});

// 브라우저 호환성 체크
function checkBrowserSupport() {
    const features = {
        intersectionObserver: 'IntersectionObserver' in window,
        cssGrid: CSS.supports('display', 'grid'),
        backdropFilter: CSS.supports('backdrop-filter', 'blur(10px)')
    };
    
    const unsupportedFeatures = Object.keys(features).filter(key => !features[key]);
    
    if (unsupportedFeatures.length > 0) {
        console.warn('일부 브라우저 기능이 지원되지 않습니다:', unsupportedFeatures);
    }
}

// 브라우저 지원 체크 실행
checkBrowserSupport();