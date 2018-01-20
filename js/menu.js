$(document).ready(function () {
    'use strict';
    var option = document.getElementById('selectMenu'),
        targetElement = document.getElementsByClassName('flex-row')[0];

    var ProductsModel = function ProductsModel(XMLHttpRequest) {
        this.XMLHttpRequest = XMLHttpRequest;
    };

    ProductsModel.prototype.getProducts = function getProducts(fn) {
        var oReq = new this.XMLHttpRequest();
        oReq.onload = function onLoad(e) {
            var ajaxResponse = JSON.parse(e.currentTarget.responseText),
                product = ajaxResponse;
            fn(product);
        };
        oReq.open('GET', 'https://familyburger.com.ua/products.json', true);
        oReq.send();
    };

    var ProductsView = function ProductsView(element, select) {
        this.element = element;
        this.select = select;
        this.onChangeGetProduct = null;
    };

    ProductsView.prototype.render = function render(viewModel) {
        var x,
            y,
            items,
            firstItemNum,
            flag = true,
            that = this,
            itemsByName = [],
            itemsByPrice = [],
            itemDescription = [],
            itemsLen = viewModel.length,
            selectValue = this.select.options[this.select.selectedIndex].value;
        this.element.innerHTML = '';
        for (x = 0; x < itemsLen; x++) {
            if (viewModel[x].type === selectValue) {
                if (flag) {
                    firstItemNum = x;
                    flag = false;
                }
                this.element.innerHTML += '<div class="item-img"><a href="#modal-fullscreen" data-toggle="modal"><h1 class="notify-badge">' +
                    viewModel[x].name + '</h1><img src="images/menu/img-' +
                    (x + 1) + '.png"alt="' + viewModel[x].name + '"></a></div>';
                itemsByName.push(viewModel[x].name);
                itemsByPrice.push(viewModel[x].price);
                itemDescription.push(viewModel[x].description);
            }
        }
        items = Array.prototype.slice.call(document.querySelectorAll('.container .item-img'));
        itemsLen = items.length;
        for (y = 0; y < itemsLen; y++) {
            items[y].addEventListener('click', function () {
                that.onClickShowDescription(items.indexOf(this) +
                    firstItemNum, itemsByPrice[items.indexOf(this)], itemsByName[items.indexOf(this)], itemDescription[items.indexOf(this)]);
            });
        };
        this.select.addEventListener('change', function () {
            that.onChangeGetProducts(viewModel);
        });

        $('.notify-badge').arctext({
            radius: 300
        });
    };

    ProductsView.prototype.showItemDescription = function showItem(elementIndex, elementName, elementDescription) {
        var description = document.getElementsByClassName("description")[0],
            image = document.getElementsByClassName("product-img")[0];
        description.innerHTML = "<b>" + elementName + "</b><br>" + elementDescription,
            image.style.backgroundImage = 'url("images/product/img-' + (elementIndex + 1) + '.png")';
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
        this.productsView.onChangeGetProducts = this.onChangeGetProducts.bind(this);
        this.productsView.onClickShowDescription = this.onClickShowDescription.bind(this);
    };

    ProductsController.prototype.onLoadShowProducts = function onLoadShowProducts(productModelData) {
        this.productsView.render(productModelData);
    };

    ProductsController.prototype.onChangeGetProducts = function onChangeGetProducts(newProductData) {
        this.productsView.render(newProductData);
    };

    ProductsController.prototype.onClickShowDescription = function onClickShowDescription(itemIndex, itemPrice, itemName, itemModal) {
        this.productsView.showItemDescription(itemIndex, itemName, itemModal);
        this.productsView.slideDown(itemPrice);
    };

    (function initialize() {
        var model = new ProductsModel(XMLHttpRequest),
            view = new ProductsView(targetElement, option),
            controller = new ProductsController(model, view);
        controller.initialize();
    })();
});