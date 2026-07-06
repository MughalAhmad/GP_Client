@echo off

echo Checking React dependencies...
call npm install

echo Starting React...

start "" cmd /k "npm run dev"

timeout /t 5 /nobreak > nul

start http://localhost:5173