## Блок 2: Базовая реализация Todo App

### 1. **Структура проекта**

```
todo-app/
├── src/
│ ├── api/
│ │ └── todos.ts # API-клиент (запросы к серверу)
│ ├── components/
│ │ ├── ActionButton/ # Кнопки действий
│ │ ├── AppContainer/ # Контейнер приложения
│ │ ├── Checkbox/ # Чекбокс
│ │ ├── EmptyMessage/ # Сообщение "нет задач"
│ │ ├── ThemeToggleButton/ # Кнопка переключения темы
│ │ ├── Title/ # Заголовок
│ │ ├── TodoEditForm/ # Форма редактирования
│ │ ├── TodoForm/ # Форма добавления
│ │ ├── TodoItem/ # Отдельная задача
│ │ ├── TodoItemContainer/ # Контейнер задачи
│ │ ├── TodoList/ # Список задач + пагинация
│ │ ├── TodoListContainer/ # Контейнер списка
│ │ └── TodoText/ # Текст задачи
│ ├── context/
│ │ └── ThemeContext.tsx # Контекст для тёмной темы
│ ├── store/
│ │ └── slices/
│ │ └── todoSlice.ts # Redux слайс для задач
│ │ ├── hooks.ts # Типизированные хуки useDispatch/useSelector
│ │ ├── index.ts # Настройка Redux store
│ ├── styles/
│ │ └── GlobalStyles.ts # Глобальные стили
│ ├── types/
│ │ └── types.ts # TypeScript интерфейсы
│ ├── App.tsx
│ ├── main.tsx
├── server/ # Бэкенд-сервер (Использовал\Запускал в отдельном окне vscode)
└── README.md
```
