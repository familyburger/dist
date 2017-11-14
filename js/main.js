$(document).ready(function () {
    let offsetButton = (function () {
        let scrollOffset = document.getElementById('contentWrap').offsetTop;
        return scrollOffset;
    });
    let scrollElm = document.scrollingElement;
    window.onresize = offsetButton;
    window.onscroll = function () {
        scrollFunction()
    };

    function scrollFunction() {
        if (scrollElm.scrollTop > offsetButton()) {
            document.getElementById('scrollTop').style.display = "block";
        } else {
            document.getElementById('scrollTop').style.display = "none";
        }
        if (scrollElm.scrollTop >= 105) {
            $('.navbar').addClass('scrolled-nav');
        } else {
            $('.navbar').removeClass('scrolled-nav');
        }
    }
    $('#scrollTop').on('click', function (event) {
        event.stopPropagation();
        event.preventDefault();
        $('html,body').animate({
            scrollTop: 0
        }, 'slow');
    });
    document.getElementsByClassName('navbar-toggle')[0].onclick = function () {
        let scrolledNav = document.getElementsByClassName('navbar')[0];
        if (this.getAttribute("aria-expanded") === 'false' || this.getAttribute("aria-expanded") === null && !scrolledNav.classList.contains("activeBar")) {
            scrolledNav.classList.add("activeBar");
            scrolledNav.style.height = 'auto';
        } else {
            scrolledNav.classList.remove("activeBar");
        }
    }
});