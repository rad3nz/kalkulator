// key untuk mengakses dan menyimpan data pada localStorage
const CACHE_KEY = "calculation_history";

// gunakan di dalam if statement setiap fungsi transaksi pada localStorage
function checkForStorage() {
    return typeof(Storage) !== "undefined"
}

// fungsi untuk menyimpan data riwayat kalkulasi pada localStorage
function putHistory(data) {
    if (checkForStorage()) {
        let historyData = null;
        if (localStorage.getItem(CACHE_KEY) === null) {
            historyData == [];
        } else {
            // JSON.parse -> Mengubah nilai objek dalam bentuk string menjadi objek lagi
            historyData = JSON.parse(localStorage.getItem(CACHE_KEY));
        }
        /* unshift -> digunakan untuk menambahkan nilai baru pada array yang ditempatkan pada awal index
         juga mengembalikan nilai panjang array setelah ditambahkan dengan nilai baru */
        historyData.unshift(data);

        if (historyData.length > 5) {
            /* pop -> fungsi untuk menghapus nilai index terakhir pada array, 
            sehingga ukuran array historyData tidak akan pernah lebih dari 5 */
            historyData.pop();
        }
        // JSON.stringify -> mengubah objek menjadi bentuk String
        localStorage.setItem(CACHE_KEY, JSON.stringify(historyData));
    }
}

/* Fungsi ini mengembalikan nilai array dari localStorage jika sudah memiliki 
nilai sebelumnya melalui JSON.parse() */
function showHistory() {
    if (checkForStorage()) {
        return JSON.parse(localStorage.getItem(CACHE_KEY)) || [];
    } else {
        return [];
    }
}


function renderHistory() {
    const historyData = showHistory()
    let historyList = document.querySelector("#historyList");

    // selalu hapus konten HTML pada elemen historyList agar tidak menampilkan data ganda
    historyList.innerHTML = "";

    for (let history of historyData) {
        let row = document.createElement('tr');
        row.innerHTML = "<td>" + history.firstNumber + "</td>";
        row.innerHTML += "<td>" + history.operator + "</td>";
        row.innerHTML += "<td>" + history.secondNumber + "</td>";
        row.innerHTML += "<td>" + history.result + "</td>";

        historyList.appendChild(row);
    }
}

renderHistory();