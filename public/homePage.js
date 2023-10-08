const logoutBtn = new LogoutButton();

logoutBtn.action = function () {
  ApiConnector.logout((callback) => {
    if (callback.success) {
      location.reload();
    }
  });
};

ApiConnector.current((callback) => {
  if (callback.success) {
    ProfileWidget.showProfile(callback.data);
  }
});

const rates = new RatesBoard();
function getRates() {
  ApiConnector.getStocks((callback) => {
    if (callback.success) {
      rates.clearTable();
      rates.fillTable(callback.data);
    }
  });
}

let timer = setInterval(() => getRates(), 6000);

const moneyManager = new MoneyManager();
moneyManager.addMoneyCallback = function (data) {
  ApiConnector.addMoney(data, (callback) => {
    if (callback.success) {
      ProfileWidget.showProfile(callback.data);
    } else {
      moneyManager.setMessage(callback.success, callback.error);
    }
  });
};

moneyManager.conversionMoneyCallback = function (data) {
  ApiConnector.convertMoney(data, (callback) => {
    if (callback.success) {
      ProfileWidget.showProfile(callback.data);
    } else {
      moneyManager.setMessage(callback.success, callback.error);
    }
  });
};
