Тогда у тебя задача чуть точнее формулируется:

> **файлы хранятся временно, но результат обработки и факт обработки должны храниться долго и быть привязаны к объекту**

Это очень типичный кейс — например: документы к заявке, объекту недвижимости, пользователю и т.д.

Я бы делал так.

---

# Оптимальная архитектура для твоего случая

## 📁 Файлы — временно

## 🗄️ Результаты — постоянно

То есть:

* **файлы** — во временном хранилище
* **результаты AI** — в базе данных
* **статус обработки** — в базе
* **связь с объектом** — через `object_id`

---

# Как это выглядит логически

```text
Object (например недвижимость)
        │
        ├── Document
        │        ├── file_path (временно)
        │        ├── status
        │        ├── summary
        │        └── processed_at
```

---

# Рекомендуемая схема таблиц

## Таблица объектов

```sql
objects
-------
id UUID
name TEXT
created_at TIMESTAMP
```

---

## Таблица документов

Это ключевая таблица.

```sql
documents
---------
id UUID
object_id UUID

original_filename TEXT
file_path TEXT

mime_type TEXT

status TEXT
-- uploaded
-- processing
-- done
-- error

summary TEXT

created_at TIMESTAMP
processed_at TIMESTAMP

error_message TEXT
```

Вот это — **главное решение твоей задачи**.

---

# Как это работает по шагам

## 1. Пользователь загружает файл

```text
PDF / JPEG
```

Ты:

1. сохраняешь файл:

```text
/tmp/uploads/uuid.pdf
```

2. создаёшь запись:

```sql
status = 'uploaded'
object_id = XXX
```

---

## 2. Воркер берёт документ

```sql
WHERE status = 'uploaded'
```

Меняет:

```sql
status = 'processing'
```

---

## 3. Обработка через ИИ

```text
PDF → extract text
JPEG → OCR
→ AI summary
```

---

## 4. Сохраняется результат

```sql
status = 'done'
summary = '...'
processed_at = NOW()
```

Теперь:

* файл можно удалить
* результат останется

---

# Почему это хорошо работает

Ты получаешь:

✔ знаешь был ли файл
✔ знаешь обработан ли
✔ знаешь результат
✔ файл можно удалить
✔ можно добавлять новые документы

---

# Временное хранение файлов

Если хранение **короткое (часы/дни)** — просто:

```text
/tmp/uploads/
```

или:

```text
/storage/tmp/
```

Если нужно чуть серьёзнее:

* локальный диск
* или S3-совместимое хранилище (например self-hosted)

Например:

* MinIO — отличный вариант если сервисов несколько

Но если сервис один — **локальный диск проще и быстрее**.

---

# Очень важный момент — удаление файлов

После обработки:

```text
если status = done
→ удалить файл
```

Или через cron:

```bash
delete files older than 24h
```

---

# Если документы добавляются к объекту постепенно

Твоя схема это уже поддерживает:

```text
Object 123

Documents:
- паспорт.pdf → done
- фото.jpg → done
- договор.pdf → processing
```

Можно:

* проверять, какие документы уже есть
* какие обработаны
* какие упали

---

# Если один документ может заменяться

Добавь:

```sql
document_type TEXT
-- passport
-- contract
-- photo
```

И тогда:

```sql
UNIQUE(object_id, document_type)
```

---

# Если кратко — правильное решение

**Файлы:**
→ временно на диск

**Результаты:**
→ в PostgreSQL

**Статус:**
→ `uploaded | processing | done | error`

**Связь:**
→ `object_id`

---

# Если ты на Go (похоже по прошлым задачам)

Могу предложить готовую структуру:

```go
type Document struct {
    ID               uuid.UUID
    ObjectID         uuid.UUID

    OriginalFilename string
    FilePath         string
    MimeType         string

    Status           string

    Summary          string
    ErrorMessage     string

    CreatedAt        time.Time
    ProcessedAt      *time.Time
}
```

И отдельный:

```go
DocumentProcessor
```

который:

```text
берёт uploaded → делает summary → обновляет status
```

---

# Один уточняющий вопрос — сильно влияет на дизайн

**Файл нужно удалять после обработки
или иногда нужно оставить оригинал?**

Варианты:

1. **Удаляем всегда** → проще
2. **Иногда храним** → нужна долговременная storage стратегия
