import http

from fastapi import APIRouter, HTTPException, status, Depends
from sqlalchemy.orm import Session

from ..database import get_session
from ..schemas.task import TaskCreate, TaskUpdate, Task
from ..schemas.swagger import (get_list_tasks_responses, get_task_by_id_responses,
                               add_task_responses, update_task_responses, delete_task_responses)
from ..crud.task import CRUDTask
from ..dependencies import TasksFilter

router = APIRouter(
    prefix='/tasks',
    tags=["Tasks"]
)


@router.get('/', status_code=http.HTTPStatus.OK, summary="Получить все задачи",
            description="Получение списка всех задач с возможностью фильтрации по статусу",
            responses=get_list_tasks_responses, response_model=list[Task])
def get_list_tasks(db: Session = Depends(get_session),
                   filter: TasksFilter = Depends(TasksFilter)):
    tasks = CRUDTask.get_tasks(db, filter.status)
    return tasks


@router.get('/{id}', status_code=http.HTTPStatus.OK, summary="Получение задачи по id",
            responses=get_task_by_id_responses, response_model=Task)
def get_task_by_id(id: int, db: Session = Depends(get_session)):
    task = CRUDTask.get_task(db, id)
    if not task:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Task not found')
    return task


@router.post('/', status_code=http.HTTPStatus.CREATED, summary="Добавление новой задачи",
             responses=add_task_responses, response_model=Task)
def add_task(task: TaskCreate, db: Session = Depends(get_session)):
    new_task = CRUDTask.create_task(db, task)
    return new_task


@router.put('/{id}', status_code=http.HTTPStatus.OK, summary="Обновление задачи по id",
            description="Можно передавать в запрос только желаемые для обновления поля",
            responses=update_task_responses, response_model=Task)
def update_task(id: int, task_update: TaskUpdate, db: Session = Depends(get_session)):
    updated_task = CRUDTask.update_task(db, id, task_update)
    if not updated_task:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Task not found")
    return updated_task


@router.delete('/{id}', status_code=http.HTTPStatus.NO_CONTENT, summary="Удаление задачи",
               responses=delete_task_responses)
def delete_task(id: int, db: Session = Depends(get_session)):
    deleted_task = CRUDTask.delete_task(db, id)
    if not deleted_task:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Task not found")
    return {}
