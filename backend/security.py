"""
security.py

API Security module with JWT authentication and API key management

Features:
    - JWT token generation and validation
    - API key rotation system
    - Secure token storage
"""

from datetime import datetime, timedelta
from typing import Dict, Optional
import secrets
from jose import JWTError, jwt
from fastapi import HTTPException, Security, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel


# Security configuration
import os
SECRET_KEY = os.getenv("SECRET_KEY", secrets.token_urlsafe(32))  # Use env var in production
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "30"))

# API Key rotation storage
_api_keys: Dict[str, Dict[str, any]] = {}
_active_api_key_id: str = ""

# JWT bearer scheme
security_scheme = HTTPBearer()


class TokenData(BaseModel):
    """Token data model"""
    client_id: str
    scopes: list[str] = []


class APIKeyData(BaseModel):
    """API key metadata"""
    key_id: str
    created_at: datetime
    expires_at: datetime
    client_id: str
    is_active: bool


def generate_api_key(client_id: str, expiry_days: int = 90) -> tuple[str, str]:
    """
    Generate a new API key with rotation support.

    Args:
        client_id: Client identifier
        expiry_days: Days until key expires

    Returns:
        Tuple of (key_id, api_key)
    """
    key_id = f"key_{secrets.token_hex(8)}"
    api_key = f"offo_{secrets.token_urlsafe(32)}"

    _api_keys[key_id] = {
        "api_key": api_key,
        "client_id": client_id,
        "created_at": datetime.utcnow(),
        "expires_at": datetime.utcnow() + timedelta(days=expiry_days),
        "is_active": True
    }

    global _active_api_key_id
    _active_api_key_id = key_id

    return key_id, api_key


def rotate_api_key(old_key_id: str, client_id: str) -> tuple[str, str]:
    """
    Rotate an existing API key.

    Args:
        old_key_id: Previous key ID to deactivate
        client_id: Client identifier

    Returns:
        Tuple of (new_key_id, new_api_key)
    """
    # Deactivate old key
    if old_key_id in _api_keys:
        _api_keys[old_key_id]["is_active"] = False

    # Generate new key
    return generate_api_key(client_id)


def validate_api_key(api_key: str) -> bool:
    """
    Validate an API key.

    Args:
        api_key: API key to validate

    Returns:
        True if valid, False otherwise
    """
    for key_id, data in _api_keys.items():
        if data["api_key"] == api_key:
            # Check if active
            if not data["is_active"]:
                return False

            # Check if expired
            if datetime.utcnow() > data["expires_at"]:
                data["is_active"] = False
                return False

            return True

    return False


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    """
    Create a JWT access token.

    Args:
        data: Payload data to encode
        expires_delta: Optional custom expiration time

    Returns:
        Encoded JWT token
    """
    to_encode = data.copy()

    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)

    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

    return encoded_jwt


def verify_token(credentials: HTTPAuthorizationCredentials = Security(security_scheme)) -> TokenData:
    """
    Verify JWT token from request.

    Args:
        credentials: HTTP Authorization credentials

    Returns:
        TokenData if valid

    Raises:
        HTTPException: If token is invalid
    """
    token = credentials.credentials

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        client_id: str = payload.get("sub")

        if client_id is None:
            raise HTTPException(
                status_code=401,
                detail="Invalid authentication credentials",
                headers={"WWW-Authenticate": "Bearer"},
            )

        token_data = TokenData(
            client_id=client_id,
            scopes=payload.get("scopes", [])
        )

        return token_data

    except JWTError:
        raise HTTPException(
            status_code=401,
            detail="Invalid authentication credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )


# Initialize default API key for development
DEFAULT_KEY_ID, DEFAULT_API_KEY = generate_api_key("demo_client", expiry_days=365)


def get_current_api_key() -> str:
    """Get the currently active API key for development/testing."""
    return DEFAULT_API_KEY


def get_security_info() -> dict:
    """
    Get security configuration info (for debug/admin endpoints).

    Returns:
        Dict with security configuration details
    """
    return {
        "active_keys": len([k for k in _api_keys.values() if k["is_active"]]),
        "total_keys": len(_api_keys),
        "token_expiry_minutes": ACCESS_TOKEN_EXPIRE_MINUTES,
        "algorithm": ALGORITHM
    }
