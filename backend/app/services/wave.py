from datetime import datetime, timezone

DIRECTION_LABELS = [
    (22.5, "NNE"), (45.0, "NE"), (67.5, "ENE"), (90.0, "E"),
    (112.5, "ESE"), (135.0, "SE"), (157.5, "SSE"), (180.0, "S"),
    (202.5, "SSW"), (225.0, "SW"), (247.5, "WSW"), (270.0, "W"),
    (292.5, "WNW"), (315.0, "NW"), (337.5, "NNW"), (360.0, "N"),
]


def direction_label(degrees: float) -> str:
    deg = degrees % 360
    for bound, label in DIRECTION_LABELS:
        if deg <= bound:
            return label
    return "N"


def energy_kwm(h: float, t: float) -> float:
    return round(0.5 * h * h * t, 1)


def stability_score(h: float, t: float) -> int:
    base = 100
    if h > 4.6:
        base -= 25
    elif h > 3.5:
        base -= 12
    if t > 14:
        base -= 10
    elif t > 10:
        base -= 5
    return max(0, min(100, base))


def risk_level(score: int) -> str:
    if score >= 88:
        return "Good"
    if score >= 75:
        return "Moderate"
    if score >= 60:
        return "Elevated"
    return "Critical"


def build_alerts(h: float, t: float, label: str, energy: float) -> list[str]:
    alerts = []
    if h > 4.6:
        alerts.append("Wave height exceeds structural design threshold (4.6 m)")
    elif h > 3.5:
        alerts.append("Wave height is elevated (normal range 2.8 – 4.6 m)")
    if energy > 12:
        alerts.append(f"Wave energy elevated at {energy:.1f} kW/m")
    if t > 12:
        alerts.append(f"Long-period swell detected ({t:.1f} s) – resonance risk")
    if not alerts:
        alerts.append("Wave conditions within normal operating thresholds")
    return alerts


def analyse_wave(req) -> dict:
    energy = energy_kwm(req.height, req.period)
    label = direction_label(req.direction)
    score = stability_score(req.height, req.period)
    return {
        "status": "completed",
        "height": req.height,
        "period": req.period,
        "direction": req.direction,
        "directionLabel": label,
        "energy": energy,
        "waterLevel": req.waterLevel,
        "frequency": req.frequency,
        "stability": score,
        "riskLevel": risk_level(score),
        "alerts": build_alerts(req.height, req.period, label, energy),
        "generatedAt": datetime.now(timezone.utc).isoformat(),
    }