// 指定 DOM
var btn = document.querySelector('.btn');
var list = document.querySelector('.list');
var data = JSON.parse(localStorage.getItem('listData')) || [];

// 監聽btn
btn.addEventListener('click', getBMI);
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
    console.log(BMIdata);
    //判斷 text 欄位是否有值
    if (height_number == '' || weightdata == '' || height_number <= 0 || weightdata <= 0) {
        alert('請輸入正確數值');
        return
    }
    //判斷 Category && show color
    if (BMIdata < 18.5) {
        Category = '過輕',
            color = 'blue'
    } else if (BMIdata >= 18.5 && BMIdata < 24) {
        Category = '理想',
            color = 'green'
    } else if (BMIdata >= 24 && BMIdata < 27) {
        Category = '過重',
            color = 'orange'
    } else if (BMIdata >= 27 && BMIdata < 30) {
        Category = '輕度肥胖',
            color = 'orange'
    } else if (BMIdata >= 30 && BMIdata < 35) {
        Category = '中度肥胖',
            color = 'orange'
    } else if (BMIdata >= 35) {
        Category = '重度肥胖',
            color = 'red'
    };
    console.log(Category);
    console.log(color);
    //有值後存進localStorage且更新data
    var todo = {
        BMInumber: BMIdata,
        weight: weightdata,
        height: height_number,
    };
    data.push(todo);
    updateList(data);
    localStorage.setItem('listData', JSON.stringify(data));
}
// 更新 main 頁面
function updateList(items) {
    var str = '';
    var len = items.length;
    for (var i = 0; len > i; i++) {
        str += '<li><span>' + items[i].BMInumber + items[i].weight + items[i].height + '</span></li>';
    }
    list.innerHTML = str;
}