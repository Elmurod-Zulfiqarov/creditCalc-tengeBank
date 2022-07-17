// credit forms
let form = {
  annuitet: {
    id: 1,
    type: "annuitet",
    choice: false,
  },
  diffirent: {
    id: 2,
    type: "diffirent",
    choice: false,
  },
};

let credit = {
  present1: {
    id: 1,
    value: 25.9,
    choice: false,
  },
  present2: {
    id: 2,
    value: 24.9,
    choice: false,
  },
  present3: {
    id: 3,
    value: 24.5,
    choice: false,
  },
};

function annuitetForm() {
  let annuitet = document.getElementById("annuitet").value;
  if (annuitet == "annuitetForm") {
    form.annuitet.choice = true;
    form.diffirent.choice = false;
  }
}

function diffirentForm() {
  let diffirent = document.getElementById("diffirent").value;
  if (diffirent == "diffirentForm") {
    form.diffirent.choice = true;
    form.annuitet.choice = false;
  }
}

//  Boshlang'ich Foiz to'lovlarni miqdorini aniqlash funsiyalari

function creditPresent1() {
  let presentAmount1 = document.getElementById("presentAmount1").value;
  if (presentAmount1 == "option1") {
    credit.present1.choice = true;
    credit.present2.choice = false;
    credit.present3.choice = false;
  }
}

function creditPresent2() {
  let presentAmount2 = document.getElementById("presentAmount2").value;
  if (presentAmount2 == "option2") {
    credit.present1.choice = false;
    credit.present2.choice = true;
    credit.present3.choice = false;
  }
}

function creditPresent3() {
  let presentAmount3 = document.getElementById("presentAmount3").value;
  if (presentAmount3 == "option3") {
    credit.present1.choice = false;
    credit.present2.choice = false;
    credit.present3.choice = true;
  }
}

// Credit Calc function
let present, creditSum, creditDeadline;

function creditCalc() {
  // credit Sums
  creditSum = document.getElementById("creditSum").value;
  creditSum = Number(creditSum);
  if (creditSum > 400000000) {
    creditSum = 400000000;
  } else if (creditSum < 5000000) {
    creditSum = 5000000;
  }

  // credit Deadline
  creditDeadline = document.getElementById("creditDeadline").value;
  creditDeadline = Number(creditDeadline);
  if (creditDeadline > 48) {
    creditDeadline = 48;
  } else if (creditDeadline < 1) {
    creditDeadline = 1;
  }
  document.getElementById("sumAll").innerHTML = creditSum;
  document.getElementById("monthLimit").innerHTML = creditDeadline;

  // presents choice
  if (credit.present1.choice) {
    present = credit.present1.value;
  } else if (credit.present2.choice) {
    present = credit.present2.value;
  } else if (credit.present3.choice) {
    present = credit.present3.value;
  }

  // form choice
  if (form.annuitet.choice) {
    let monthPresent = present / 100 / 12;
    let monthSum =
      creditSum *
      (monthPresent +
        monthPresent / (Math.pow(monthPresent + 1, creditDeadline) - 1));
    let content = " ";
    let allSum = 0,
      allPresent = 0;
    for (let i = 1; i <= creditDeadline; i++) {
      let monthPresentFee = creditSum * monthPresent;
      let mainDebtFee = monthSum - monthPresentFee;
      let mainDebtMod = creditSum - mainDebtFee;
      if (i == creditDeadline) {
        mainDebtMod = 0;
      }
      content +=
        "<tr>" +
        "<td class='px-3'>" +
        i +
        "</td>" +
        "<td class='px-3'>" +
        mainDebtMod +
        "</td>" +
        "<td class='px-3'>" +
        mainDebtFee +
        "</td>" +
        "<td class='px-3'>" +
        monthPresentFee +
        "</td>" +
        "<td class='px-3'>" +
        monthSum +
        "</td>" +
        "</tr>";

      creditSum = mainDebtMod;
      allPresent += monthPresentFee;
      allSum += monthSum;
      if (i == 1) {
        document.querySelector(".monthFee").innerText = monthSum;
      }
    }

    document.getElementById("result").innerHTML = content;
    document.querySelector(".allCreditAmount").innerText = allSum;
    document.querySelector(".allPresentFee").innerText = allPresent;
    document.querySelector(".presentCurrent").innerText = present;
    // console.log(`Asosiy qarzning qoldig'i: ${mainDebtMod},\n Asosiy qarz bo'yicha to'lov: ${mainDebtFee},\n
    // Foizlarni to'lash: ${monthPresentFee},\n To'lovning umumiy miqdori: ${monthSum}`);
  } else if (form.diffirent.choice) {
    let monthPresent = creditSum / creditDeadline;

    let content = " ";
    let allSum = 0,
      allPresent = 0;

    for (let i = 1; i <= creditDeadline; i++) {
      let mainDebtMod = creditSum - monthPresent;
      let monthPresentFee = creditSum * (present / 100 / 12);
      let monthSum = monthPresent + monthPresentFee;
      if (i == creditDeadline) {
        mainDebtMod = 0;
      }

      content +=
        "<tr>" +
        "<td class='px-3'>" +
        i +
        "</td>" +
        "<td class='px-3'>" +
        mainDebtMod +
        "</td>" +
        "<td class='px-3'>" +
        monthPresent +
        "</td>" +
        "<td class='px-3'>" +
        monthPresentFee +
        "</td>" +
        "<td class='px-3'>" +
        monthSum +
        "</td>" +
        "</tr>";

      creditSum = mainDebtMod;
      allPresent += monthPresentFee;
      allSum += monthSum;
      if (i == 1) {
        document.querySelector(".monthFee").innerText = monthSum;
      }
      // console.log(`Asosiy qarzning qoldig'i: ${mainDebtMod}, Asosiy qarz bo'yicha to'lov: ${monthPresent},
      // Foizlarni to'lash: ${monthPresentFee}, To'lovning umumiy miqdori: ${monthSum}`);
    }
    document.getElementById("result").innerHTML = content;
    document.querySelector(".allCreditAmount").innerText = allSum;
    document.querySelector(".allPresentFee").innerText = allPresent;
    document.querySelector(".presentCurrent").innerText = present;
  }
}
