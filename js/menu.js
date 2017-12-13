$(document).ready(function () {
    var price = document.getElementsByClassName('ribbon')[0];
    var description = document.getElementsByClassName('description')[0];
    var image = document.getElementsByClassName('product-img')[0];
    var ProductsModel = function ProductsModel(XMLHttpRequest) {
        this.XMLHttpRequest = XMLHttpRequest;
      };
      ProductsModel.prototype.getProducts = function getProducts(index,fn) {
        var oReq = new this.XMLHttpRequest();
        oReq.onload = function onLoad(e) {
          var ajaxResponse = JSON.parse(e.currentTarget.responseText)
          var product = ajaxResponse[index];
          fn(product);
        };
      
        oReq.open('GET', 'https://familyburger.com.ua/products.json', true);
        oReq.send();
      };
    var ProductsView = function ProductsView(element,items) {
        this.element = element;
        this.index = items.indexOf(element);
      };
      ProductsView.prototype.render = function render(viewModel) {
        var imageIndex = this.index + 1;
        price.innerHTML = String(viewModel.price);
        description.innerHTML = '<b>' + viewModel.name + '</b><br>' + viewModel.description;
        image.style.backgroundImage = 'url("images/product/img-' + imageIndex + '.png")';
      };
      ProductsView.prototype.slideDown = function slideDown() {
            var hgt = 25;
            interval = setInterval(function () {
                if (50 > hgt) {
                    hgt += 0.5;
                    price.style.height = hgt + "%";
                } else {
                    price.style.height = hgt + "%";
                    clearInterval(interval);
                }
            }, 25);
      } 
      var ProductsController = function ProductsController(productsView, productsModel) {
        this.productsView = productsView;
        this.productsModel = productsModel;
        this.productsModel.getProducts(this.productsView.index, this.onClickShowProduct.bind(this));
      };
      ProductsController.prototype.onClickShowProduct = function onClickShowProduct(productModelData) {
      this.productsView.slideDown();
      this.productsView.render(productModelData);
      };
      (function initialize() {
        var itemImg = Array.prototype.slice.call(document.querySelectorAll('.container .item-img'));
        var productsModel = new ProductsModel(XMLHttpRequest);
        for (var i = 0; i < itemImg.length; i++) {
            itemImg[i].onclick = function () {
               var productsView = new ProductsView(this,itemImg); 
               var controller = new ProductsController(productsView, productsModel);
            }
        }
      })();
      $('.notify-badge').arctext({
        radius: 300
    });
}, true);
