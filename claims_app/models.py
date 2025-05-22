from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime

from .database import Base

class Member(Base):
    __tablename__ = "members"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    coverage = Column(String)

class Provider(Base):
    __tablename__ = "providers"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)

class Claim(Base):
    __tablename__ = "claims"
    id = Column(Integer, primary_key=True, index=True)
    claim_id = Column(String, unique=True, index=True)
    member_id = Column(Integer, ForeignKey("members.id"))
    provider_id = Column(Integer, ForeignKey("providers.id"))
    amount = Column(Float)
    status = Column(String, default="pending")
    created_at = Column(DateTime, default=datetime.utcnow)

    member = relationship("Member")
    provider = relationship("Provider")

class ServiceLine(Base):
    __tablename__ = "service_lines"
    id = Column(Integer, primary_key=True, index=True)
    claim_id = Column(Integer, ForeignKey("claims.id"))
    description = Column(String)
    cost = Column(Float)

    claim = relationship("Claim", backref="service_lines")

class AuditHistory(Base):
    __tablename__ = "audit_history"
    id = Column(Integer, primary_key=True, index=True)
    claim_id = Column(Integer, ForeignKey("claims.id"))
    action = Column(String)
    timestamp = Column(DateTime, default=datetime.utcnow)
    notes = Column(String)
