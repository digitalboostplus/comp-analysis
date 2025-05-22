"""Simple placeholder AI co-pilot for claim recommendations."""

import random

SUGGESTIONS = [
    "Check member eligibility details.",
    "Verify provider contract before approval.",
    "Consider requesting additional documentation.",
]

def get_recommendation() -> str:
    return random.choice(SUGGESTIONS)
