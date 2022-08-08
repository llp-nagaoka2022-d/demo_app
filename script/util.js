//共通パーツ読み込み
$(function () {
    $("#header").load("header.html");
    $("#footer").load("footer.html");
});

// クエリパラメータの取得
var paraGety = function paraGety(para) {
    var pageURL = window.location.search.substring(1),
        urlValue = pageURL.split('&'), paraName;
    for (var i = 0; i < urlValue.length; i++) {
        paraName = urlValue[i].split('=');
        if (paraName[0] === para) {
            return paraName[1] === undefined ? true : decodeURIComponent(paraName[1]);
        }
    }
};

// クエリパラメータをセットする
// 負の値を入力すると現状を保持する
function setQuery(company_id, applied) {
    if (company_id < 0) {
        company_id = paraGety('company');
        if (company_id === undefined)
            company_id = 0;
    }

    if (applied < 0) {
        applied = paraGety('applied');
        if (applied === undefined)
            applied = 0;
    }

    $('a').each(function () {
        var raw_url = $(this).attr('href').replace(/\?.*$/, "");
        var new_url = raw_url + "?company=" + company_id + "&applied=" + applied
        $(this).attr("href", new_url);
    });
}

// 各パラメーターの値を変数に格納
var company_id = paraGety('company');
var student_id = paraGety('students');

// 各種条件の書き込み
if (company_id !== undefined) {
    $.getJSON("./../database/companies.json", function (json) {
        $("#company-name").text(json.datas[company_id].company_name);
        $("#job-title").text(json.datas[company_id].job_title);
        $("#employment-status").text(json.datas[company_id].employment_status);
        $("#working-times").text(json.datas[company_id].working_times);
        $("#place").text(json.datas[company_id].place);
        $("#conditions").text(json.datas[company_id].conditions);
        $("#salary").text(json.datas[company_id].salary);
        $("#discriptions").text(json.datas[company_id].discriptions);
    });
}

if (student_id !== undefined) {
    $.getJSON("./../database/students.json", function (json) {
        $("#student-name").text(json.datas[student_id].name);
        $("#skil-summary").text(json.datas[student_id].skil_summary);
        $("#adress").text(json.datas[student_id].adress);
        $("#school").text(json.datas[student_id].school);
        $("#skil-discription").text(json.datas[student_id].skil_discription);
    });
}
