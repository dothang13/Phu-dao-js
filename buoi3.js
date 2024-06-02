let productData = [];
document.getElementById('loadButton').addEventListener('click', async function() {
    const button = this;
    button.disabled = true;
    button.textContent = 'Đang tải sản phẩm…';

    try {
        const response = await fetch("https://svc-0-staging-usf.hotyon.com/search?q=&apiKey=1fedccb4-262f-4e65-ae6d-d01e8024fe83");
        productData = await response.json();
        const productCount = productData.length;
        button.textContent = `Đã tải xong ${productCount} sản phẩm`;
        document.getElementById('listButton1').style.display = 'inline-block';
        document.getElementById('inputFind').style.display = 'inline-block';
        document.getElementById('listButton2').style.display = 'inline-block';
    } catch (error) {
        button.textContent = 'Có lỗi xảy ra khi tải sản phẩm';
        console.error('Error fetching products:', error);
    } finally {
        button.disabled = false;
    }
});
document.getElementById('listButton1').addEventListener('click', function() {
    displayProductList(productData);
});
document.getElementById('listButton2').addEventListener('click', debounce(async function() {
    const searchQuery = document.getElementById('inputFind').value.trim();
    const productListDiv = document.getElementById('productList');
    productListDiv.innerHTML = '<p>Đang tìm kiếm…</p>';
    if (searchQuery === "") {
        productListDiv.innerHTML = '<p>Vui lòng nhập từ khóa tìm kiếm.</p>';
        return;
    }
    try {
        const response = await fetch(`https://svc-0-staging-usf.hotyon.com/search?apiKey=1fedccb4-262f-4e65-ae6d-d01e8024fe83&q=${encodeURIComponent(searchQuery)}`);
        const searchResults = await response.json();

        if (searchResults.length > 0) {
            displayProductList(searchResults);
        } else {
            productListDiv.innerHTML = '<p>Không có sản phẩm nào khớp với từ khoá cần tìm.</p>';
        }
    } catch (error) {
        productListDiv.innerHTML = '<p>Có lỗi xảy ra khi tìm kiếm sản phẩm.</p>';
        console.error('Error searching products:', error);
    }
}));

function displayProductList(products) {
    const productListDiv = document.getElementById('productList');
    productListDiv.innerHTML = '';
    products.forEach((product, index) => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        let selectedVariant = product.variants.find(variant => variant.discount > 0) || product.variants[0];
        let productInfo = `
            <h2>${index + 1}. ${product.name}</h2>
            <p>Size: ${product.options.size.join(', ')}</p>
            <p>Color: ${product.options.color.join(', ')}</p>
            <p>Price: ${selectedVariant.price}</p>
            ${selectedVariant.discount > 0 ? `<p>Discount: ${selectedVariant.discount}%</p>` : ''}
        `;
        productDiv.innerHTML = productInfo;
        productListDiv.appendChild(productDiv);
    });
}
function debounce(callback) {
    let timer;
    return function() {
        clearTimeout(timer);
        timer = setTimeout(() => {
            callback();
        }, 300);
    }
}
