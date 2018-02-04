'use strict';
var ProductsModel = function ProductsModel(XMLHttpRequest) {
    this.XMLHttpRequest = XMLHttpRequest;
    this.ajaxResponse = '';
};

ProductsModel.prototype.getProducts = function getProducts(fn) {
    var oReq = new this.XMLHttpRequest();
    oReq.onload = function onLoad(e) {
        this.ajaxResponse = JSON.parse(e.currentTarget.responseText),
            fn(this.ajaxResponse);
    };
    oReq.open('GET', 'https://familyburger.com.ua/products.json', true);
    oReq.send();
};

var ProductsView = function ProductsView() {
    this.viewElement = document.getElementsByClassName('flex-row')[0];
    this.select = document.getElementById('selectMenu');
    this.description = document.getElementsByClassName("description")[0];
    this.image = document.getElementsByClassName("product-img")[0];
    this.loader = document.getElementsByClassName('loader')[0];
};

ProductsView.prototype.render = function render(viewModel) {
    var x,
        itemIdx,
        flag = true,
        imgPreload = [];
    this.viewModel = viewModel;
    this.viewElement.innerHTML = '';
    this.loader.classList.remove('contentLoaded');
    for (x = 0; x < viewModel.length; x++) {
        if (viewModel[x].type === this.select.options[this.select.selectedIndex].value) {
            if (flag) {
                itemIdx = x;
                flag = false;
            }
            this.viewElement.innerHTML += '<div class="item-img"><a href="#modal-fullscreen" data-toggle="modal"><h1 class="notify-badge">' +
                viewModel[x].name + '</h1><img src="images/menuLowQuality/img-' +
                (x + 1) + '.png"alt="' + viewModel[x].name + '"></a></div>';
            imgPreload.push(new Image());
        }
    }
    this.onClickShowDescription(itemIdx, imgPreload);
    $('.notify-badge').arctext({
        radius: 300
    });
};

ProductsView.prototype.showItemDescription = function showItemDescription(idxNum, firstNum) {
    this.description.innerHTML = "<b>" + this.viewModel[firstNum + idxNum].name + "</b><br>" + this.viewModel[firstNum + idxNum].description,
        this.image.style.backgroundImage = 'url("images/menuHighQuality/img-' + (firstNum + idxNum + 1) + '.png")';
    this.slideDown(this.viewModel[firstNum + idxNum].price);
}

ProductsView.prototype.slideDown = function slideDown(price) {
    var ribbon = document.getElementsByClassName('ribbon')[0],
        hgt = 25,
        interval = setInterval(function () {
            if (50 > hgt) {
                hgt += 0.5;
                ribbon.style.height = hgt + "%";
            } else {
                ribbon.style.height = hgt + "%";
                clearInterval(interval);
                interval = null; // garbage collection
            }
        }, 25);
    ribbon.innerHTML = price;
};

var ProductsController = function ProductsController(productsModel, productsView) {
    this.productsModel = productsModel;
    this.productsView = productsView;
};

ProductsController.prototype.initialize = function initialize() {
    this.productsModel.getProducts(this.onLoadShowProducts.bind(this));
    this.productsView.onClickShowDescription = this.onClickShowDescription.bind(this);
    this.attachEvent(this.productsView.select, 'change', this.selectEventHandler.bind(this));
};

ProductsController.prototype.onLoadShowProducts = function onLoadShowProducts(productModelData) {
    this.productsView.render(productModelData);
};

ProductsController.prototype.selectEventHandler = function selectEventHandler() {
    this.productsView.render(this.productsView.viewModel);
}

ProductsController.prototype.attachEvent = function attachEvent(element, type, handler) {
    if (element.addEventListener) element.addEventListener(type, handler, false);
    else element.attachEvent("on" + type, handler);
}

ProductsController.prototype.itemsEventHandler = function itemsEventHandler(itemIndex, firstItem) {
    this.productsView.showItemDescription(itemIndex, firstItem);
}

ProductsController.prototype.onClickShowDescription = function onClickShowDescription(idx, images) {
    this.index = idx;
    var y,
        items = [],
        controller = this,
        items = Array.prototype.slice.call(document.getElementsByClassName('item-img'));
    for (y = 0; y < items.length; y++) {
        this.attachEvent(items[y], 'click', function () {
            controller.itemsEventHandler(items.indexOf(this), controller.index);
        });
        images[y].src = './images/menuHighQuality/img-' + (idx + y + 1) + '.png';
    }
    this.attachEvent(images[y - 1], 'load' ,function() {
        controller.productsView.loader.classList.add('contentLoaded');
    });
};

(function initialize() {
    var model = new ProductsModel(XMLHttpRequest),
        view = new ProductsView(),
        controller = new ProductsController(model, view);
    controller.initialize();
})();