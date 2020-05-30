// 指定 DOM
var list = document.querySelector('.list');
var btnData = document.querySelector('.btn');
var data = JSON.parse(localStorage.getItem('listData')) || [];

// 監聽
btnData.addEventListener('click', addData);
updateList(data);

// 計算 BMI 值
function addData(e) {
    e.preventDefault();
    var height = document.querySelector('#height').value;
    var weight = document.querySelector('#weight').value;
    var txth = height / 100;
    var txtw = weight;
    txth *= txth;
    var txtsum = txtw / txth;
    txtsum = txtsum.toFixed(2);
    console.log(txtsum);
    var todo = {
        content: txtsum,
        weight: weight,
        height: height,
    };
    data.push(todo);
    updateList(data);
    localStorage.setItem('listData', JSON.stringify(data));
}

// 更新網頁
function updateList(items) {
    str = '';
    var len = items.length;
    for (var i = 0; len > i; i++) {
        str += '<li data-index=' + i + '><span>' + items[i].content + '</span></li>';
    }
    list.innerHTML = str;
}