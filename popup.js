document.getElementById('applyChanges').addEventListener('click', () => {
  const newTotalAssets = parseFloat(document.getElementById('totalAssets').value);
  const newMargin = parseFloat(document.getElementById('margin').value);

  // Получаем текущие значения на странице и выполняем изменения
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      func: updateValues,
      args: [newTotalAssets, newMargin]
    });
  });
});

function updateValues(newTotalAssets, newMargin) {
  function applyUpdates() {
    // Добавляем CSS-правила для предотвращения переноса текста и выравнивания элементов на одной строке
    const style = document.createElement('style');
    style.innerHTML = `
      .prettyCurrency {
        display: inline-flex;
        align-items: baseline;
        white-space: nowrap;
      }
    `;
    document.head.appendChild(style);

    // Обновляем значение Total Assets
    const totalAssetsElement = document.evaluate('/html/body/div[1]/div/section/main/div[1]/div[2]/div[2]/div[3]/div[2]/div[2]/span/span[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    if (totalAssetsElement) {
      totalAssetsElement.style.display = 'none';  // Скрываем элемент временно
      totalAssetsElement.textContent = `${newTotalAssets.toFixed(2)}`;  // Убираем лишний "USDT"
      totalAssetsElement.style.display = '';  // Возвращаем элемент
    }

    // Получаем текущее значение Margin
    const marginElement = document.evaluate('/html/body/div[1]/div/section/main/div[1]/div[2]/div[1]/div/div[4]/section/div/div[2]/section/div/div/div/div[2]/div/div/div[6]/div/span/span[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    const currentMargin = parseFloat(marginElement.textContent.replace(' USDT', ''));

    // Рассчитываем пропорцию изменения Margin
    const marginRatio = newMargin / currentMargin;

    // Обновляем значение Margin
    marginElement.style.display = 'none';  // Скрываем элемент временно
    marginElement.textContent = `${newMargin.toFixed(2)}`;
    marginElement.style.display = '';  // Возвращаем элемент

    // Обновляем значение Unrealized PNL на основании пропорции
    const pnlElement = document.evaluate('/html/body/div[1]/div/section/main/div[1]/div[2]/div[1]/div/div[4]/section/div/div[2]/section/div/div/div/div[2]/div/div/div[7]/div/span[1]/div/span/span[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    const currentPNL = parseFloat(pnlElement.textContent.replace(' USDT', ''));
    const newPNL = (currentPNL * marginRatio).toFixed(2);
    pnlElement.style.display = 'none';  // Скрываем элемент временно
    pnlElement.textContent = `${newPNL}`;  // Убираем лишний "USDT"
    pnlElement.style.display = '';  // Возвращаем элемент

    // Дублируем обновленное значение PNL в другой блок
    const upperPNLElement = document.evaluate('/html/body/div[1]/div/section/main/div[1]/div[2]/div[2]/div[3]/div[3]/div[2]/span/span[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    if (upperPNLElement) {
      upperPNLElement.style.display = 'none';  // Скрываем элемент временно
      upperPNLElement.textContent = `${newPNL}`;  // Убираем лишний "USDT"
      upperPNLElement.style.display = '';  // Возвращаем элемент
    }

    // Обновляем значение PNL в другом элементе
    const anotherPNLElement = document.evaluate('/html/body/div[1]/div/section/main/div[1]/div[2]/div[2]/div[3]/div[3]/div[2]/span/span[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    if (anotherPNLElement) {
      anotherPNLElement.style.display = 'none';  // Скрываем элемент временно
      anotherPNLElement.textContent = `${newPNL}`;  // Убираем лишний "USDT"
      anotherPNLElement.style.display = '';  // Возвращаем элемент
    }
  }

  // Обновляем значения каждые 1 мс
  setInterval(applyUpdates, 5);
}
