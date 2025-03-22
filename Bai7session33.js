const products = [
    { id: 1, name: 'Điện thoại Samsung Galaxy A54', price: 7490000, image: 'https://cdn.tgdd.vn/Products/Images/42/335177/samsung-galaxy-a56-5g-green-thumb-600x600.jpg' },
    { id: 2, name: 'Laptop Dell Inspiron 15', price: 15990000, image: 'https://bizweb.dktcdn.net/100/446/400/products/laptop-dell-vostro-3490-1-gia-loc.jpg?v=1699258008053' },
    { id: 3, name: 'Tai nghe AirPods Pro', price: 4990000, image: 'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/airpods-pro-2-hero-select-202409_FMT_WHH?wid=750&hei=556&fmt=jpeg&qlt=90&.v=1724041668836' },
    { id: 4, name: 'Đồng hồ thông minh Apple Watch', price: 8990000, image: 'https://phukienxinxo.com/wp-content/uploads/2024/06/Dong-ho-thong-minh-Apple-Watch-Series-9-REP-1-1-45Mm-phien-ban-vo-thep-man-hinh-tran-vien-2.webp' },
    { id: 5, name: 'Máy ảnh Canon EOS M50', price: 12490000, image: 'https://cdn.vjshop.vn/may-anh/mirrorless/canon/canon-eos-r50/black-18-45/canon-eos-r50-lens-18-45mm-500x500.jpg' },
    { id: 6, name: 'Loa Bluetooth JBL Flip 5', price: 2190000, image: 'https://bizweb.dktcdn.net/100/445/498/products/jbl-go-4-3-4-left-black-48178-x1.jpg?v=1732646465910' },
    { id: 7, name: 'Bàn phím cơ Logitech G Pro', price: 2490000, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1MvD76Mt-Ne0IC2DPMMsTZpG05xDxJOzkqw&s' },
    {   id: 8,
        name: 'Chuột không dây Logitech MX Master', 
        price: 1890000, 
        image: 'https://product.hstatic.net/200000722513/product/h_mx_master_3_wireless__graphite_.jpg_1e5491e35f754dcc90b90582a9c3be95_ca0c63ca59de4ed1b4d46fcc5c81c1ed.png' }
];

let listProducts = document.getElementById("block1Mini");
let infoCart = document.querySelector(".infoCart");

products.forEach(element => {
    listProducts.innerHTML += `
        <div class="items">
            <img class="img" src="${element.image}" alt="">
            <p class="infoItem"><b>${element.name}</b></p>
            <p class="price">${element.price.toLocaleString('vi-VN')}đ</p>
            <button class="add" name="${element.id}">Thêm vào giỏ hàng</button>
        </div>`;
});

let addToCart = document.querySelectorAll('.add');
addToCart.forEach(button => {
    button.addEventListener("click", function() {
        let productId = parseInt(button.name);
        let element = products.find(p => p.id === productId);

        let checkProduct = infoCart.querySelector(`.addCart[data-id="${element.id}"]`);
        if (checkProduct) {
            let countElements = checkProduct.querySelectorAll(".count");
            let count = parseInt(countElements[0].textContent);
            count++;
            countElements.forEach(el => el.textContent = count);
            totalCart();
        } else {
            let newCartItem = document.createElement("div");
            newCartItem.className = 'addCart';
            newCartItem.dataset.id = element.id;
            newCartItem.innerHTML += `
                    <div class="infoBuy">
                        <b>${element.name}</b><br><div class="price2">${element.price.toLocaleString('vi-VN')}đ x <span class="count">1</span></div>
                    </div>
                    <div class="buttonList">
                        <button class="decrease">-</button><span class="count">1</span><button class="increase">+</button><button class="delete" id="${element.id}">x</button>
                    </div>`;
            infoCart.appendChild(newCartItem);
            totalCart();

            let decrease = newCartItem.querySelector(".decrease");
            let increase = newCartItem.querySelector(".increase");
            let deleteBtn = newCartItem.querySelector(".delete");

            decrease.addEventListener("click",function(){
                let countElements = newCartItem.querySelectorAll(".count");
                let count = parseInt(countElements[0].textContent);
                if(count==1){
                    newCartItem.remove();
                    totalCart();
                } else {
                    count--;
                    countElements.forEach(el=>el.textContent=count);
                    totalCart();
                }
            });

            increase.addEventListener("click",function(){
                let countElements = newCartItem.querySelectorAll(".count");
                let count = parseInt(countElements[0].textContent);
                count++;
                countElements.forEach(el=>el.textContent=count);
                totalCart();
            });

            deleteBtn.addEventListener("click", function() {
                newCartItem.remove();
                totalCart();
            });
        }
    });
});

function totalCart(){
    let total = 0;
    let cartItems = infoCart.querySelectorAll(".addCart");
    cartItems.forEach(item => {
        let price = products.find(element => element.id === parseInt(item.dataset.id)).price;
        let count = parseInt(item.querySelector(".count").textContent);
        total += price * count;
    });
    document.querySelector(".total").innerHTML = `Tổng: <span id="sum">${total.toLocaleString('vi-VN')}</span>đ`;
    let empty = document.getElementById("empty");
    
    if(cartItems){
        empty.style.display ="none";
    } else{
        empty.style.display ="block";
    }
}

let pay = document.querySelector(".pay");
pay.addEventListener("click",function(){
    let total = document.getElementById("sum");
    if(total.textContent==0){
        alert(`Giỏ hàng của bạn đang trống`);
    } else {
        alert(`Cảm ơn bạn đã mua hàng\nTổng giá trị đơn hàng: ${total.textContent}đ`);
        total.textContent="0";
        infoCart.innerHTML=`<p id="empty">Giỏ hàng trống</p>`
    }
});