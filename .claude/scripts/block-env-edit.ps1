# PreToolUse guard: block Write/Edit on .env files.
# Reads the hook JSON from stdin and emits a PreToolUse "deny" decision
# when the target file is a .env file. ASCII-only on purpose so it behaves
# identically under Windows PowerShell 5.1 and PowerShell 7+.
$ErrorActionPreference = 'Stop'

$raw = [Console]::In.ReadToEnd()
if (-not $raw) { exit 0 }

try { $payload = $raw | ConvertFrom-Json } catch { exit 0 }

$fp = $payload.tool_input.file_path
if (-not $fp) { exit 0 }

# Match a .env file at the path start or right after a separator:
#   .env  .env.local  .env.production  src/.env  C:\app\.env
# Allow committed template variants: .env.example / .sample / .template / .dist
$isEnv      = $fp -match '(^|[\\/])\.env($|\.|[\\/])'
$isTemplate = $fp -match '\.(example|sample|template|dist)$'

if ($isEnv -and -not $isTemplate) {
    @{
        hookSpecificOutput = @{
            hookEventName            = 'PreToolUse'
            permissionDecision       = 'deny'
            permissionDecisionReason = "Editing .env files is blocked by a project PreToolUse hook: $fp"
        }
    } | ConvertTo-Json -Compress -Depth 5
}

exit 0
