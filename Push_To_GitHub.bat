@echo off
title Push Farm2Market to GitHub
cd /d "%~dp0"

echo ========================================================
echo   Pushing Farm2Market Website to GitHub...
echo   Repository: https://github.com/vedantpotdar308-cyber/Farm-2-market-
echo ========================================================
echo.

git push origin main

echo.
if %ERRORLEVEL% EQU 0 (
    echo ========================================================
    echo   [SUCCESS] Website successfully pushed to GitHub!
    echo ========================================================
) else (
    echo ========================================================
    echo   [NOTICE] If prompted, log in with your GitHub account
    echo   or paste a GitHub Personal Access Token (PAT).
    echo ========================================================
)
echo.
pause
