#!/usr/bin/env python3
"""A tiny terminal experience for maximum vibes."""

from __future__ import annotations

import random
import sys
import time

WORDS_1 = ["quantum", "neon", "fractal", "stellar", "hyper", "cosmic", "velvet"]
WORDS_2 = ["echo", "pulse", "signal", "drift", "flame", "wave", "spiral"]
WORDS_3 = ["awakens", "collides", "expands", "ignites", "splits", "transcends", "shifts"]


def slow_print(text: str, delay: float = 0.02) -> None:
    for ch in text:
        sys.stdout.write(ch)
        sys.stdout.flush()
        time.sleep(delay)
    print()


def countdown() -> None:
    slow_print("Initializing mind-blow protocol...", 0.015)
    for n in [3, 2, 1]:
        slow_print(f"{n}...", 0.06)
        time.sleep(0.2)


def cosmic_lines(seed: int = 52, lines: int = 5) -> None:
    random.seed(seed)
    for _ in range(lines):
        line = f"{random.choice(WORDS_1)} {random.choice(WORDS_2)} {random.choice(WORDS_3)}"
        slow_print(f"-> {line}", 0.01)
        time.sleep(0.15)


def blast() -> None:
    art = r"""
        .-''''-.
      .'  .-.  '.
     /   /   \   \
    |   |  💥 |   |
     \   \___/   /
      '.       .'
        '-...-'

      M I N D   B L O W N
    """
    slow_print(art, 0.001)


def main() -> None:
    countdown()
    slow_print("Opening neural overdrive...", 0.015)
    cosmic_lines()
    blast()


if __name__ == "__main__":
    main()
