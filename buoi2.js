async function logData() {
    const response = await fetch(
        "https://svc-0-staging-usf.hotyon.com/search?q=&apiKey=1fedccb4-262f-4e65-ae6d-d01e8024fe83"
    );
    const data = await response.json();

    //Bài 1
    let variant = data.data.items[0].variants[0];
    const maxPriceItem = data.data.items.reduce((maxItem, currentItem) => {
        const maxVariantInMaxItem = maxItem.variants.reduce((max, variant) => variant.price > max.price ? variant : max, maxItem.variants[0]);
        const maxVariantInCurrentItem = currentItem.variants.reduce((max, variant) => variant.price > max.price ? variant : max, currentItem.variants[0]);

        if (maxVariantInMaxItem.price < maxVariantInCurrentItem.price) {
            variant = maxVariantInCurrentItem;
            return currentItem;
        } else {
            variant = maxVariantInMaxItem;
            return maxItem;
        }
    }, data.data.items[0]);

    console.log(maxPriceItem.title);
    console.log("Price: $" + variant.price, "USD");
    variant.options.forEach(option => {
        option.values.forEach(value => {
            console.log(option.name + ": " + value);
        });
    });

    //Bài 2
    function findTestbundle(item) {
        return item.title === 'Test bundle';
    }

    let testbundleItem = data.data.items.find(findTestbundle);

    if (testbundleItem) {
        let sumTestbundle = testbundleItem.variants.reduce((accumulator, variant) => {
            return accumulator + variant.price;
        }, 0);
        console.log('SumTestbundle: ', sumTestbundle);
    }

    //Bài 3
    const soldOutItems = data.data.items.filter(item =>
        item.variants.every(variant => variant.available === 0)
    );

    console.log('Sold out items:', soldOutItems);

    //Bài 4
    function bai4() {
        const btn = document.querySelector('.bai4 button');
        const input = document.querySelector('.bai4 input');
        let result = document.querySelector('.bai4 .result');
        btn.addEventListener('click', function () {
            const value = input.value.trim(); // Loại bỏ khoảng trắng ở đầu và cuối chuỗi
            if (!value.includes(' | ')) {
                result.innerHTML = 'Định dạng đầu vào không hợp lệ. Sử dụng OPTION_NAME | OPTION_VALUE';
                return;
            }
            const [optionName, optionValue] = value.split(' | ').map(s => s.trim());
            const filteredItems = data.data.items.filter(item =>
                item.variants.some(variant =>
                    variant.options.some(option =>
                        option.name === optionName && option.values.includes(optionValue)
                    )
                )
            );
            result.innerHTML = '';
            if (filteredItems.length > 0) {
                filteredItems.forEach(item => {
                    const itemTitle = document.createElement('h3');
                    itemTitle.textContent = `Sản phẩm: ${item.title}`;
                    result.appendChild(itemTitle);
                    item.variants.forEach(variant => {
                        if (variant.options.some(option => option.name === optionName && option.values.includes(optionValue))) {
                            const variantInfo = document.createElement('p');
                            const optionDetails = variant.options.map(option => `${option.name}: ${option.values.join(', ')}`).join(' | ');
                            variantInfo.textContent = `${optionDetails} | Giá: $${variant.price} USD`;
                            result.appendChild(variantInfo);
                        }
                    });
                });
            } else {
                result.innerHTML = 'Không có sản phẩm nào phù hợp.';
            }
        });
    }

    bai4();

    function bai5() {
        const btn = document.querySelector('.bai5 button');
        const minPriceInput = document.querySelector('#minPrice');
        const maxPriceInput = document.querySelector('#maxPrice');
        let result = document.querySelector('.bai5 .result');

        btn.addEventListener('click', function () {
            const minPrice = parseFloat(minPriceInput.value);
            const maxPrice = parseFloat(maxPriceInput.value);
            console.log('Min Price:', minPrice);
            console.log('Max Price:', maxPrice);
            if (isNaN(minPrice) || isNaN(maxPrice) || minPrice > maxPrice) {
                result.innerHTML = ' ';
                return;
            }
            const filteredItems = data.data.items.filter(item =>
                item.variants.some(variant =>
                    variant.price >= minPrice && variant.price <= maxPrice
                )
            );
            result.innerHTML = '';
            if (filteredItems.length > 0) {
                filteredItems.forEach(item => {
                    const itemTitle = document.createElement('h3');
                    itemTitle.textContent = `Sản phẩm: ${item.title}`;
                    result.appendChild(itemTitle);

                    item.variants.forEach(variant => {
                        if (variant.price >= minPrice && variant.price <= maxPrice) {
                            const variantInfo = document.createElement('p');
                            const optionDetails = variant.options.map(option => `${option.name}: ${option.values.join(', ')}`).join(' | ');
                            variantInfo.textContent = `${optionDetails} | Price: $${variant.price} USD`;
                            result.appendChild(variantInfo);
                        }
                    });
                });
            } else {
                result.innerHTML = 'No items match your price range.';
            }
        });
    }

    bai5();
}

document.addEventListener('DOMContentLoaded', logData);
