async function logData(){
    const response = await fetch(
        "https://svc-0-staging-usf.hotyon.com/search?q=&apiKey=1fedccb4-262f-4e65-ae6d-d01e8024fe83"
    );
    //Bài 1
    const data = await response.json();

    let variant = data.data.items[0].variants[0];

    const sumWithInitial = data.data.items.reduce(
        (initialValue, currentValue) => {
        const maxVariantsinit = initialValue.variants.reduce(
            (price, currentPrice) => {
                return price.price > currentPrice.price ? price : currentPrice;
            }, initialValue.variants[0]);
        const maxVariantValue = currentValue.variants.reduce(
            (price, currentPrice) => {
                return price.price > currentPrice.price ? price : currentPrice;
            }, currentValue.variants[0]);
        if(maxVariantsinit.price < maxVariantValue.price){
            variant = maxVariantValue;
            return currentValue;
            }
        else{
            variant = maxVariantsinit;
            return initialValue;
            }
        }, data.data.items[0]);

    console.log(sumWithInitial.title);
    console.log("Price: $" + variant.price, "USD");
    variant.options.forEach(option => {
        option.values.forEach(value => {
            console.log(option.name + value)
        })
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
}
logData()