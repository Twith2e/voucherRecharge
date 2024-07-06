let balanceDb = [
  { provider: "mtn", amount: 0 },
  { provider: "9mobile", amount: 0 },
  { provider: "glo", amount: 0 },
  { provider: "airtel", amount: 0 },
];
let usedVoucher = [];
const pinRegex = /^\*311\*\d{10}#$/;

function inputAmount(button) {
  amount.value = button.value;
}
function generate() {
  let pin = "";
  if (provider.value !== "" && amount.value !== "") {
    for (let index = 0; index < 10; index++) {
      let random = Math.floor(Math.random() * 10);
      pin += random;
    }
    ourPin.innerText = pin;
    return;
  }
  alert("Pick a network provider and amount of your choice");
}

function load() {
  let providerIndex = 0;
  let newBalance = 0;
  if (
    pinRegex.test(voucherInput.value) &&
    voucherInput.value.includes(ourPin.innerText)
  ) {
    balanceDb.forEach((match, index) => {
      if (provider.value === match.provider) {
        providerIndex = index;
        return;
      }
    });
    let found = usedVoucher.find((match) => match === ourPin.innerText);
    if (found === ourPin.innerText) {
      alert("Voucher is already used");
    } else {
      balanceDb[providerIndex].amount += Number(amount.value);

      successMessage.style.visibility = "visible";
      providerHeader.innerText = balanceDb[providerIndex].provider;
      amountRecharged.innerText = amount.value;
      balance.innerText = balanceDb[providerIndex].amount;
      successMessage.style.color = "white";
      if (provider.value === "mtn") {
        successMessage.style.backgroundColor = "yellow";
        successMessage.style.color = "brown";
      } else if (provider.value === "9mobile") {
        successMessage.style.backgroundColor = "yellowGreen";
      } else if (provider.value === "airtel") {
        successMessage.style.backgroundColor = "red";
      } else {
        successMessage.style.backgroundColor = "green";
      }
      usedVoucher.push(ourPin.innerText);
    }
  } else {
    alert("Invalid input!");
  }
}

// function load() {
//   let isProivder = false;
//   let providerAmount = Number(amount.value);
//   if (
//     voucherInput.value.startsWith("*311*") &&
//     voucherInput.value.endsWith("#") &&
//     voucherInput.value.includes(ourPin.innerText) &&
//     voucherInput.value.length === 16
//   ) {
//     if (balanceDb.length === 0 || isProivder === false) {
//       providerHeader.innerText = `${provider.value}!`;
//       amountRecharged.innerText = amount.value;
//       successMessage.style.visibility = "visible";
//       balance.innerText = `₦${providerAmount}`;
//       isProivder = true;
//     } else {
//       balanceDb.forEach((db, index) => {
//         if (balanceDb[index].provider === provider.value) {
//           balanceDb[index].amount += Number(amount.value);
//           providerAmount = balanceDb[index].amount;
//           isProivder = true;
//         }
//       });
//       providerHeader.innerText = `${provider.value}!`;
//       amountRecharged.innerText = amount.value;
//       successMessage.style.visibility = "visible";
//       balance.innerText = `₦${providerAmount}`;
//     }
//   }
// }
