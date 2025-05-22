from pydantic import BaseModel, Field
from typing import List

class ServiceLineCreate(BaseModel):
    description: str
    cost: float

class ClaimCreate(BaseModel):
    claim_id: str = Field(..., description="Unique claim identifier")
    member_id: int
    provider_id: int
    amount: float
    service_lines: List[ServiceLineCreate]

class ClaimResponse(BaseModel):
    id: int
    claim_id: str
    member_id: int
    provider_id: int
    amount: float
    status: str

    class Config:
        orm_mode = True
