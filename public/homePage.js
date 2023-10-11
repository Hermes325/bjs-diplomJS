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

moneyManager.sendMoneyCallback = function (data) {
  ApiConnector.transferMoney(data, (callback) => {
    if (callback.success) {
      ProfileWidget.showProfile(callback.data);
    } else {
      moneyManager.setMessage(callback.success, callback.error);
    }
  });
};

const favoritesWidget = new FavoritesWidget();
ApiConnector.getFavorites((callback) => {
  if (callback.success) {
    favoritesWidget.clearTable();
    favoritesWidget.fillTable(callback.data);
    favoritesWidget.updateUsersList(callback.data);
  }
});

favoritesWidget.addUserCallback = function (data) {
  ApiConnector.addUserToFavorites(data, (callback) => {
    if (callback.success) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(callback.data);
      favoritesWidget.updateUsersList(callback.data);
    } else {
      favoritesWidget.setMessage(callback.success, callback.error);
    }
  });
};

favoritesWidget.removeUserCallback=function(data){
  ApiConnector.removeUserFromFavorites(data, (callback) => {
    if (callback.success) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(callback.data);
      favoritesWidget.updateUsersList(callback.data);
    } else {
      favoritesWidget.setMessage(callback.success, callback.error);
    }
  });
}
