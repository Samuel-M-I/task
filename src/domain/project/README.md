# Project Aggregate

## Responsibility
Project manages the lifecycle and relationship between
a project and its tasks.

## Invariants
- A project must have a name
- A project can be open or closed
- A closed project cannot be modified
- A project only knows task IDs, not Task entities

## Explicit Non-Responsibilities
- Project does NOT manage task state
- Project does NOT rename or complete tasks
- Project does NOT calculate progress
