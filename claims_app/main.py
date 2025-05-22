from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session

from .database import SessionLocal, engine
from . import models, schemas, rules, ai_copilot

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Medical Claims Management")


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/claims", response_model=schemas.ClaimResponse)
def create_claim(claim: schemas.ClaimCreate, db: Session = Depends(get_db)):
    if rules.is_duplicate_claim(db, claim.claim_id):
        raise HTTPException(status_code=400, detail="Duplicate claim")

    db_claim = models.Claim(
        claim_id=claim.claim_id,
        member_id=claim.member_id,
        provider_id=claim.provider_id,
        amount=claim.amount,
    )
    db.add(db_claim)
    db.flush()

    for sl in claim.service_lines:
        db_service = models.ServiceLine(
            claim_id=db_claim.id,
            description=sl.description,
            cost=sl.cost,
        )
        db.add(db_service)

    db_commit_rules = rules.run_rules(db, db_claim)
    db_claim.status = db_commit_rules
    db.add(db_claim)
    db.commit()
    db.refresh(db_claim)
    return db_claim

@app.get("/claims/{claim_id}/recommendation")
def claim_recommendation(claim_id: str, db: Session = Depends(get_db)):
    claim = db.query(models.Claim).filter(models.Claim.claim_id == claim_id).first()
    if not claim:
        raise HTTPException(status_code=404, detail="Claim not found")
    suggestion = ai_copilot.get_recommendation()
    return {"claim_id": claim_id, "suggestion": suggestion}
