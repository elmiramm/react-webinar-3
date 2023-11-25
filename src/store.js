/**
 * Хранилище состояния приложения
 */
class Store {
	constructor(initState = {}) {
		this.state = initState;
		this.listeners = []; // Слушатели изменений состояния
		this.counter = initState.list.length;
	}

	/**
	 * Подписка слушателя на изменения состояния
	 * @param listener {Function}
	 * @returns {Function} Функция отписки
	 */
	subscribe(listener) {
		this.listeners.push(listener);
		// Возвращается функция для удаления добавленного слушателя
		return () => {
			this.listeners = this.listeners.filter(item => item !== listener);
		}
	}

	/**
	 * Выбор состояния
	 * @returns {Object}
	 */
	getState() {
		return this.state;
	}

	/**
	 * Установка состояния
	 * @param newState {Object}
	 */
	setState(newState) {
		this.state = newState;
		// Вызываем всех слушателей
		for (const listener of this.listeners) listener();
	}

	/**
	 * Добавление новой записи
	 */

	addItem() {
		this.counter = this.counter + 1;
		this.setState({
			...this.state,
			list: [...this.state.list, { code: this.counter, title: 'Новая запись', selectItemCounter: 0 }]
		});

	};

	/**
	 * Удаление записи по коду
	 * @param code
	 */
	deleteItem(code) {
		this.setState({
			...this.state,
			list: this.state.list.filter(item => item.code !== code)
		})
	};

	/**
	 * Выделение записи по коду
	 * @param code
	 */
	selectItem(code) {

		this.state.list.forEach(element => {
			if (element.selected && element.code !== code) {
				element.selected = false;
			};
		});
		this.setState({
			...this.state,
			list: this.state.list.map(item => {
				if (item.code === code) {
					item.selected = !item.selected;
					if (item.selected) {
						item.selectItemCounter = item.selectItemCounter + 1;

						if ((item.selectItemCounter % 10 === 2 || item.selectItemCounter % 10 === 3 || item.selectItemCounter % 10 === 4)) {
							if (item.selectItemCounter % 100 === 12 || item.selectItemCounter % 100 === 13 || item.selectItemCounter % 100 === 14) {
								item.title = `${item.title.split("|")[0]} | Выделяли ${item.selectItemCounter} раз`;
							} else {
								item.title = `${item.title.split("|")[0]} | Выделяли ${item.selectItemCounter} разa`;
							}
						} else {
							item.title = `${item.title.split("|")[0]} | Выделяли ${item.selectItemCounter} раз`;
						}

					}
				}
				return item;
			})
		})
	}
}

export default Store;
