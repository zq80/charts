document.getElementById('fileInput').addEventListener('change', handleFile, false);
function handleFile(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const data = e.target.result;
            // 这里可以使用SheetJS库来解析Excel文件
            const workbook = XLSX.read(data, {type: 'binary'});
            // 处理workbook对象
            const firstSheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheetName];
            const jsonData = XLSX.utils.sheet_to_json(worksheet, {header: 1});
            handleJson(jsonData)
            // console.log(jsonData);
        };
        reader.readAsBinaryString(file);
    } else {
        console.error("No file selected");
    }
}

function  handleJson(jsonObject){
    for (var key in jsonObject) {
        if (jsonObject.hasOwnProperty(key)) { // 确保属性是对象自身的，而不是从原型链继承的
            console.log(key + ": " + jsonObject[key]);
            for (var key1 in jsonObject[key]){
                if(key1==='0'){
                    formatDate(jsonObject[key][key1],'-')
                }
                console.log('   '+key1 + ": " + jsonObject[key][key1]);
            }
        }
    }
}

//numb 浮点数
// format 间隔字符
//eg: formatDate(3.13,"-")
function formatDate(numb, format) {
    if(typeof(numb)==='number'){
        const time = new Date((numb - 1) * 24 * 3600000 + 1);
        time.setYear(time.getFullYear() - 70);
        time.setHours(time.getHours() - 8);
        const year = time.getFullYear() + '';
        const month = time.getMonth() + 1 + '';
        const date = time.getDate() - 1 + '';
        const hours = time.getHours().toLocaleString();
        const minutes = time.getMinutes();
        const seconds=time.getSeconds().toLocaleString();
        if (format && format.length === 1) {
            return year + format + (month < 10 ? '0' + month : month) + format + (date < 10 ? '0' + date : date) + ' ' + (hours < 10 ? '0' + hours : hours) + ':' + (minutes < 10 ? '0' + minutes : minutes)+':'+(seconds < 10 ? '0' + seconds : seconds);
        }
        return year + (month < 10 ? '0' + month : month) + (date < 10 ? '0' + date : date)+ (hours < 10 ? '0' + hours : hours)+ (minutes < 10 ? '0' + minutes : minutes)+ (seconds < 10 ? '0' + seconds : seconds);
    }

}

