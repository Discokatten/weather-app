from utils.consts import (
    REQUIRED_FIELDS,
    VALID_TYPES,
    VALID_LAYERS,
    VALID_SEASONS,
    VALID_WEATHER,
    VALID_SIZE_SYSTEMS,
    VALID_ALPHA_SIZES,
)
def validate_item(data: dict) -> list[str]:

    errors = []

    # Required fields
    for field in REQUIRED_FIELDS:
        if field not in data:
            errors.append(f"Missing field: {field}")
    if errors:
        return errors
    

    if not isinstance(data["name"], str) or not data["name"].strip():
        errors.append("name can't be empty")

    if data["type"] not in VALID_TYPES:
        errors.append(f"type must be one of {sorted(VALID_TYPES)}")

    if data["layer"] not in VALID_LAYERS:
        errors.append(f"layer must be one of {sorted(VALID_LAYERS)}")

    try:
        w = int(data["warmth"])
        if not 0 <= w <= 4:
            errors.append("warmth must be between 0 and 4")
    except (ValueError, TypeError):
        errors.append("warmth must be a number")

    if not isinstance(data.get("season"), list):
        errors.append("season must be a list")
    else:
        bad = [s for s in data["season"] if s not in VALID_SEASONS]
        if bad:
            errors.append(f"invalid seasons: {bad}")

    if not isinstance(data.get("weather"), list):
        errors.append("weather must be a list")
    else:
        bad = [weather for weather in data["weather"] if weather not in VALID_WEATHER]
        if bad:
            errors.append(f"invalid weather: {bad}")

# Om size saknas eller är None — ingen validering av size_system
    if "size" in data and data["size"] is not None:
        if data.get("size_system") not in VALID_SIZE_SYSTEMS:
            errors.append(f"size_system must be one of {sorted(VALID_SIZE_SYSTEMS)}")
        elif data["size_system"] == "alpha":
            if data["size"] not in VALID_ALPHA_SIZES:
                errors.append(f"size must be one of {sorted(VALID_ALPHA_SIZES)}")
        elif data["size_system"] == "numeric":
            try:
                int(data["size"])
            except (ValueError, TypeError):
                errors.append("numeric size must be a number")

    return errors