from sqlalchemy.orm import Session
from ..models.task import Task
from ..schemas.task import TaskCreate, TaskUpdate


class CRUDTask:

    @staticmethod
    def get_tasks(db: Session, status: str = None):
        query = db.query(Task)
        if status:
            query = query.where(Task.status == status)
        return query.all()

    @staticmethod
    def get_task(db: Session, id: int):
        return db.query(Task).where(Task.id == id).first()

    @staticmethod
    def create_task(db: Session, task: TaskCreate):
        db_task = Task(
            title=task.title,
            description=task.description,
            status=task.status
        )
        db.add(db_task)
        db.commit()
        db.refresh(db_task)
        return db_task

    @staticmethod
    def update_task(db: Session, id: int, task_update: TaskUpdate):
        db_task = CRUDTask.get_task(db, id)
        if not db_task:
            return None
        update_data = task_update.model_dump(exclude_unset=True)
        db.query(Task).filter(Task.id == id).update(update_data)
        db.commit()
        db.refresh(db_task)
        return db_task

    @staticmethod
    def delete_task(db: Session, id: int):
        db_task = CRUDTask.get_task(db, id)
        if not db_task:
            return None
        db.delete(db_task)
        db.commit()
        return db_task
