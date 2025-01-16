from ..database import Base
from sqlalchemy.orm import Mapped, mapped_column


class Task(Base):
    __tablename__ = 'tasks'

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True, unique=True)
    title: Mapped[str]
    description: Mapped[str]
    status: Mapped[str]
