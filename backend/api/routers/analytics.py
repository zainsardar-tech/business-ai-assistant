from fastapi import APIRouter
from typing import Any, Dict

router = APIRouter()

@router.get("/")
def get_dashboard_analytics() -> Dict[str, Any]:
    """
    Returns placeholder analytics for the React dashboard.
    """
    return {
        "total_documents": 24,
        "active_users": 12,
        "agent_queries_today": 142,
        "sales_trend": [
            {"name": "Jan", "sales": 4000},
            {"name": "Feb", "sales": 3000},
            {"name": "Mar", "sales": 2000},
            {"name": "Apr", "sales": 2780},
            {"name": "May", "sales": 1890},
            {"name": "Jun", "sales": 2390},
            {"name": "Jul", "sales": 3490},
        ],
        "system_status": "Healthy"
    }
