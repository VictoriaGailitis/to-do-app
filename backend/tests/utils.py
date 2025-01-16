from alembic.util import status
from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker
from app.models.task import Task
from tests.database import TEST_DATABASE_URL


# Наполнение тестовой базы данных

class TestDatabase:
    def __init__(self, session: Session):
        self.session = session

    def populate_test_database(self):
        task_1 = Task(
            title="Task 1",
            description="Task 1 description",
            status="todo"
        )

        task_2 = Task(
            title="Task 2",
            description="Task 2 description",
            status="in_progress"
        )

        task_3 = Task(
            title="Task 3",
            description="Task 3 description",
            status="done"
        )

        self.session.add_all([task_1, task_2, task_3])
        self.session.commit()


def override_get_db():
    test_engine = create_engine(TEST_DATABASE_URL)
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=test_engine)
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
