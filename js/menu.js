$(document).ready(function () {
    var t = document.getElementsByClassName("ribbon")[0],
        e = document.getElementsByClassName("description")[0],
        n = document.getElementsByClassName("product-img")[0];
    ProductsModel = function (t) {
        this.XMLHttpRequest = t
    }, ProductsModel.prototype.getProducts = function (t, e) {
        var n = new this.XMLHttpRequest;
        n.onload = function (n) {
            var o = JSON.parse(n.currentTarget.responseText)[t];
            e(o)
        }, n.open("GET", "https://familyburger.com.ua/products.json", !0), n.send()
    };
    var o = function (t, e) {
        this.element = t, this.index = e.indexOf(t)
    };
    o.prototype.render = function (o) {
        var r = this.index + 1;
        t.innerHTML = String(o.price), e.innerHTML = "<b>" + o.name + "</b><br>" + o.description, n.style.backgroundImage = 'url("images/product/img-' + r + '.png")'
    }, o.prototype.slideDown = function () {
        var e = 25,
            n = setInterval(function () {
                50 > e ? (e += .5, t.style.height = e + "%") : (t.style.height = e + "%", clearInterval(n), n = null)
            }, 25)
    };
    var r = function (t, e) {
        this.productsView = t, this.productsModel = e, this.productsModel.getProducts(this.productsView.index, this.onClickShowProduct.bind(this))
    };
    r.prototype.onClickShowProduct = function (t) {
            this.productsView.slideDown(), this.productsView.render(t)
        },
        function () {
            var t, e = Array.prototype.slice.call(document.querySelectorAll(".container .item-img")),
                n = new ProductsModel(XMLHttpRequest),
                i = e.length;
            for (t = 0; t < i; t++) e[t].onclick = function () {
                var t = new o(this, e);
                new r(t, n)
            }
        }(), window.addEventListener("load", function () {
            var t, e = document.getElementsByTagName("img"),
                n = e.length;
            for (t = 0; t < n; t++) e[t].getAttribute("data-src") && e[t].setAttribute("src", e[t].getAttribute("data-src"))
        }, !1), $(".notify-badge").arctext({
            radius: 300
        })
});