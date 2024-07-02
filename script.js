let balanceDb = [{ provider: "starlink", amount: 0 }];

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
    console.log(pin.length);
    ourPin.innerText = pin;
    return;
  }
  alert("Pick a network provider and amount of your choice");
}

function load() {
  let isProivder = false;
  let providerAmount = Number(amount.value);
  if (
    voucherInput.value.startsWith("*311*") &&
    voucherInput.value.endsWith("#") &&
    voucherInput.value.includes(ourPin.innerText) &&
    voucherInput.value.length === 16
  ) {
    balanceDb.forEach((db, index) => {
      if (balanceDb[index].provider === provider.value) {
        balanceDb[index].amount += Number(amount.value);
        providerAmount = balanceDb[index].amount;
        isProivder = true;
      }
    });
  }
  if (isProivder) {
    providerHeader.innerText = `${provider.value}!`;
    amountRecharged.innerText = amount.value;
    successMessage.style.visibility = "visible";
    balance.innerText = `₦${providerAmount}`;
  } else {
    providerHeader.innerText = `${provider.value}!`;
    amountRecharged.innerText = amount.value;
    successMessage.style.visibility = "visible";
    balance.innerText = `₦${providerAmount}`;
    balanceDb.push({
      provider: provider.value,
      amount: Number(amount.value),
    });
  }
  console.log(balanceDb);
}
