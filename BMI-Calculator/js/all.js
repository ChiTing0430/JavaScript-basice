// 指定 DOM
var btn = document.querySelector('.btn');
var list = document.querySelector('.list');
var removeall = document.querySelector('.removeall');
var data = JSON.parse(localStorage.getItem('listData')) || [];
var color = '';


// 監聽 btn
btn.addEventListener('click', getBMI);
// 監聽刪除的 btn
list.addEventListener('click', removelist);
// 監聽刪除(清除全部)的 btn
removeall.addEventListener('click', removealldata);

updateList(data);

function getBMI(e) {
    e.preventDefault();
    //計算 BMI 值
    var height_number = document.querySelector('#height').value;
    var weightdata = document.querySelector('#weight').value;
    var heightdata = Math.pow(height_number / 100, 2);
    var BMIdata = weightdata / heightdata;
    // 取小數點後兩位
    BMIdata = BMIdata.toFixed(2);
    // 確認 BMI 值
    console.log('BMI值:' + BMIdata);
    //判斷 text 欄位是否有值
    if (height_number == '' || weightdata == '' || height_number <= 0 || weightdata <= 0) {
        alert('請輸入正確數值');
        return
    }
    //判斷 Category && show color
    if (BMIdata < 18.5) {
        Category = '過輕',
            color = '#31BAF9'
    } else if (BMIdata >= 18.5 && BMIdata < 24) {
        Category = '理想',
            color = '#86D73F'
    } else if (BMIdata >= 24 && BMIdata < 27) {
        Category = '過重',
            color = '#FF982D'
    } else if (BMIdata >= 27 && BMIdata < 30) {
        Category = '輕度肥胖',
            color = '#FF6C02'
    } else if (BMIdata >= 30 && BMIdata < 35) {
        Category = '中度肥胖',
            color = '#FF6C02'
    } else if (BMIdata >= 35) {
        Category = '重度肥胖',
            color = '#FF1200'
    };
    console.log('狀態:' + Category);
    console.log(color);
    //有值後存進localStorage且更新data
    var todo = {
        BMInumber: BMIdata,
        weight: weightdata,
        height: height_number,
        color: color,
        Category: Category,
    };
    data.push(todo);
    updateList(data);
    localStorage.setItem('listData', JSON.stringify(data));
}
// 更新 main 頁面
function updateList(items) {
    var str = '';
    var len = items.length;
    // 抓取今天日期
    var today = new Date();
    // 以下為更新再 main 頁面上
    for (var i = 0; len > i; i++) {
        str += '<li style="border-left:10px ' + items[i].color + ' solid;"><span class="Category">' + items[i].Category + '</span><span class="BMInumber">BMI :' + items[i].BMInumber + '</span><span class="weight">Weight :' + items[i].weight + '</span><span class="height">Height :' + items[i].height + '</span><span class="today">' + today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate() + '</span><a href="#" ><i class="far fa-trash-alt" data-index=' + i + '></i></a></li>';
    }
    list.innerHTML = str;
}

// 點擊 Icons 後,移除該列的資訊
function removelist(e) {
    e.preventDefault();
    var click = e.target.nodeName;
    if (e.target.nodeName !== 'I') {
        return
    };
    var index = e.target.dataset.index;
    data.splice(index, 1);
    updateList(data);
    localStorage.setItem('listData', JSON.stringify(data));
}
// 點擊後清除所有紀錄
function removealldata(e) {
    e.preventDefault();
    var click = e.target.nodeName;
    if (e.target.nodeName !== 'A') {
        return
    };
    // 從索引 0 的位置開始
    // 長度為data.length
    data.splice(0, data.length);
    updateList(data);
    localStorage.setItem('listData', JSON.stringify(data));
}