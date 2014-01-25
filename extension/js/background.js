// 変数の値は全て popup.js から受け取る

// 出産予定日を保存したかどうか判別するフラグ変数
// var saveFlag = "NO"; // 初期値はNO (NO = 保存してない / YES = 保存してある)
localStorage.saveFlag = "";

// 出産予定日を保存しておくための変数
localStorage.YYYY = "";
localStorage.MM = "";
localStorage.DD = "";
var DUEDATE = ""

// 出産予定日から計算した妊娠週＆日＆月数を格納するための変数
var PWeek = "";
var PDay = "";
var PMonth = "";
var PCountdownDays = "";
var PWeekDay = ""; // バッヂ表示用

/////////////////////////////////
// BrouserAction アイコンのバッヂテキストを設定
/////////////////////////////////
var setBadge = function(){
	chrome.browserAction.setBadgeText({
		text:PWeekDay
	});
};

/////////////////////////////////
// 妊娠週数＆月数を出産予定日から計算する
/////////////////////////////////
var countPregnancyDate = function(YYYY, MM, DD){

	// 今日の日付をXDateオブジェクトとして格納
	var TODAY = new XDate();

	// 出産予定日の日付をXDateオブジェクトとして格納
	DUEDATE = new XDate(YYYY, MM - 1, DD);

	// 出産予定日から今日が妊娠何週何日かを計算
	// (出産予定日 - 今日) / 7 = 残り何週か
	// (出産予定日 - 今日) % 7 = 残り何日か
	// Math.ceil() で数字切り上げ
	var diffWeek = Math.ceil((Math.ceil(TODAY.diffDays(DUEDATE))) / 7);
	var diffDay = (Math.ceil(TODAY.diffDays(DUEDATE))) % 7;

	// 満期40週から差分を引くと現在の妊娠週数
	PWeek = 40 - diffWeek;
	PDay = 7 - diffDay;
	if (PDay == 7){PDay = 0;}; // 7日目とは数えないので7日の場合は0日と表記
	// (現在の週数 * 7) + 日数 を 28日 で割って数値を切り上げると現在の妊娠月数
	PMonth = Math.ceil((Number((PWeek * 7)) + Number(PDay)) / 28);
	PCountdownDays = Math.ceil(TODAY.diffDays(DUEDATE));
	PWeekDay = PWeek + "w" + PDay + "d";

	// // デバッグ
	// console.log("今日は " + TODAY.toString("yyyy/M/d"));
	// console.log("出産予定日は " + DUEDATE.toString("yyyy/M/d"));
	// console.log("妊娠週数は " + PWeek + "週" + PDay + "日");
	// console.log("出産予定日まであと " + Math.ceil(TODAY.diffDays(DUEDATE)) + " 日");
	// console.log("バッヂに表示するテキストは " + PWeek + "w" + PDay + "d");
}

if(localStorage.saveFlag == "YES"){
	countPregnancyDate();
}

setBadge();