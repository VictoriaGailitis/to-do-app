from fastapi.testclient import TestClient
from app.main import app
from app.database import get_session
from tests.fixtures import create_and_delete_database
from tests.utils import override_get_db

client = TestClient(app)
app.dependency_overrides[get_session] = override_get_db


def test_get_list_tasks():
    response = client.get("/tasks")
    assert response.status_code == 200
    tasks = response.json()
    assert len(tasks) == 3
    assert tasks[1]["status"] == "in_progress"


def test_get_list_tasks_filter():
    response = client.get("/tasks?status=todo")
    assert response.status_code == 200
    tasks = response.json()
    assert len(tasks) == 1
    assert tasks[0]["status"] == "todo"


def test_get_task_by_id():
    response = client.get("/tasks/1")
    assert response.status_code == 200
    task = response.json()
    assert task["status"] == "todo"


def test_get_task_by_id_404():
    response = client.get("/tasks/999")
    assert response.status_code == 404
    task = response.json()
    assert task["detail"] == "Task not found"


def test_add_task():
    response = client.post("/tasks", json={"title": "Task 4", "description": "Task 4 description", "status": "done"})
    assert response.status_code == 201
    task = response.json()
    assert task["title"] == "Task 4"


def test_add_task_422():
    response = client.post("/tasks", json={"title": "Task 4", "description": "Task 4 description", "status": "test"})
    assert response.status_code == 422


def test_update_task():
    response = client.put("/tasks/1", json={"status": "done"})
    assert response.status_code == 200
    task = response.json()
    assert task["status"] == "done"


def test_update_task_404():
    response = client.put("/tasks/999", json={"status": "done"})
    assert response.status_code == 404
    task = response.json()
    assert task["detail"] == "Task not found"


def test_update_task_422():
    response = client.put("/tasks/999", json={"status": "test"})
    assert response.status_code == 422


def test_delete_task():
    response = client.delete("/tasks/1")
    assert response.status_code == 204


def test_delete_task_404():
    response = client.delete("/tasks/999")
    assert response.status_code == 404
    task = response.json()
    assert task["detail"] == "Task not found"
