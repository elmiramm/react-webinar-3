import React from 'react';
import { createRoot } from 'react-dom/client';
import { createElement } from './utils.js';
import App from './app.js';
import Store from './store.js';

const store = new Store({
	list: [
		{ code: 10, title: 'Название элемента', selectItemCounter: 0 },
		{ code: 20, title: 'Некий объект', selectItemCounter: 0 },
		{ code: 30, title: 'Заголовок', selectItemCounter: 0 },
		{ code: 40, title: 'Очень длинное название элемента из семи слов', selectItemCounter: 0 },
		{ code: 50, title: 'Запись', selectItemCounter: 0 },
		{ code: 60, title: 'Шестая запись', selectItemCounter: 0 },
		{ code: 70, title: 'Седьмая запись', selectItemCounter: 0 },
	]
});

const root = createRoot(document.getElementById('root'));

store.subscribe(() => {
	root.render(<App store={store} />);
});

// Первый рендер приложения
root.render(<App store={store} />);
