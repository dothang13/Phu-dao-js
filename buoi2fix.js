const app = (

    API_URL: 'https://svc-0-staging-usf.hotyon.com/search?q=&apiKey=1fedccb4-262f-4e65-ae6d-d01e8024fe83';

    async fetchData(){
        const response = await.fetch(this.API_URL);
        const{ data } = await response.json();
        return data;
    }

    async getMostExpensiveProduct(){
        const data = await app.fetchData();
        console.log(data)
        let maxProduct = data.items[0];
        let maxVariant = data.items[0];

        data.items.forEach(product => {
            product.variants.forEach(variant =>{
                if(maxVariant && variant.price > maxVariant.price){
                    maxProduct = product;
                    maxVariant = variant;
                }
            })
        })

        return
            <h2>$(maxProduct.title)</h2>
            <p>Price: $(data.currency.longFormat.replace('{0}', maxVariant.price))</p>
            <div>Option:</div>
            ${
                maxVariant.options.map(option => {
                    return <p>${index}: ${options}</p>
                })
                .join(' ')
            }
    },

    async bai1(){
        const button = document.querySelector('.button-1');
        const result  = document.querySelector('.result');
        button.addEventListener('click', async function(){
            result.innerHTML = await callback;
        })
    },

    bai1(){
        app.handleEvent('.button-1')
    },
    //Bai 2
    async get
    bai2(){
        app.handleEvent('.button-2')
    },
    bai3(){
        app.handleEvent('.button-3')
    },

    init{}{
        app.bai1();
    )
    }   
app.init{}