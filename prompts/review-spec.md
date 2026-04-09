---
description: Scout gathers spec context, spec-reviewer analyzes for quality and gaps
---
Use the subagent tool with the chain parameter to execute this workflow:

1. First, use the "scout" agent to read the spec and any related files (plans, existing code) for: $@
2. Then, use the "spec-reviewer" agent to review the spec using the context from the previous step (use {previous} placeholder)

Execute this as a chain, passing output between steps via {previous}. Do NOT modify any files.

Use agentScope "both" so the project-local spec-reviewer agent is discovered.
