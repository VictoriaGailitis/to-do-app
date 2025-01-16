from fastapi import Query
from typing import Optional
from pydantic import BaseModel
from .schemas.task import StatusEnum


# Dependency для опциональной фильтрации по статусу
class TasksFilter(BaseModel):
    status: Optional[StatusEnum] = Query(None)
