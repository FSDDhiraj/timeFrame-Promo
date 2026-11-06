@echo off
setlocal
cd /d "%~dp0"
where node >nul 2>nul || (echo Node.js is not installed. Install Node.js LTS first.& pause & exit /b 1)
where npm >nul 2>nul || (echo npm is not available. Reinstall Node.js LTS.& pause & exit /b 1)
echo Checking and syncing project dependencies...
call npm install || (echo Dependency installation failed. Check your internet connection and try again.& pause & exit /b 1)
echo Starting TimeFrame promotional website...
call npm run dev
pause
