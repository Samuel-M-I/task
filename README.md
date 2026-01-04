# Task / Project Domain

Sistema de dominio para gestionar tareas y proyectos
siguiendo principios de arquitectura limpia y DDD-lite.

## Decisiones clave

- El dominio no depende de frameworks
- El progreso es un estado derivado
- Un proyecto puede cerrarse sin eliminarse
- Las tareas pueden existir sin proyecto
- El dominio se valida mediante tests

## Estructura

- domain/ → entidades y reglas
- tests/ → invariantes del dominio

## Estado actual
Fase 4: Dominio y estados derivados completos
