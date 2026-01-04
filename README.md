# Task / Project Domain

Este repositorio contiene el modelo de dominio de un sistema
de gestión de tareas, proyectos y métricas de progreso.

## Objetivo

Diseñar y validar el dominio antes de introducir:
- casos de uso
- persistencia
- API
- frameworks

## Decisiones de dominio (cerradas)

- Task, Project y Meta son conceptos distintos (no herencia)
- El progreso es un estado derivado, no persistido
- Un proyecto puede cerrarse y reabrirse
- Un proyecto cerrado no permite modificaciones
- Las tareas pueden existir sin proyecto
- Remover una tarea de un proyecto no elimina la tarea

## Tests

Los invariantes del dominio se validan mediante tests
ubicados junto a las entidades dentro de `src/domain`.

## Estado actual

Fase 4 completada: dominio estable y validado.
Casos de uso aún no implementados.
