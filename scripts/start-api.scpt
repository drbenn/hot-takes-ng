on run argv
  tell application "Terminal"
    activate
    do script "cd " & quoted form of item 1 of argv & " ; cd api && npm run start:dev"
  end tell
end run