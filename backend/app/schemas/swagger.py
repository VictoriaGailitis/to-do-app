# Примеры ответов для всех роутов API для документации

get_list_tasks_responses = {
    200: {
        "description": "Successful Response",
        "content": {
            "application/json": {
                "examples": {
                    "not_empty": {
                        "summary": "Не пустой список задач",
                        "value": [{"id": 1,
                                   "title": "Купить продукты",
                                   "description": "Майонез, кукуруза, крабовые палочки",
                                   "status": "in_progress"},
                                  {"id": 2,
                                   "title": "Сдать отчет по работе",
                                   "description": "Сегодня до 11:00",
                                   "status": "done"}
                                  ]
                    },
                    "empty": {
                        "summary": "Пустой список задач",
                        "value": []
                    },
                }
            }
        }
    }
}

get_task_by_id_responses = {
    200: {
        "description": "Successful Response",
        "content": {
            "application/json": {
                "examples": {
                    "existing": {
                        "summary": "Существующий id",
                        "value": {"id": 1,
                                  "title": "Купить продукты",
                                  "description": "Майонез, кукуруза, крабовые палочки",
                                  "status": "in_progress"}
                    }
                }
            }
        }
    },
    404: {
        "description": "Error: Not Found",
        "content": {
            "application/json": {
                "examples": {
                    "nonexisting": {
                        "summary": "Неуществующий id",
                        "value": {
                            "detail": "Task not found"
                        }
                    }
                }
            }
        }
    }
}

add_task_responses = {
    201: {
        "description": "Successful Response",
        "content": {
            "application/json": {
                "examples": {
                    "correct_status": {
                        "summary": "Успешное добавление задачи с корректным статусом",
                        "value": {"id": 1,
                                  "title": "Купить продукты",
                                  "description": "Майонез, кукуруза, крабовые палочки",
                                  "status": "in_progress"}
                    }
                }
            }
        }
    },
    422: {
        "description": "Error: Unprocessable Entity",
        "content": {
            "application/json": {
                "examples": {
                    "wrong_status": {
                        "summary": "Добавление задачи с некорректным статусом (отличным от todo, in_progress, done)",
                        "value": {
                            "detail": [
                                {
                                    "type": "enum",
                                    "loc": [
                                        "body",
                                        "status"
                                    ],
                                    "msg": "Input should be 'todo', 'in_progress' or 'done'",
                                    "input": "in_progress2",
                                    "ctx": {
                                        "expected": "'todo', 'in_progress' or 'done'"
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        }
    }
}

update_task_responses = {
    200: {
        "description": "Successful Response",
        "content": {
            "application/json": {
                "examples": {
                    "correct_status": {
                        "summary": "Успешное обновление задачи с корректным статусом",
                        "value": {"id": 1,
                                  "title": "Купить продукты",
                                  "description": "Кетчуп, кукуруза, крабовые палочки",
                                  "status": "done"}
                    }
                }
            }
        }
    },
    422: {
        "description": "Error: Unprocessable Entity",
        "content": {
            "application/json": {
                "examples": {
                    "wrong_status": {
                        "summary": "Обновление задачи с некорректным статусом (отличным от todo, in_progress, done)",
                        "value": {
                            "detail": [
                                {
                                    "type": "enum",
                                    "loc": [
                                        "body",
                                        "status"
                                    ],
                                    "msg": "Input should be 'todo', 'in_progress' or 'done'",
                                    "input": "in_progress2",
                                    "ctx": {
                                        "expected": "'todo', 'in_progress' or 'done'"
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        }
    },
    404: {
        "description": "Error: Not Found",
        "content": {
            "application/json": {
                "examples": {
                    "nonexisting": {
                        "summary": "Неуществующий id",
                        "value": {
                            "detail": "Task not found"
                        }
                    }
                }
            }
        }
    }
}

delete_task_responses = {
    404: {
        "description": "Error: Not Found",
        "content": {
            "application/json": {
                "examples": {
                    "nonexisting": {
                        "summary": "Неуществующий id",
                        "value": {
                            "detail": "Task not found"
                        }
                    }
                }
            }
        }
    }
}
