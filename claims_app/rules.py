from sqlalchemy.orm import Session
from . import models


def is_duplicate_claim(db: Session, claim_id: str) -> bool:
    return db.query(models.Claim).filter(models.Claim.claim_id == claim_id).first() is not None


def check_member_coverage(db: Session, member_id: int) -> bool:
    member = db.query(models.Member).filter(models.Member.id == member_id).first()
    return member is not None and member.coverage is not None


def run_rules(db: Session, claim: models.Claim) -> str:
    if is_duplicate_claim(db, claim.claim_id):
        return "rejected"
    if not check_member_coverage(db, claim.member_id):
        return "needs_review"
    return "approved"
