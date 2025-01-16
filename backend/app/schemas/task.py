from enum import Enum

from pydantic import BaseModel, Field


# Перечисление с возможными значениями статуса
class StatusEnum(str, Enum):
    todo = 'todo'
    in_progress = 'in_progress'
    done = 'done'


class TaskBase(BaseModel):
    title: str = Field(title='Название задачи', default="Сходить в магазин")
    description: str = Field(title='Описание задачи', default="Купить яйца и молоко")
    status: StatusEnum = Field(title='Статус задачи', default="in_progress")


class TaskCreate(TaskBase):
    pass


class TaskUpdate(TaskBase):
    title: str | None = Field(title='Название задачи', default="Сходить в магазин")
    description: str | None = Field(title='Описание задачи', default="Купить яйца и молоко")
    status: StatusEnum | None = Field(title='Статус задачи', default="in_progress")


class Task(BaseModel):
    id: int
    title: str
    description: str
    status: StatusEnum
