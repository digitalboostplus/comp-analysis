# Claims App

This is a minimal prototype for a medical claims management system.

## Setup

Install requirements and run the API server using Uvicorn:

```bash
pip install fastapi uvicorn sqlalchemy pydantic
uvicorn claims_app.main:app --reload
```

The API exposes `/claims` for ingesting claims and `/claims/{claim_id}/recommendation` to get AI-powered suggestions.
