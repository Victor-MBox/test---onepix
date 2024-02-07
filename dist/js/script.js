// Модальное окно
document.addEventListener('DOMContentLoaded', event => {
	const burger = document.querySelector('.burger'),
		scrollBtn = document.querySelector('.scroll-btn'),
		modalWrapper = document.querySelector('.modal-section'),
		modalWrapperDecor = document.querySelector('.modal-section_decor'),
		footer = document.querySelector('.footer'),
		header = document.querySelector('.header')


	function openingModal() {
		modalWrapper.classList.toggle('active-wrap')
		modalWrapperDecor.classList.toggle('active-wrap')

		burger.classList.toggle('burger_active')

		footer.classList.toggle('footer_active')
		header.classList.toggle('header_active')
	}

	burger.addEventListener('click', openingModal)
	scrollBtn.addEventListener('click', openingModal)
})
