//Bài 1. Viết chương trình kiểm tra xem một chuỗi số nguyên đã cho có chuỗi chữ số tăng hay không
function bai1(){
    const btn = document.querySelector('.bai1 button');
    const input = document.querySelector('.bai1 input');

    let value;
    let result = document.querySelector('.bai1 .result');
    btn.addEventListener('click', function (){
        value = intIncrease(input.value);
        console.log(value);
        result.innerText = value;
    })
}

function intIncrease(str){
    let number = str.split(',');
    number = number.map(element => parseInt(element));
    
    for(let i = 0; i < number.length - 1; i++){
        if(number[i] >= number[i + 1]) return false;
    }
    return true;
}

bai1();

function bai2() {
    const btn = document.querySelector('.bai2 button');
    const input = document.querySelector('.bai2 input');
    let result = document.querySelector('.bai2 .result');

    btn.addEventListener('click', function() {
        const inputArray = input.value.split(',').map(Number);
        const mostFrequentNumber = findMostFrequentNumber(inputArray);
        console.log(mostFrequentNumber);
        result.innerText = mostFrequentNumber;
    });
}

function findMostFrequentNumber(arr) {
    const frequency = {};
    let maxCount = 0;
    let mostFrequentNumber = null;

    for (let num of arr) {
        frequency[num] = (frequency[num] || 0) + 1;
        if (frequency[num] > maxCount) {
            maxCount = frequency[num];
            mostFrequentNumber = num;
        }
    }

    return mostFrequentNumber;
}

bai2();

function bai3() {
    const btn = document.querySelector('.bai3 button');
    const input = document.querySelector('.bai3 input');
    let result = document.querySelector('.bai3 .result');

    btn.addEventListener('click', function() {
        const inputArray = input.value.split(',').map(Number);
        const uniqueArray = deleteAgainIteam(inputArray);
        console.log(uniqueArray);
        result.innerText = uniqueArray.join(', ');
    });
}

function deleteAgainIteam(arr) {
    return Array.from(new Set(arr));
}

bai3();


function bai4(){
    const btn = document.querySelector('.bai4 button');
    const input = document.querySelector('.bai4 input');

    let value;
    let result = document.querySelector('.bai4 .result');
    btn.addEventListener('click', function (){
        value = findLongword(input.value);
        console.log(String(value));
        result.innerText = value;
    })
}

function findLongword(str){
    str = str.split(" ");
    let maxWord = str[0];
    for(var i = 1; i < str.length; i++){
        if(str[i].length > maxWord.length) maxWord = str[i];
    }
    return maxWord;
}


bai4();

function bai5(){
    const btn = document.querySelector('.bai5 button');
    const input = document.querySelector('.bai5 input');

    let value;
    let result = document.querySelector('.bai5 .result');
    btn.addEventListener('click', function (){
        value = findSecondLongestWord(input.value);
        console.log(String(value));
        result.innerText = value;
    })
}

function findSecondLongestWord(str) {
    const words = str.split(" ");
    console.log(str);
    if (words.length <= 1) {
        return false;
    }

    let maxWord = words[0];
    let secondMaxWord = words[0];
    
    for (let i = 0; i < words.length; i++) {
        const word = words[i];
        if (word.length > maxWord.length) {
            secondMaxWord = maxWord;
            maxWord = word;
        } else if (word.length > secondMaxWord.length && word !== maxWord) {
            secondMaxWord = word;
        }
    }
    
    return secondMaxWord || false;
}

bai5();

function bai6(){
    const btn = document.querySelector('.bai6 button');
    const input = document.querySelector('.bai6 input');

    let value;
    let result = document.querySelector('.bai6 .result');
    btn.addEventListener('click', function () {
        value = sumOfEvenNumbers(input.value);
        console.log(value);
        result.innerText = value;
    });
}

function sumOfEvenNumbers(str) {
    const numbers = str.split(",");
    console.log(numbers);
    if (numbers.length <= 1) {
        return false;
    }
    
    const sum = numbers
        map(element => parseInt(element))
        filter(number => number % 2 === 0)
        reduce((acc, curr) => acc + curr, 0);
    
    return sum;
}

bai6();

function bai7(){
    const btn = document.querySelector('.bai7 button');
    const input = document.querySelector('.bai7 input');

    let value;
    let result = document.querySelector('.bai7 .result');
    btn.addEventListener('click', function () {
        value = threemiddleWord(input.value);
        console.log(value);
        result.innerText = value;
    });
}

function threemiddleWord(str) {
    const words = str.split(" ");
    console.log(words);
    if (words.length !== 1) {
        return "Không hợp lệ"; 
    } else {
        const word = words[0];
        if (word.length % 2 === 0) {
            return "Không hợp lệ"; 
        } else {
            const middleIndex = Math.floor(word.length / 2);
            return word.slice(middleIndex - 1, middleIndex + 2); 
        }
    }
}

function bai7(){
    const btn = document.querySelector('.bai7 button');
    const input = document.querySelector('.bai7 input');

    let value;
    let result = document.querySelector('.bai7 .result');
    btn.addEventListener('click', function (){
        value = nextString(input.value);
        console.log(value);
        result.innerText = value;
    })
}

function nextString(str){
    let newStr = '';
    for(let i = 0; i < str.length; i++){
        newStr += String.fromCharCode(str.charCodeAt(i) + 1);
    }
    return newStr;
}

bai7();

bai8();

function bai8(){
    const btn = document.querySelector('.bai8 button');
    const input = document.querySelector('.bai8 input');

    let value;
    let result = document.querySelector('.bai8 .result');
    btn.addEventListener('click', function () {
        value = threemiddleWord(input.value);
        console.log(value);
        result.innerText = value;
    });
}

function threemiddleWord(str) {
    const words = str.split(" ");
    console.log(words);
    if (words.length !== 1) {
        return "Không hợp lệ"; 
    } else {
        const word = words[0];
        if (word.length % 2 === 0) {
            return "Không hợp lệ"; 
        } else {
            const middleIndex = Math.floor(word.length / 2);
            return word.slice(middleIndex - 1, middleIndex + 2); 
        }
    }
}

bai8();



