// Установка начальных значений и курсов валют
let currentCurrency = 'USD'
const exchangeRates = { USD: 1, RUB: 89.75, EUR: 0.92 }
let isMonthly = true

// Функция для переключения валюты
function switchCurrency() {
	const priceCurrencyElements = document.querySelectorAll('.price__currency')
	const priceSumElements = document.querySelectorAll('.price__sum')

	if (currentCurrency === 'USD') {
		currentCurrency = 'RUB'
	} else if (currentCurrency === 'RUB') {
		currentCurrency = 'EUR'
	} else {
		currentCurrency = 'USD'
	}

	priceCurrencyElements.forEach(elem => {
		elem.textContent =
			currentCurrency === 'USD' ? '$' : currentCurrency === 'RUB' ? '₽' : '€'
	})

	updatePrices(priceSumElements)
}

// Функция для переключения месяц/день
function switchTerm() {
	const priceTermElements = document.querySelectorAll('.price__term')
	const priceSumElements = document.querySelectorAll('.price__sum')

	isMonthly = !isMonthly

	priceTermElements.forEach(elem => {
		elem.textContent = isMonthly ? '/Months' : '/Day'
	})

	updatePrices(priceSumElements)
}

// Функция для обновления цен
function updatePrices(priceElements) {
	priceElements.forEach(elem => {
		let originalPrice = parseInt(elem.getAttribute('data-original-price'))
		if (!originalPrice) {
			originalPrice = parseInt(elem.textContent)
			elem.setAttribute('data-original-price', originalPrice)
		}

		let newPrice = originalPrice * exchangeRates[currentCurrency]
		if (!isMonthly) {
			newPrice /= 30
		}

		elem.textContent = Math.round(newPrice)
	})
}

// Добавление обработчиков событий
document.querySelectorAll('.price__currency').forEach(elem => {
	elem.addEventListener('click', switchCurrency)
})

document.querySelectorAll('.price__term').forEach(elem => {
	elem.addEventListener('click', switchTerm)
})

// Задержка появления карточек через setTimeout
document.addEventListener('DOMContentLoaded', () => {
	const cards = document.querySelectorAll('.cart')
	cards.forEach((card, index) => {
		setTimeout(() => {
			card.style.opacity = 1
		}, 600 * index)
	})
})

// Бургер
document.addEventListener('DOMContentLoaded', function () {
	const burgerBtn = document.querySelector('.burger')
	const mobMenu = document.querySelector('.mob-menu')

	burgerBtn.addEventListener('click', function () {
		burgerBtn.classList.toggle('burger_active')
		mobMenu.classList.toggle('mob-menu_active')
	})
})
