@echo off
echo Starting Disaster Management System...
echo.

echo 1. Starting Backend Server...
cd backend
start "Backend Server" cmd /k "npm start"
cd ..

echo 2. Waiting for backend to start...
timeout /t 5 /nobreak > nul

echo 3. Starting Frontend Server...
start "Frontend Server" cmd /k "npm run dev"

echo.
echo ✅ Both servers are starting up!
echo.
echo Backend will be available at: http://localhost:5000 (or auto-detected port)
echo Frontend will be available at: http://localhost:5173 (or auto-detected port)
echo.
echo Wait a few seconds for both servers to fully start, then:
echo 1. Open your browser to the frontend URL
echo 2. Navigate to the SOS page
echo 3. Test the SOS button
echo.
echo Press any key to close this window...
pause > nul
